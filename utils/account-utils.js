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
    localStorage.removeItem(accessTokenKey);
    Cookies.set(accessTokenKey, '');
  }
};

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(accessTokenKey);
  }
  return undefined;
};

export const getAccessTokenCtx = ctx => {
  const { accessToken } = nextCookie(ctx);
  return accessToken;
};
