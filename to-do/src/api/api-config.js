import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

export const databaseURL =
  'https://clever-to-do-c6104-default-rtdb.europe-west1.firebasedatabase.app';

const firebaseConfig = {
  apiKey: 'AIzaSyDi7rXX5WKblCFwfEocHIOhV_-dkZiugH0',
  authDomain: 'clever-to-do-c6104.firebaseapp.com',
  databaseURL:
    'https://clever-to-do-c6104-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'clever-to-do-c6104',
  storageBucket: 'clever-to-do-c6104.appspot.com',
  messagingSenderId: '1051467986788',
  appId: '1:1051467986788:web:b87458f31873060cdb6c71',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
