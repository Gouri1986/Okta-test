'use-strict';
const admin = require('firebase-admin');
admin.initializeApp();
const okta = require('@okta/okta-sdk-nodejs');
const {oktaConfig} = require('../config/okta-config');

const client = new okta.Client(oktaConfig);

exports.createUser = async (req, res) => {
  const {email, password, firstName, lastName} = req.body;

  const profile = {
    firstName,
    lastName,
    email,
    login: email,
  };

  const credentials = {
    password: {
      value: password,
    },
  };
  try {
    const response = await client.createUser({profile, credentials});
    await response.addToGroup('00g253qdcuk1ZNlk55d7');
    await admin
      .firestore()
      .collection('users')
      .add({
        id: response.id,
        created: response.created,
        lastLogin: response.lastLogin,
        profile: {...response.profile},
      });
    res.send(response);
  } catch (e) {
    res.send(e.message);
  }
};
