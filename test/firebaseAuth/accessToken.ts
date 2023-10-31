import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from './app.firebase';

export const getAccessToken = async () => {
  const userLogin: UserCredential = await signInWithEmailAndPassword(
    firebaseAuth,
    process.env.USER_EMAIL,
    process.env.USER_PASSWORD,
  );

  return await userLogin.user.getIdToken();
};
