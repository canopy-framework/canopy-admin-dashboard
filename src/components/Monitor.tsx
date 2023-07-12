const Monitor: React.FC = () => {
  return (
    <div className="h-screen w-full border-2">
      <h1>Monitor</h1>
      <div>
        <div>
          <h2>CloudFront CDN</h2>
          <p>Distribution Name</p>
          <p>Creation Date</p>
          <button>Open Grafana Dashboard</button>
          <button>Set up Alerts</button>
        </div>
        <div>
          <h2>System Information</h2>
          <h3>ClickHouse Database</h3>
          <h3>Grafana</h3>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
