const OktaJwtVerifier = require('@okta/jwt-verifier');
const admin = require('firebase-admin');
if (!admin.apps.length) {
  admin.initializeApp();
}

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-99154940.okta.com/oauth2/default',
});

exports.getCloudData = (req, res) => {
  const getData = async uid => {
    try {
      const response = await admin
        .firestore()
        .collection('users')
        .where('id', '==', uid)
        .get();
      if (response.docs.length > 0) {
        let dt = [];
        response.forEach(doc => {
          dt.push(doc.data());
        });
        if (dt.length > 0) {
          let data = [];
          const response2 = await admin.firestore().collection('cloud').get();
          response2.forEach(doc => {
            data.push(doc.data());
          });
          res.send({roles: dt[0]?.roles, data});
        } else {
          res.send({error: 'You are not an admin'});
        }
      } else {
        res.send({error: `Your data doesn't exist`});
      }
    } catch (e) {
      res.send({error: e.message});
    }
  };

  const act = req.header('authorization').replace('Bearer ', '').trim();

  oktaJwtVerifier
    .verifyAccessToken(act, 'api://default')
    .then(jwt => {
      if (jwt.claims) {
        getData(jwt.claims.uid);
      }
    })
    .catch(err => {
      res.send({error: err.message});
    });
};
