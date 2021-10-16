const OktaJwtVerifier = require('@okta/jwt-verifier');
const admin = require('firebase-admin');
if (!admin.apps.length) {
  admin.initializeApp();
}

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-99154940.okta.com/oauth2/default',
});

exports.getSecret = (req, res) => {
  const getUser = async uid => {
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
        if (dt.length > 0 && dt[0]?.admin) {
          const resp = await admin
            .firestore()
            .collection('secret')
            .doc('6s1GiPoKpZApciSNrAAc')
            .get();
          res.send(resp.data());
        } else {
          res.send({error: 'You are not an admin'});
        }
      } else {
        res.send({error: `Your data doesn't exist`});
      }
    } catch (e) {
      res.send({error: 'Some error ocurred'});
    }
  };

  const act = req.header('authorization').replace('Bearer ', '').trim();
  oktaJwtVerifier
    .verifyAccessToken(act, 'api://default')
    .then(jwt => {
      if (jwt.claims) {
        getUser(jwt.claims.uid);
      }
    })
    .catch(err => {
      res.send({error: 'Unable to verify Token'});
    });
};
