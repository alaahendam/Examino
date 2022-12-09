import './App.css';
import NavBar from './component/navBar/navBar';
import Footer from './component/footer/footer';
import Home from './pages/home/home';
function App() {
  return (
    <div className="App">
      <NavBar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
