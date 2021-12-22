import BrandComponent from './BrandComponent';

function App() {
  return (
    <div className="App">
      <h1>Current brand is {process.env.REACT_APP_BRAND}</h1>
      <BrandComponent pants={[]} shirts={[]} socks={[]} />
    </div>
  );
}

export default App;
