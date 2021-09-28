import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { firebaseConfig } from "./config";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);

export const handleUserProfile = async (userAuth, additionalData) => {
if (!userAuth) return;
const { uid } = userAuth;

const userRef = firestore.doc(`users/${uid}`);
const snapshot = await userRef.get();

if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();
    try {
await userRef.set({
    displayName,
    email,
    createdDate: timestamp,
    ...additionalData

});
    } catch(error) {
        // console.log(err);
    }
}
return userRef;
};