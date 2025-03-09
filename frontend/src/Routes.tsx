import { createHashRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./home/Home";
import Standings from "./standings/Standings";
// import ErrorPage from "./ErrorPage";
// import { StandingsLoader, ResultsLoader } from "./loaders";

const RoutesJSX = (
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} index />
    
    <Route path="standings" element={<Standings />}>
      {/* <Route 
        path=":year" 
        loader={StandingsLoader} 
        element={<SeasonEndStandings />} 
        errorElement={<ErrorPage />} 
      /> */}
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
