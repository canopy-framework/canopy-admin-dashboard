import axios from 'axios';
const HOST: string = import.meta.env.VITE_SERVER_HOST || 'localhost';
const PORT: string = import.meta.env.VITE_SERVER_PORT || '3001';
const BASEURL = `http://${HOST}:${PORT}/grafana`;

export const getStats = async () => {
  const res = await axios.get(`${BASEURL}/stats`);
  return res.data;
};

export const getConfig = async () => {
  const res = await axios.get(`${BASEURL}/config`);
  return res.data;
};
