import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";
const config = {
  apiKey: "AIzaSyD4mXLD1I208HuaYC7vgvPEq-hWzhm01JY",
  authDomain: "ionic-app-d4e35.firebaseapp.com",
  databaseURL: "https://ionic-app-d4e35-default-rtdb.firebaseio.com",
  projectId: "ionic-app-d4e35",
  storageBucket: "ionic-app-d4e35.appspot.com",
  messagingSenderId: "337597408406",
  appId: "1:337597408406:web:905f48a6e4e48d91ff8eb7",
  measurementId: "G-N1MN26BVP0",
};

const app = initializeApp(config);
const auth = getAuth();

const db = getDatabase(app);

export function updateData(userId: any, name: string, birthdate: string) {
  set(ref(db, "users/" + userId), {
    name: name,
    birthdate: birthdate,
  });
}

export async function login(email: string, password: string) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function register(
  email: string,
  password: string,
  confirm: string
) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    return false;
  }
}

export function getData(userId: any) {
  const dbRef = ref(db);

  return get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return { name: "", birthdate: "" };
      }
    })
    .catch((error) => {
      return { name: "", birthdate: "" };
    });
}

export default auth;
