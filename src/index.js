import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route,Switch } from "react-router-dom";
import Layout from "./pages/Layout";
import PageDetail from "./pages/PageDetail";
import Home from "./pages/Home";

import NoPage from "./pages/NoPage";
import 'animate.css';
import '../src/assets/mycss/custom.css'
import { shortLink } from "./assets/myconfig/config";

export default function App() {
  return (

    <BrowserRouter basename={shortLink}>
      <Routes >
        <Route exact path="/" element={<Layout />}>
        <Route index element={<Home/>} />
        <Route path="detail" element={<PageDetail/>} /> 
         
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);