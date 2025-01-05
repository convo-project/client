import "../src/styles/globals.css";
import Layout from "./components/common/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
