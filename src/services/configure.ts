import axios from 'axios';
const HOST: string = import.meta.env.VITE_SERVER_HOST || 'localhost';
const PORT: string = import.meta.env.VITE_SERVER_PORT || '3001';
const BASEURL = `http://${HOST}:${PORT}/configure`;
export const updateConfiguration = async (
  accountNumber: string,
  distributionId: string,
  httpEndpoint: string,
  secretKey: string,
  region: string,
  accessKeyId: string
) => {
  await axios.post(`${BASEURL}/setAWSInfo`, {
    data: {
      accountNumber,
      distributionId,
      httpEndpoint,
      secretKey,
      region,
      accessKeyId,
      deployed: false
    }
  });
};
