import { signOut } from 'firebase/auth';

import { auth } from '../apiConfig';

export const logOut = () => {
  signOut(auth);
};
