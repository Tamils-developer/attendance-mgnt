import React, { useEffect, useState } from "react";
import "./sideBar.css";
import GridViewIcon from "@mui/icons-material/GridView";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const SideNavBar = ({ children }: any) => {
  const [selected, setSelected] = useState<string>("");
  let location = useLocation();
  let val = location.pathname.split("/").slice(-1)[0];

  useEffect(() => {

    console.log(val);
    setSelected(val);
  }, []);

  const selectionChange = (selection: any) => {
    setSelected(selection);
  };
  return (
    <Box>
      <Box className="__main_section">
        <Box className="__sub">
          <Link
            to="dashboard"
            className="__sidenav_link"
            onClick={() => selectionChange("dashboard")}
          >
            <Typography
              variant="h5"
              className={`__sub_element ${
                selected === "dashboard" ? "__selected" : ""
              }`}
            >
              <GridViewIcon />
              Dashboard
            </Typography>
          </Link>
          <Link
            to="leavemanagement"
            className="__sidenav_link"
            onClick={() => selectionChange("leavemanagement")}
          >
            <Typography
              variant="h5"
              className={`__sub_element ${
                selected === "leavemanagement" ? "__selected" : ""
              }`}
            >
              <CalendarMonthIcon />
              Attendance
            </Typography>
          </Link>
          <Link
            to="taxdeclaration"
            className="__sidenav_link"
            onClick={() => selectionChange("taxdeclaration")}
          >
            <Typography
              variant="h5"
              className={`__sub_element ${
                selected === "taxdeclaration" ? "__selected" : ""
              }`}
            >
              <CurrencyRupeeIcon />
              Tax Declaration
            </Typography>
          </Link>
        </Box>
        <Box className="__child_element">{children}</Box>
      </Box>
    </Box>
  );
};

export default SideNavBar;
