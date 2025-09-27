import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDN1KpOigYrBvPAYJ3kxaAmYXUAqNBRpi8",
  authDomain: "pokemon-team-builder-daecc.firebaseapp.com",
  projectId: "pokemon-team-builder-daecc",
  storageBucket: "pokemon-team-builder-daecc.firebasestorage.app",
  messagingSenderId: "996933847251",
  appId: "1:996933847251:web:f3fd2a95d960578571ac26",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };
