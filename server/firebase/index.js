var admin = require('firebase-admin');

var serviceAccount = require('../config/firebaseServiceAccountKey.js');

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(
      JSON.stringify(serviceAccount)
        .replace(/\\/g, 'ZOM')
        .replaceAll('ZOMZOM', '\\')
    )
  ),
});

module.exports = admin;
