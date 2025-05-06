import {
  createHashRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./home/Home";
import Standings from "./standings/Standings";
import StandingsLoader from "./standings/StandingsLoader";
import Stats from "./stats/Stats";
import StatsGraph from "./stats/StatsGraph";
import StatsLoader from "./stats/StatsLoader";
import Prediction from "./prediction/Prediction";
// import ErrorPage from "./ErrorPage";

const RoutesJSX = (
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} index />

    <Route path="standings" element={<Standings />} loader={StandingsLoader}>
      {/* errorElement={<ErrorPage />}  */}
    </Route>
    <Route path="/stats/:stat" loader={StatsLoader} element={<StatsGraph />}/>
    <Route path="/stats" element={<Stats />} /> 
    <Route path="/prediction" element={<Prediction/>} /> 
  </Route>
);

export const router = createHashRouter(createRoutesFromElements(RoutesJSX));
