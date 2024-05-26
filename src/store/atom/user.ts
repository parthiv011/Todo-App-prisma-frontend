import { atom, selector } from 'recoil';
import axios from 'axios';

export interface InputUser {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
}

export const userAtom = atom<InputUser>({
  key: 'userAtom',
  default: selector<InputUser>({
    key: 'userAtomSelector',
    get: async () => {
      const user: InputUser = {
        userId: '',
        username: '',
        firstName: '',
        lastName: '',
      };

      const token = localStorage.getItem('token');

      if (!token) return user;

      try {
        const getUserDetails = await axios.get(
          'http://localhost:3000/api/user/',
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        
        console.log(token);
        user.userId = getUserDetails.data.id;
        user.username = getUserDetails.data.username;
        user.firstName = getUserDetails.data.firstName;
        user.lastName = getUserDetails.data.lastName;
      } catch (e) {
        console.error('Error Fetching userDetails', e);
        localStorage.removeItem('token');
      }
      return user;
    },
  }),
});
