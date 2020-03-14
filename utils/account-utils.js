import nextCookie from 'next-cookies';
import Cookies from 'js-cookie';

export const accessTokenKey = 'accessToken';

export const setAccessToken = token => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(accessTokenKey, token);
    Cookies.set(accessTokenKey, token, { expires: 15 });
  }
};

export const clearAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.removeItem(accessTokenKey);
  }

  return Cookies.set(accessTokenKey, '');
};

export const getAccessToken = () => {
  let accessToken;

  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem(accessTokenKey);
  }

  return accessToken;
};

export const getAccessTokenCtx = ctx => {
  const { accessToken } = nextCookie(ctx);
  return accessToken;
};
