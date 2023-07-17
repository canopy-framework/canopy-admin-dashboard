import axios from 'axios';
const HOST: string = import.meta.env.VITE_SERVER_HOST || 'localhost';
const PORT: string = import.meta.env.VITE_SERVER_PORT || '3001';
const BASEURL = `http://${HOST}:${PORT}`;

export const destroy = async () => {
  const res = await axios.post(`${BASEURL}/destroy`);
  console.log('data from server', res.data);
  return res.data;
};
