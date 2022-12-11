import { Routes, Route} from "react-router-dom";
import './App.css';
import NavBar from './component/navBar/navBar';
import Footer from './component/footer/footer';
import Home from './pages/home/home';
import SignIn from "./pages/signIn/signIn";
import SignUp from "./pages/signUp/signUp";
import About from "./pages/about/about";
import ContactUs from "./pages/contactUs/contactUs";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
      <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactUs" element={<ContactUs />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
