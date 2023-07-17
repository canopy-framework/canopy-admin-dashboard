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
    <div className="ml-60 min-h-screen bg-gray-100 pl-10 pt-24">
      <h1 className="text-4xl">Monitor</h1>
      <div className="mr-5 min-h-full border-2 border-solid border-black pl-3 pr-5 pt-8">
        <h2 className="text-xl"> CloudFront CDN</h2>
        <div className="h-60 border-2 border-solid border-black bg-white">
          <h2>CloudFront CDN</h2>
          <p>Distribution Name</p>
          <div id="cloudfront_info" className="flex gap-5 pl-5">
            <div>
              <h3 className="text-lg font-bold">Summary</h3>
              <ul>{cloudfrontInfoData()}</ul>
            </div>
            <div>
              <div>
                <a
                  href={`http://${import.meta.env.VITE_SERVER_HOST}:${
                    import.meta.env.VITE_GRAFANA_PORT
                  }`}
                >
                  <img
                    className="mr-3 inline-block h-8 w-8"
                    src="Grafana_icon.png"
                    alt="Grafana icon"
                  />
                  <p className="inline-block">Open Grafana</p>
                </a>
              </div>
              <div>
                <a className="block" href="/monitor/alerts">
                  Set up Alerts
                </a>
              </div>
            </div>
          </div>
        </div>
        <h2 className="mt-5 text-xl"> System Information</h2>
        <div className="h-full border-2 border-solid border-black bg-white">
          <h2>System Information</h2>
          <h3 className="text-xl font-bold">ClickHouse Database</h3>
          <div id="clickhouse_stats" className="flex gap-5 pl-5">
            <div>
              <h3 className="text-lg font-bold">Summary</h3>
              <ul>{clickHouseInfoData()}</ul>
            </div>
          </div>
          <h3 className="text-xl font-bold">Grafana</h3>
          <div id="grafana_stats" className="flex gap-5 pl-5">
            <div>
              <h3 className="text-lg font-bold">Summary</h3>
              <ul>{grafanaInfoData('general')}</ul>
            </div>
            <div>
              <h3 className="text-lg font-bold">-</h3>
              <ul>{grafanaInfoData('totals')}</ul>
            </div>
            <div>
              <h3 className="text-lg font-bold">Users</h3>
              <ul>{grafanaInfoData('users')}</ul>
            </div>
            <div>
              <h3 className="text-lg font-bold">Activity</h3>
              <ul>{grafanaInfoData('activity')}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
