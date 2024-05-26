import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { userAtom } from '../store/atom/user';
import isAuthSelector from '../store/selectors/isAuth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CreateTodo } from '../components/CreateTodo';
import { Input } from '@chakra-ui/react';

interface Todo{
  id: number;
  title: string;
  description: string,
  done: boolean;
}

export const Todos = () => {
  const isAuthenticated = useRecoilValueLoadable(isAuthSelector);
  console.log(isAuthenticated);
  const currUser = useRecoilValue(userAtom);
  console.log(currUser);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        if (!isAuthenticated) return;
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/todos/', {
          headers: {
            Authorization: `${token}`,
          },
        });
        setTodos(response.data.todos);
      } catch (error) {
        console.error('Error Fetching the Data!', error);
      }
    };
    console.log(todos);

    fetchTodos();
  }, [isAuthenticated, currUser]);

  if (isAuthenticated.state === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
    
      <ul>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id}>
              <h2>{todo.title}</h2>
              <h4>{todo.description}</h4>
            </li>
          ))
        ) : (
          <li>No todos found</li>
        )}
      </ul>

      <CreateTodo />
    </>
  );
};
