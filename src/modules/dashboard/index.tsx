import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import "./dashboard.css";

const rows = [
  {
    appliedDate: "12/05/2022",
    leaveDate: "11/06/2022",
    typeOfLeave: "Comp Off",
    type: "Encashment",
    status: "Pending",
  },
  {
    appliedDate: "10/04/2022",
    leaveDate: "22/05/2022",
    typeOfLeave: "Paid Leave",
    type: "Leave",
    status: "Approved",
  },
  {
    appliedDate: "10/04/2022",
    leaveDate: "22/05/2022",
    typeOfLeave: "Paid Leave",
    type: "Leave",
    status: "Approved",
  },
  {
    appliedDate: "10/04/2022",
    leaveDate: "22/05/2022",
    typeOfLeave: "Paid Leave",
    type: "Leave",
    status: "Approved",
  },
  {
    appliedDate: "10/04/2022",
    leaveDate: "22/05/2022",
    typeOfLeave: "Paid Leave",
    type: "Leave",
    status: "Approved",
  },
];

const Dashboard = () => {
  return (
    <Box>
      <Box className="__dashboard_main">
        <h1>Dashboard</h1>
        <Box className="__peron_head">
          <h5>Person One</h5>
          <p>Developer</p>
        </Box>
      </Box>
      <Box className="__details_container_main">
        <Box className="__details_item_one">
          <Typography variant="h5">Personal Details</Typography>
          <Typography variant="body1">
            Name : <span className="__details">Person One</span>
          </Typography>
          <Typography variant="body1">
            Date Of Joining : <span className="__details">02/10/2021</span>
          </Typography>
          <Typography variant="body1">
            Base Location : <span className="__details">Uthangarai</span>
          </Typography>
          <Typography variant="body1">
            Client Base Location : <span className="__details">Banglore</span>
          </Typography>
        </Box>
        <Box className="__details_item_two">
          <Typography variant="h5">Leave Details - 2024</Typography>
          <Typography variant="body1">
            Paid Leaves Remaining : <span className="__details">05</span>
          </Typography>
          <Typography variant="body1">
            Comp Off Leaves Remaining : <span className="__details">01</span>
          </Typography>
          <Typography variant="body1">
            Paid Leaves Taken : <span className="__details">02</span>
          </Typography>
          <Typography variant="body1">
            Comp Off Leaves Taken : <span className="__details">01</span>
          </Typography>
        </Box>
      </Box>
      <Box className="__details_container_table">
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Applied Date</TableCell>
                <TableCell>Leave Date</TableCell>
                <TableCell>Type of Leave</TableCell>
                <TableCell>Leave / Encashment</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, id) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.appliedDate}
                  </TableCell>
                  <TableCell>{row.leaveDate}</TableCell>
                  <TableCell>{row.typeOfLeave}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
