import axios from 'axios';
const HOST: string = import.meta.env.VITE_SERVER_HOST || 'localhost';
const PORT: string = import.meta.env.VITE_GRAFANA_PORT || '3001';
const BASEURL = `http://${HOST}:${PORT}/grafana`;

export const getStats = async () => {
  const res = await axios.get(`${BASEURL}/stats`);
  console.log(res.data);
  return res.data;
};

// export const getUsageReport = async () => {
//   const res = await axios.get(`${BASEURL}/usage`);
//   console.log(res.data);
//   return res.data;
// };
