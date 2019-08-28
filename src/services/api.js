import axios from 'axios';

axios.defaults.headers.common.Authorization =
  process.env.REACT_APP_GITHUB_TOKEN || '';

export default axios.create({
  baseURL: 'https://api.github.com',
});
