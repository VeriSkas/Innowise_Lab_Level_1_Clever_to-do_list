import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../api-config';

export const authHandler = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const logOut = () => {
  signOut(auth);
};
