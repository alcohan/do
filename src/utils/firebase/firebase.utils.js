import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyANo9zhgq-SfFjDphN2bfsDuk9ulKTm-vU",
    authDomain: "crwn-clothing-db-612fd.firebaseapp.com",
    projectId: "crwn-clothing-db-612fd",
    storageBucket: "crwn-clothing-db-612fd.appspot.com",
    messagingSenderId: "121612090570",
    appId: "1:121612090570:web:a765091f8b648867d08833",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters( {
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

//typically this wouldn't be front-end. 
export const addCollectionAndDocuments = async ( collectionKey, objectsToAdd ) => {
    const collectionReference = collection( db, collectionKey );
    const batch = writeBatch( db );

    objectsToAdd.forEach( (object) => {
        const docRef = doc( collectionReference, object.title.toLowerCase() );
        batch.set(docRef, object);
    })
    await batch.commit();
    console.log("done");
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection( db, 'categories' );
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
    
    // .reduce( (acc, docSnapshot) => {
    //     const { title, items } = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {});

    // return categoryMap;
};

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password ) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmail = async(email, password) => {
    if (!email || !password ) return;
    return await signInWithEmailAndPassword(auth,email,password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>  
    onAuthStateChanged(auth, callback);