export const accessTokenKey = 'accessToken';

export const setAccessToken = token => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(accessTokenKey, token);
  }
};

export const clearAccessToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(accessTokenKey);
  }
};

export const getAccessToken = () => {
  let accessToken;

  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem(accessTokenKey);
  }

  return accessToken;
};
