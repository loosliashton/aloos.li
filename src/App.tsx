import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import RedirectPage from "./RedirectPage";
import { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    window.location.href = "https://ashtonloosli.com";
  }, []);

  return <div>Redirecting...</div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:shortUrl" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
