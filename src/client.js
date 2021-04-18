import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import jwt from 'jsonwebtoken';

const TOKEN = 'token';

export const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_URL,
  cache: new InMemoryCache(),
});

export const logUserIn = token => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  isAdminVar(isLoggedInUserAdmin());
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  isAdminVar(false);
};

export const getUserId = () => {
  const token = localStorage.getItem(TOKEN);
  if (!token) {
    return false;
  }
  const { id } = jwt.verify(token, process.env.REACT_APP_JWT_SECRET_KEY);
  return id;
};

export const isLoggedInUserAdmin = () => {
  const token = localStorage.getItem(TOKEN);
  if (!token) {
    return false;
  }
  const { admin } = jwt.verify(token, process.env.REACT_APP_JWT_SECRET_KEY);
  return admin;
};

export const isLoggedInVar = makeVar(Boolean(getUserId()));
export const isAdminVar = makeVar(isLoggedInUserAdmin());
