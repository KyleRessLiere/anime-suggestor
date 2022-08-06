import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import AboutMe from "./components/AboutMe/AboutMe";
import AnimeCard from "./components/AnimeCard/AnimeCard";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="about" element={<AboutMe />} />
      <Route path="anime" element={<AnimeCard />} />

    </Routes>
  </BrowserRouter>
);