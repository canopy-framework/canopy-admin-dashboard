import { getStats } from 'services/grafana';
import { getClickhouseStats } from 'services/clickhouse';
import { ClickhouseStats, GrafanaStats, CloudfrontInfo } from 'types/stats';
import { useState, useEffect } from 'react';

const Monitor: React.FC<{ [key: string]: CloudfrontInfo }> = ({
  cloudfrontInfo
}) => {
  const [grafanaStats, setGrafanaStats] = useState<GrafanaStats>({});
  const [clickhouseStats, setClickhouseStats] = useState<ClickhouseStats>({});
  useEffect(() => {
    getStats().then((res) => {
      setGrafanaStats(res);
    });
    getClickhouseStats().then((res) => {
      setClickhouseStats(res);
    });
  }, []);

  type Category = 'general' | 'totals' | 'users' | 'activity';

  const grafanaInfoData = (category: Category) => {
    const keys = Object.keys(grafanaStats);
    if (keys.length > 0) {
      const keys = Object.keys(grafanaStats);
      return keys.map((field) => {
        return (
          <li key={field}>
            {field}: {grafanaStats[category][field]}
          </li>
        );
      });
    } else {
      return 'no data from Grafana';
    }
  };
  const clickHouseInfoData = () => {
    const keys = Object.keys(clickhouseStats);
    if (keys.length > 0) {
      return keys.map((field) => {
        return (
          <li key={field}>
            {field}: {clickhouseStats[field]}
          </li>
        );
      });
    } else {
      return 'no data from ClickHouse';
    }
  };

  const cloudfrontInfoData = () => {
    const keys = Object.keys(cloudfrontInfo);
    if (keys.length > 0) {
      return keys.map((field) => {
        return (
          <li key={field}>
            {field}: {cloudfrontInfo[field]}
          </li>
        );
      });
    }
  };

  return (
    <div>
      <h1>Monitor</h1>
      <div>
        <h2> CloudFront CDN</h2>
        <div>
          <h2>CloudFront CDN</h2>
          <p>Distribution Name</p>
          <div id="cloudfront_info">
            <div>
              <h3>Summary</h3>
              <ul>{cloudfrontInfoData()}</ul>
            </div>
            <div>
              <div>
                <a
                  href={`http://${import.meta.env.VITE_SERVER_HOST}:${
                    import.meta.env.VITE_GRAFANA_PORT
                  }`}
                >
                  <img src="Grafana_icon.png" alt="Grafana icon" />
                  <p>Open Grafana</p>
                </a>
              </div>
              <div>
                <a href="/monitor/alerts">Set up Alerts</a>
              </div>
            </div>
          </div>
        </div>
        <h2> System Information</h2>
        <div>
          <h2>System Information</h2>
          <h3>ClickHouse Database</h3>
          <div id="clickhouse_stats">
            <div>
              <h3>Summary</h3>
              <ul>{clickHouseInfoData()}</ul>
            </div>
          </div>
          <h3>Grafana</h3>
          <div id="grafana_stats">
            <div>
              <h3>Summary</h3>
              <ul>{grafanaInfoData('general')}</ul>
            </div>
            <div>
              <h3>-</h3>
              <ul>{grafanaInfoData('totals')}</ul>
            </div>
            <div>
              <h3>Users</h3>
              <ul>{grafanaInfoData('users')}</ul>
            </div>
            <div>
              <h3>Activity</h3>
              <ul>{grafanaInfoData('activity')}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
