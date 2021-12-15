const OktaJwtVerifier = require('@okta/jwt-verifier');
const admin = require('firebase-admin');
if (!admin.apps.length) {
  admin.initializeApp();
}

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-99154940.okta.com/oauth2/default',
});

exports.deleteCloudData = (req, res) => {
  const {doc, cloudDataValue} = req.body;

  if (!doc) {
    res.send({error: 'doc name is required'});
  }

  if (!cloudDataValue) {
    res.send({error: 'cloud Data is required'});
  }

  const deleteData = async uid => {
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
          if (!dt[0]?.roles.delete) {
            res.send({
              error:
                'you dont have delete access. please contact admin/support',
            });
            return;
          }
          const response2 = await admin
            .firestore()
            .collection('cloud')
            .doc(doc)
            .update({data: cloudDataValue});

          res.send({success: true});
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
        deleteData(jwt.claims.uid);
      }
    })
    .catch(err => {
      res.send({error: err.message});
    });
};
