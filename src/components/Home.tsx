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
        <div>
          <h2> Info About Canopy</h2>
          <div></div>
          <h2> Something Else</h2>
          <div></div>
        </div>
      </Paper>
    </div>
  );
};

export default Home;
