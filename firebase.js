// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/madquiz2";
import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCInERovCx3NdewKhv_S7gBiv1_dHTIsPY",
  authDomain: "quiz2-f0575.firebaseapp.com",
  projectId: "quiz2-f0575",
  storageBucket: "quiz2-f0575.appspot.com",
  messagingSenderId: "159937899855",
  appId: "1:159937899855:web:fe8ebc8aa01700c636293a",
  measurementId: "G-NKC2CHCZM4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// export const auth = getAuth(firebaseApp);
export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// change the rules of Storage as follows:

// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if true;
//     }
//   }
// }

export const storage = getStorage(firebaseApp);
