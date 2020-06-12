
const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const algoliasearch = require("algoliasearch");
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;
const ALGOLIA_INDEX_NAME = "dev_EggApp";
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

const tokyoRegion = "asia-northeast1";

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.deletePost = functions
    .region(tokyoRegion)
    .firestore.document('users/{uid}/posts/{postid}')
    .onDelete(async (snap, context) => {
      const { uid } = context.params;
      const { postid } = context.params;
      const filePath = `videos/users/${uid}/posts/${postid}`
      const thumbnailPath = `images/users/${uid}/posts/${postid}/thumbnail`
      const bucket = firebase.storage().bucket();
      await bucket.file(thumbnailPath).delete();
      console.log('Thumbnail deleted from Storage at', thumbnailPath);
      await bucket.file(filePath).delete();
      console.log('Thumbnail deleted from Storage at', filePath);
    });


exports.onUserCreate = functions
    .region(tokyoRegion)
    .firestore.document('users/{uid}/User/info')
    .onCreate((snap, context) => {
      const data = snap.data();
      data.objectID = context.params.uid;
      const index = client.initIndex(ALGOLIA_INDEX_NAME);
      return index.saveObject(data);
})
