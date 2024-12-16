import React from "react";
import SideNavBar from "./modules/sidenavbar";
import Dashboard from "./modules/dashboard";
import RouterComp from "./modules/app/routes";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { useContextState } from "./modules/context";
import { DASHBOARD_PAGE } from "./modules/utils/constants";
import CounterComp from "./CounterComp";

function App() {
  const { user } = useContextState();
  return (
    <div>
      <CounterComp/>
      {/* <RouterComp /> */}
      {/* <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path={`/${user}`}
          element={<Navigate to={`/${user.userId}/dashboard`} />}
        />
        <Route
          path="/login"
          element={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                fontSize: "2em",
              }}
            >
              <Link to={`/${user.userId}/${DASHBOARD_PAGE}`}>
                Go to Dashboard
              </Link>
            </div>
          }
        />
        <Route path={`/${user.userId}/*`} element={<RouterComp />} />
      </Routes> */}
    </div>
  );
}

export default App;
