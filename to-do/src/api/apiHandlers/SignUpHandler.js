import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../api-config';

export const signUpHandler = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => ({ uid: userCredential.user.uid }))
    .catch((error) => ({ error }));

  return result;
};
