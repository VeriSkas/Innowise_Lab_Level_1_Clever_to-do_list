import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from '../apiConfig';

export const authHandler = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => ({ uid: userCredential.user.uid }))
    .catch((error) => ({ error }));

  return result;
};

export const logOut = () => {
  signOut(auth);
};
