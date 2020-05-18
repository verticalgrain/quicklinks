const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.corsEnabledFunctionAuth = (req, res) => {
    // Set CORS headers for preflight requests
    // Allows GETs from origin https://mydomain.com with Authorization header

    res.set('Access-Control-Allow-Origin', 'http://localhost:1234');
    res.set('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Authorization');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        res.send('Cors not happy');
    }
};

exports.getSubCollections = functions.https.onCall(async (data, context) => {

    const docPath = data.docPath;

    const collections = await admin.firestore().doc(docPath).listCollections();
    const collectionIds = collections.map(col => col.id);
    // const collectionIds = collections.map(col => col.data());
    // const collectionIds = collections.map(col => col.doc);
    // const collectionIds = collections.map(col => col.doc.listCollections());
    // const collectionIds = collections.map(col => col.doc.data());
    // const collectionIds = collections.map(col => col.doc( col.path ).data());
    return { collections: collectionIds };

});