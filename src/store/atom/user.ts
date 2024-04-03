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
      let user: InputUser = {
        userId: '',
        username: '',
        firstName: '',
        lastName: '',
      };

      const token = localStorage.getItem('token');

      if (!token) return user;

      try {
        const getUserDetails = await axios.get(
          'http://localhost:3000/api/user',
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        user = {
          userId: getUserDetails.data.id,
          username: getUserDetails.data.username,
          firstName: getUserDetails.data.firstName,
          lastName: getUserDetails.data.lastName,
        };
      } catch (e) {
        console.error('Error Fetching userDetails', e);
        localStorage.removeItem('token');
      }
      return user;
    },
  }),
});
