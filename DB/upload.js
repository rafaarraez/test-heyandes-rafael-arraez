const admin = require('firebase-admin');
const serviceAccount = require("./service_key.json");
const salesJSON = require("./sales.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };

firestore.settings(settings);

if (salesJSON && (typeof salesJSON === "object")) {
	Object.keys(salesJSON).forEach(x => {
		firestore.collection('sales').doc().set(salesJSON[x])
			.then(
				(res) => console.log("Document " + x + " done!")
			)
			.catch(
				(err) => console.error("Error writing document: ", err)
			);
	})
}
