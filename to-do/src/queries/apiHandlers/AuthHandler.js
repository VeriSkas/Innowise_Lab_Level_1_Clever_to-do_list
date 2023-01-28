import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../apiConfig';

export const authHandler = async (email, password) =>
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => ({ uid: userCredential.user.uid }))
    .catch((error) => ({ error }));
