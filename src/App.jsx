import "./App.css";

// Pages
import Loader from "./components/Loaders/Loader.jsx";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";

// styles
import "./styles/global.scss";

function App() {
  return (
    <>
      <Loader />

      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default App;
