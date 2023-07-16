import axios from 'axios';
import { Alerts, AlertNamesArray } from 'types/alert';

const HOST: string = import.meta.env.VITE_SERVER_HOST || 'localhost';
const PORT: string = import.meta.env.VITE_SERVER_PORT || '3001';
const BASEURL = `http://${HOST}:${PORT}/alert`;

export const getQuickAlerts = async (): Promise<Alerts> => {
  const res = await axios.get(`${BASEURL}/all`);
  return res.data;
};

export const alert = async (
  alertsToConfigure: AlertNamesArray
): Promise<AlertNamesArray> => {
  const res = await axios.post(`${BASEURL}`, {
    data: alertsToConfigure
  });
  // dummy response
  return res.data;
};

const alertService = {
  getQuickAlerts,
  alert
};

export default alertService;
