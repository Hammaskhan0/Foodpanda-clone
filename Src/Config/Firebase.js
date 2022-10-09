// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { setDoc, doc, getFirestore, getDoc, query, collection, getDocs, addDoc, where, onSnapshot } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5h5ylVcRh6DYIqpnsxQY3hzBiryCsG2A",
  authDomain: "food-1-7f096.firebaseapp.com",
  projectId: "food-1-7f096",
  storageBucket: "food-1-7f096.appspot.com",
  messagingSenderId: "85742175969",
  appId: "1:85742175969:web:eaacf185d46123b9cc19a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

async function register(form) {
  const { email, password, name, } = form
  const result = await createUserWithEmailAndPassword(auth, email, password,)
  const uid = result.user.uid
  await setDoc(doc(db, "users", uid), {
    email,
    name,
    uid,
  })
  return "done"
}

async function toLogin(form) {
  const {email,password} = form
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      // alert('Successfully logged in!')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage)
    });
}
async function getUsersdata() {
  const q = query(collection(db, "users"))
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    data = [...data, doc.data()]
  });
  return data
}

async function getUserLogin() {
  const userid = auth.currentUser.uid;
  // console.log(currentUser.uid)
  // const uid = auth.currentUser.uid
  const docRef = doc(db, "users", userid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

async function getRestaurantData(id) {
  const q = query(collection(db, "restaurants",))
  const querySnapshot = await getDocs(q);
  let data = []
  querySnapshot.forEach((doc) => {
    const restaurant = { ...doc.data(), id: doc.id }
    data.push(restaurant)
  })
  return data
}

async function getRestaurantItemsData(id) {
  const q = query(collection(db, "restaurants", id, "Items"))
  let data = []
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const restaurant = { ...doc.data(), id: doc.id }
    data.push(restaurant)
  })
  return data
}

async function getRestaurantById(id) {
  const docRef = doc(db, "restaurants", id);
  const docSnap = await getDoc(docRef);
 

  return docSnap.data()
}

 async function checkAndCreateRoom (friendId) {
  // return  new Promise ((resolve,reject)  =>{
// return new Promise((resolve, reject) => {

  const currentUserId = auth.currentUser.uid
  const users = { [friendId]: true, [currentUserId]: true };
 
const q = query(collection(db,'chatrooms'),where(`users.${friendId}`, '==', true),where(`users.${currentUserId}`, '==', true))
 const querySnapshot = await getDocs(q)
 let room = {} ;
querySnapshot.forEach((doc) => {
  room = doc.data();
  room.id = doc.id

  // doc.data() is never undefined for query doc snapshots
});
if (!room.id) {
  room = {users,createdAt : Date.now(),lastMessage:{}}
     addDoc(collection(db, "chatrooms"),room).then(res =>{
      room.id = res.id
      (room)
     })
}else{
  (room)
}

  // })
  
  
  // return data
}




export {
  register,
  getUserLogin,
  getRestaurantData,
  // getAdById
  getRestaurantById,
  getRestaurantItemsData,
  getUsersdata,
  checkAndCreateRoom,
  toLogin
}