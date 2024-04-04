import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
} from '@chakra-ui/react';
import { PasswordInput } from '../components/ui/PasswordInput';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FormInput } from '../components/ui/FormInput';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
import { useSetRecoilState, useRecoilValueLoadable } from 'recoil';
import { userAtom } from '../store/atom/user';
import isAuthSelector from '../store/selectors/isAuth';
import axios from 'axios';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const setUser = useSetRecoilState(userAtom);
  const isAuthenticated = useRecoilValueLoadable(isAuthSelector);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/todos');
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/login',
        {
          username,
          password,
        }
      );
      const token = response.data.token;
      setUser({
        ...response.data.user,
      });

      localStorage.setItem('token', `Bearer ${token}`);
      navigate('/todos');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data.message);
      }
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <Center h={'100vh'}>
        <Box border="1px" borderColor="gray.200" rounded={8}>
          <Container maxW="md" p={6}>
            <Heading size="lg" mb={4}>
              Login Here For TodosApp!
            </Heading>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired={true}>
                <FormLabel>Email address</FormLabel>
                <FormInput
                  type="email"
                  placeholder={'Enter Username'}
                  value={username}
                  onChange={handleUsernameChange}
                />
                <FormLabel>Password</FormLabel>
                <PasswordInput
                  onChange={handlePasswordChange}
                  value={password}
                />
                <Link as={ReactRouterLink} to={'/signup'}>
                  Don't Have an Account? Register Here
                </Link>
                <Center>
                  <Button type="submit" colorScheme="teal" w="100%" mt={2}>
                    Submit
                  </Button>
                </Center>
              </FormControl>
            </form>
          </Container>
        </Box>
      </Center>
    </>
  );
};
