'use-strict';
const functions = require('firebase-functions');
const {createUser} = require('./modules/createUser');
const {getSecret} = require('./modules/getSecret');

exports.createUser = functions.https.onRequest((req, res) =>
  createUser(req, res),
);

exports.secret = functions.https.onRequest((req, res) => {
  getSecret(req, res);
});
