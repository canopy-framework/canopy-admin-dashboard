import { getStats, getConfig } from 'services/grafana';
import { getClickhouseStats } from 'services/clickhouse';
import { ClickhouseStats, GrafanaStats, CloudfrontInfo } from 'types/stats';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

type Category = 'general' | 'totals' | 'users' | 'activity';

// const GRAFANA_URL = `http://${import.meta.env.VITE_SERVER_HOST}:${
//   import.meta.env.VITE_GRAFANA_PORT
// }`;

export function ClickhouseAccordion({
  clickhouseStats
}: {
  clickhouseStats: ClickhouseStats;
}) {
  const clickHouseInfoData = () => {
    const keys = Object.keys(clickhouseStats);
    if (keys.length > 0) {
      return keys.map((field) => {
        return (
          <li key={field}>
            <strong>{field.toUpperCase()}</strong>: {clickhouseStats[field]}
          </li>
        );
      });
    } else {
      return 'no data from ClickHouse';
    }
  };
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>overview</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div id="clickhouse_stats">
            <div>
              <ul style={{ listStyleType: 'none' }}>{clickHouseInfoData()}</ul>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export function GrafanaAccordion({
  grafanaStats
}: {
  grafanaStats: GrafanaStats;
}) {
  const grafanaInfoData = (category: Category) => {
    console.log(grafanaStats);
    const dataCheck = Object.keys(grafanaStats);
    if (dataCheck.length > 0) {
      const keys = Object.keys(grafanaStats[category]);
      return keys.map((field) => {
        return (
          <li key={field}>
            <strong>{field.toUpperCase()}</strong>: {grafanaStats[category][field]}
          </li>
        );
      });
    } else {
      return 'no data from Grafana';
    }
  };
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>overview</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div id="grafana_general">
            <div>
              <ul style={{ listStyleType: 'none' }}>{grafanaInfoData('general')}</ul>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>totals</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div id="grafana_general">
            <div>
              <ul style={{ listStyleType: 'none' }}>{grafanaInfoData('totals')}</ul>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>users</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div id="grafana_general">
            <div>
              <ul style={{ listStyleType: 'none' }}>{grafanaInfoData('users')}</ul>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>activity</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div id="grafana_general">
            <div>
              <ul style={{ listStyleType: 'none' }}>{grafanaInfoData('activity')}</ul>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
const Monitor: React.FC<{ [key: string]: CloudfrontInfo }> = ({
  cloudfrontInfo
}) => {
  const [grafanaStats, setGrafanaStats] = useState<GrafanaStats>({});
  const [grafanaConfig, setGrafanaConfig] = useState({});
  const [clickhouseStats, setClickhouseStats] = useState<ClickhouseStats>({});

  useEffect(() => {
    getStats().then((res) => {
      setGrafanaStats(res);
    });
    getConfig().then((res) => {
      setGrafanaConfig(res);
    });
    getClickhouseStats().then((res) => {
      setClickhouseStats(res);
    });
  }, []);

  const cloudfrontInfoData = () => {
    const keys = Object.keys(cloudfrontInfo);
    if (keys.length > 0) {
      return keys.map((field) => {
        return (
          <li key={field}>
            <strong>{field.toUpperCase()}</strong>: {cloudfrontInfo[field]}
          </li>
        );
      });
    }
  };

  return (
    <div>
      <div>
        <h2> CloudFront CDN</h2>
        <Paper
          sx={{
            maxWidth: 936,
            height: '100%',
            margin: 'none',
            overflow: 'hidden',
            padding: '10px'
          }}
        >
          <div>
            <div id="cloudfront_info">
              <div style={{ display: 'block' }}>
                <h3>Summary</h3>
                <ul style={{ display: 'inline-block', listStyleType: 'none' }}>
                  {cloudfrontInfoData()}
                </ul>
                <Button
                  variant="contained"
                  href={`http://${grafanaConfig.host}:${grafanaConfig.port}`}
                  target="_blank"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', float: 'right', right: '20%', height: '80px', width: '200px' }}
                >
                  <img
                    src="Grafana_icon.png"
                    alt="Grafana icon"
                    style={{
                      height: '25px',
                      width: '25px',
                      marginBottom: '-6px',
                      display: 'inline-block'
                    }}
                  />
                  <Typography
                    variant="body1"
                    style={{
                      height: '25px',
                      width: '100px',
                      display: 'inline-block',
                      marginLeft: '8px'
                    }}
                  >
                    Open Grafana
                  </Typography>
                </Button>
              </div>
              <div>
                <div style={{ display: 'inline-block' }}></div>
              </div>
            </div>
          </div>
        </Paper>
        <h2> System Information</h2>
        <Paper
          sx={{
            maxWidth: 936,
            height: '100%',
            margin: 'none',
            overflow: 'hidden',
            padding: '10px'
          }}
        >
          <div>
            <h3>ClickHouse Database</h3>
            <ClickhouseAccordion
              clickhouseStats={clickhouseStats}
            ></ClickhouseAccordion>
            <h3>Grafana</h3>
            <GrafanaAccordion grafanaStats={grafanaStats}></GrafanaAccordion>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Monitor;
