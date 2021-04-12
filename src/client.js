import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import jwt from 'jsonwebtoken';

const TOKEN = 'token';

export const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_URL,
  cache: new InMemoryCache(),
});

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = token => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
};

export const getUserId = () => {
  const token = localStorage.getItem(TOKEN);
  const { id } = jwt.verify(token, process.env.REACT_APP_JWT_SECRET_KEY);
  return id;
};
