'use-strict';
const functions = require('firebase-functions');
const {createUser} = require('./modules/createUser');
const { getCloudData } = require('./modules/getCloudData');
const {getSecret} = require('./modules/getSecret');
const { addCloudData } = require('./modules/addCloudData');
const { updateCloudData } = require('./modules/updateCloudData');
const { deleteCloudData } = require('./modules/deleteCloudData');

exports.createUser = functions.https.onRequest((req, res) =>
  createUser(req, res),
);

exports.secret = functions.https.onRequest((req, res) => {
  getSecret(req, res);
});

exports.getCloudData = functions.https.onRequest((req, res) => {
  getCloudData(req, res);
});

exports.addCloudData = functions.https.onRequest((req, res) => {
  addCloudData(req, res);
});

exports.editCloudData = functions.https.onRequest((req, res) => {
  updateCloudData (req, res);
});

exports.deleteCloudData = functions.https.onRequest((req, res) => {
  deleteCloudData(req, res);
});