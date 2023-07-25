import Paper from '@mui/material/Paper';
const Home: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <Paper
        sx={{
          maxWidth: 936,
          height: '100%',
          margin: 'none',
          overflow: 'hidden',
          padding: '20px'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h2>Canopy</h2>
          <img src="blue_sam.png" style={{ height: 100, width: 100 }} />
          <p>
            Canopy is an open-source framework that deploys an end-to-end pipeline for collecting, transforming, storing and monitoring Amazon CloudFront CDN logs and metrics. Log and metric data are available to development teams on a dashboard that visualizes a critical suite of metrics in real-time, and alerts are sent when metrics indicate a performance degradation so that immediate action can be taken.
          </p>
          <p>Checkout the Configure page to to configure and launch your pipeline!</p>
        </div>
      </Paper>
    </div>
  );
};

export default Home;
