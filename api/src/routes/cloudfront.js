import awsConfigData from '../../aws-config.json';

import { Router } from "express";
import axios from "axios";

const router = Router();

const getCloudFrontInfo = () => {
  const info = {};
  try {
    info["distributionId"] = awsConfigData.distributionId;
    info["region"] = awsConfigData.region;
  } catch(err) {
    return {error: ("Error fetching CloudFront info " + err)};
  }
  return info;
}

router.get('/info', (req, res) => {
  let info;
  try {
    info = getCloudFrontInfo()
  } catch(err) {
    return res.status(500).send(err);
  }
  console.log("firing info", info);
  return res.status(200).json(info);
})

export default router;