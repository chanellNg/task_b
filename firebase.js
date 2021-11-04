const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

module.exports = firebaseAdmin;