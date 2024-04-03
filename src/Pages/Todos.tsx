import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import isAuthSelector from '../store/selectors/isAuth';
import { userAtom } from '../store/atom/user';

export const Todos = () => {
  const isAuthenticated = useRecoilValueLoadable(isAuthSelector);
  const [currUser, setCurrentUser] = useRecoilState(userAtom);
  return (
    <>
      {isAuthenticated.state === 'hasValue' && isAuthenticated.contents ? (
        <div>Welcome, {currUser.firstName}</div>
      ) : (
        <div> Please log in to view your todos</div>
      )}
    </>
  );
};
