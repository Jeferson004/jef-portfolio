import "./App.css";

// Pages
// import Loader from "./components/Loaders/Loader.jsx";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Noise from "./components/Noise/Noise.jsx";

// components

// styles

function App() {
  return (
    <>
      <Noise>

        {/* <Loader /> */}

        <Header />

        <main>
          <Home />
        </main>

        <Footer />
      </Noise>
    </>
  );
}

export default App;
