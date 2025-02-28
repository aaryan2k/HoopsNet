import { Outlet } from "react-router-dom";
import Navigation from "./nav-bar/Navigation";
// import BasicSpinner from "./BasicSpinner";

function Layout() {
//   const { state } = useNavigation();
  return (
    <>
      <Navigation />
      <main>
        {/* {state === "loading" ? <BasicSpinner /> : <Outlet />} */}
        <Outlet />
      </main>
    </>
  );
}

export default Layout;

