import {
  createHashRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./home/Home";
import Standings from "./standings/Standings";
import StandingsLoader from "./standings/StandingsLoader";
// import ErrorPage from "./ErrorPage";

const RoutesJSX = (
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} index />

    <Route path="standings" element={<Standings />} loader={StandingsLoader}>
      {/* errorElement={<ErrorPage />}  */}
    </Route>

    {/* <Route 
      path="/results/:year" 
      loader={ResultsLoader} 
      element={<ResultSearch />} 
    />
    
    <Route path="/results" element={<Results />} />  */}
  </Route>
);

export const router = createHashRouter(createRoutesFromElements(RoutesJSX));
