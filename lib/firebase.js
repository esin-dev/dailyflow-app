import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA2pdxAi9gh2fptL36r9S5vSsdfrpU_qSU",
  authDomain: "dailyflow-app-fe1f4.firebaseapp.com",
  projectId: "dailyflow-app-fe1f4",
  storageBucket: "dailyflow-app-fe1f4.firebasestorage.app",
  messagingSenderId: "398512543145",
  appId: "1:398512543145:web:dfcb8348055512911d20b8"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };