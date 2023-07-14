import { getStats } from 'services/grafana';
import { getClickhouseStats } from 'services/clickhouse';
import { getCloudfrontInfo } from 'services/cloudfront';
import { useState, useEffect } from 'react';

const Monitor: React.FC = () => {
  const [cloudfrontInfo, setCloudfrontInfo] = useState({});
  const [grafanaStats, setGrafanaStats] = useState({});
  const [clickhouseStats, setClickhouseStats] = useState({});
  useEffect(() => {
    getStats().then((res) => {
      setGrafanaStats(res);
    });
    getClickhouseStats().then((res) => {
      setClickhouseStats(res);
    });
    getCloudfrontInfo().then((res) => {
      setCloudfrontInfo(res);
    });
  }, []);

  const grafanaInfoData = (category: string) => {
    const keys = Object.keys(grafanaStats);
    console.log('grafana stats', grafanaStats);
    if (keys.length > 0) {
      return Object.keys(grafanaStats[category]).map((field) => {
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
              <button className="block">Open Grafana Dashboard</button>
              <button className="block">Set up Alerts</button>
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
