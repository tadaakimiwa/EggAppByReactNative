
const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

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
