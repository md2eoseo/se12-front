import { ApolloClient, HttpLink, InMemoryCache, makeVar } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import jwt from 'jsonwebtoken';

const TOKEN = 'token';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const httpLink = createUploadLink({
  uri: process.env.REACT_APP_BACKEND_URL,
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
