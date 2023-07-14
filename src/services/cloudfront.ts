import axios from 'axios';
const HOST: string = import.meta.env.VITE_SERVER_HOST || 'localhost';
const PORT: string = import.meta.env.VITE_SERVER_PORT || '3001';
const BASEURL = `http://${HOST}:${PORT}/cloudfront`;

export const getCloudfrontInfo = async () => {
  const res = await axios.get(`${BASEURL}/info`);
  return res.data;
};

export default getCloudfrontInfo;
