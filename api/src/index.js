import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import routes from './routes';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/cloudfront', routes.cloudfront);
app.use('/grafana', routes.grafana);
app.use('/clickhouse', routes.clickhouse);
app.use('/alert', routes.alert);
app.use('/configure', routes.configure);
app.use('/deploy', routes.deploy);
app.use('/destroy', routes.destroy);

app.listen(PORT, () => {
  console.log('Temp Admin Dashboard Server listening on port ' + PORT);
});
