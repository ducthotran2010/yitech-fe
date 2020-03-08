import axios from 'axios';

export const query = async ({
  method = 'GET',
  url,
  data = null,
  headers = {},
  params = {},
}) =>
  await axios({
    method,
    url,
    data,
    params,
    headers,
  });

export const METHOD = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};
