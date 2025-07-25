import { FirebaseApp, initializeApp } from "firebase/app";
import {
    Auth,
    createUserWithEmailAndPassword,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    UserCredential
} from "firebase/auth";

// Check if Firebase environment variables are available
const hasFirebaseConfig = !!(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID
);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;
let githubProvider: GithubAuthProvider | null = null;

if (hasFirebaseConfig) {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        googleProvider = new GoogleAuthProvider();
        githubProvider = new GithubAuthProvider();
    } catch (error) {
        console.error('Firebase initialization failed:', error);
    }
} else {
    console.warn('Firebase configuration missing. Social login will not work. Please create .env file with Firebase credentials.');
}

const signUpWithEmailAndPassword = (email: string, password: string): Promise<UserCredential> => {
    if (!auth) {
        throw new Error('Firebase not configured. Social authentication unavailable.');
    }
    return createUserWithEmailAndPassword(auth, email, password);
};

export {
    auth,
    githubProvider,
    googleProvider,
    hasFirebaseConfig,
    signInWithEmailAndPassword,
    signInWithPopup,
    signUpWithEmailAndPassword
};
