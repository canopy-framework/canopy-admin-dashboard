import { Router } from 'express';
import fs from 'fs';
const filePath = '../aws-config.json';
const router = Router();

router.post('/setAWSInfo', (req, res) => {
  const data = req.body.data;
  console.log(data);
  const jsonData = JSON.stringify(data, null, 2);
  try {
    fs.writeFileSync(filePath, jsonData);
  } catch (err) {
    res.status(500).json({ error: 'error writing to config file ' + err });
  }

  res.status(204).send();
});

export default router;
