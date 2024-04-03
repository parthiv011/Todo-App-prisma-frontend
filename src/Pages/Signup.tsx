import {
  Center,
  Container,
  FormControl,
  FormLabel,
  Button,
  Box,
  Heading,
} from '@chakra-ui/react';
import { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import { FormInput } from '../components/ui/FormInput';
import { PasswordInput } from '../components/ui/PasswordInput';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { userAtom } from '../store/atom/user';
import isAuthSelector from '../store/selectors/isAuth';
import axios from 'axios';

export const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const setUser = useSetRecoilState(userAtom);
  const isAuthenticated = useRecoilValueLoadable(isAuthSelector);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const onRegisterClicked = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/user/signup', {
        username,
        password,
        firstName,
        lastName,
      });
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

  const handleFirstnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setFirstName(e.target.value);
  };
  const handleLastnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setLastName(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setPassword(e.target.value);
  };

  return (
    <Center h={'100vh'}>
      <Box border="1px" borderColor="gray.200" rounded={8}>
        <Container maxW="md" p={6}>
          <Heading size="lg" mb={4}>
            Register Here for TodosApp!
          </Heading>
          <form onSubmit={onRegisterClicked}>
            <FormControl isRequired={true}>
              <FormLabel>First Name</FormLabel>
              <FormInput
                type="text"
                placeholder="Chandler"
                value={firstName}
                onChange={handleFirstnameChange}
              />
              <FormLabel>Last Name</FormLabel>
              <FormInput
                type="text"
                placeholder="Bing"
                value={lastName}
                onChange={handleLastnameChange}
              />
              <FormLabel>Email address</FormLabel>
              <FormInput
                type="email"
                placeholder="Enter Username"
                value={username}
                onChange={handleUsernameChange}
              />
              <FormLabel>Password</FormLabel>
              <PasswordInput value={password} onChange={handlePasswordChange} />
              <Link as={ReactRouterLink} to="/login">
                Already have an Account? Login Here
              </Link>
              <Center>
                <Button colorScheme="teal" w="100%" mt={2} type="submit">
                  Submit
                </Button>
              </Center>
            </FormControl>
          </form>
        </Container>
      </Box>
    </Center>
  );
};
