const Home: React.FC = () => {
  return (
    <div className="ml-60 min-h-screen bg-gray-100 pl-10 pt-24">
      <h1 className="text-4xl">Home</h1>
      <div className="mr-5 min-h-full border-2 border-solid border-black pl-3 pr-5 pt-8">
        <h2 className="text-xl"> Info About Canopy</h2>
        <div className="h-60 border-2 border-solid border-black bg-white"></div>
        <h2 className="mt-5 text-xl"> Something Else</h2>
        <div className="h-60 border-2 border-solid border-black bg-white"></div>
      </div>
    </div>
  );
};

export default Home;
