import { Router } from 'express';
import { exec } from 'child_process';
import fs from 'fs';
const filePath = '../aws-config.json';
const router = Router();

router.post('/setAWSInfo', (req, res) => {
  const data = req.body.data;
  console.log(data);

  exec(`canopy configure -an ${data.accountNumber} -dID ${data.distributionId} -ep ${data.httpEndpoint} -sk ${data.secretKey} -r ${data.region} -ak ${data.accessKeyId}`, (error, stdout, stderr) => {
    if (error) {
      console.log('error: ', error);
    }
    if (stderr) {
      console.log('stderr: ', stderr);
    }
    console.log('stdout: ', stdout);
  });

  res.status(204).json({ message: 'success' });
});

export default router;
