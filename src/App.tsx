import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RedirectPage from "./RedirectPage";
import { useEffect } from "react";
import AdminPage from "./Admin";

function HomePage() {
  useEffect(() => {
    window.location.href = "https://ashtonloosli.com";
  }, []);

  return <div></div>;
}

function NotFoundPage() {
  return <div>404 Not Found</div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:shortUrl" element={<RedirectPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
