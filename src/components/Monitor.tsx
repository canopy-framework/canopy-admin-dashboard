//#2c193e
const Monitor: React.FC = () => {
  return (
    <div className="ml-60 min-h-screen bg-gray-100 pl-10 pt-24">
      <h1 className="text-4xl">Monitor</h1>
      <div className="mr-5 min-h-full border-2 border-solid border-black pl-3 pr-5 pt-8">
        <h2 className="text-xl"> CloudFront CDN</h2>
        <div className="h-60 border-2 border-solid border-black bg-white">
          <h2>CloudFront CDN</h2>
          <p>Distribution Name</p>
          <p>Creation Date</p>
          <button>Open Grafana Dashboard</button>
          <button>Set up Alerts</button>
        </div>
        <h2 className="mt-5 text-xl"> System Information</h2>
        <div className="h-60 border-2 border-solid border-black bg-white">
          <h2>System Information</h2>
          <h3>ClickHouse Database</h3>
          <h3>Grafana</h3>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
