import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideNavBar from "../sidenavbar";
import Dashboard from "../dashboard";
import LeaveManagement from "../leavemanagement";
import TaxDeclaration from "../taxdeclaration";
import {
  DASHBOARD_PAGE,
  LEAVE_MANAGEMENT,
  TAX_DECLARATION,
} from "../utils/constants";

const RouterComp = () => {
  return (
    <SideNavBar>
      <Routes>
        <Route path={DASHBOARD_PAGE} element={<Dashboard />} />
        <Route path={LEAVE_MANAGEMENT} element={<LeaveManagement />} />
        <Route path={TAX_DECLARATION} element={<TaxDeclaration />} />
      </Routes>
    </SideNavBar>
  );
};

export default RouterComp;
