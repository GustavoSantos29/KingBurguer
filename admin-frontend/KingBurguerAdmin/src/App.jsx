import Navbar from "./components/Navbar";
import { LogoHome } from "./assets/Logo/LogoHome";
import { BrowserRouter as Router } from "react-router-dom";
import ViewManager from "./components/ViewManager";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />

      <ViewManager />
    </Router>
  );
}

export default App;
