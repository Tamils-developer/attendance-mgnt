import React, { useState } from "react";
import "./Approval.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BootstrapButton, BootstrapButtonRemove } from "../utils";
import { postAllApprove, postSingleApprove } from "../api";

const data = [
  {
    id: 1,

    // approvalStatus: "pending",

    employeeName: "Person One",

    submissonList: [
      {
        weekNumber: 52,
        dayList: [
          {
            id: 1,
            date: "10/10/2024",
            attendance: "present",
            approvalStatus: "pending",
          },

          {
            id: 2,
            date: "11/10/2024",
            attendance: "present",
            approvalStatus: "pending",
          },

          {
            id: 3,
            date: "12/10/2024",
            attendance: "present",
            approvalStatus: "pending",
          },
        ],
      },
      {
        weekNumber: 53,
        dayList: [
          {
            id: 1,
            date: "10/10/2024",
            attendance: "present",
            approvalStatus: "pending",
          },

          {
            id: 2,
            date: "11/10/2024",
            attendance: "present",
            approvalStatus: "pending",
          },

          {
            id: 3,
            date: "12/10/2024",
            attendance: "present",
            approvalStatus: "pending",
          },
        ],
      },
    ],
  },

  {
    id: 2,

    employeeName: "Person Two",
    submissonList: [
      {
        weekNumber: 52,
        dayList: [
          {
            id: 1,
            date: "10/10/2024",
            attendance: "present",
            approvalStatus: "pending",
          },

          {
            id: 2,
            date: "11/10/2024",
            attendance: "present",
            approvalStatus: "pending",
          },

          {
            id: 3,
            date: "12/10/2024",
            attendance: "present",
            approvalStatus: "pending",
          },
        ],
      },
    ],
  },

  {
    id: 3,

    employeeName: "Person Three",

    submissonList: [
      {
        weekNumber: 52,
        dayList: [
          {
            id: 1,
            date: "10/10/2024",
            attendance: "present",
            approvalStatus: "pending",
          },

          {
            id: 2,
            date: "11/10/2024",
            attendance: "present",
            approvalStatus: "pending",
          },

          {
            id: 3,
            date: "12/10/2024",
            attendance: "present",
            approvalStatus: "pending",
          },
        ],
      },
    ],
  },
];

const Approval = ({ approvalEmpList, getApprovalLists }: any) => {
  const [requestList, setRequestList] = useState(data) as any;
  const handleApproveAllReq = (userId: any, index: number) => {
    let dataArr = [...requestList];

    // let user = data.at(index)

    let user = dataArr.filter((d) => d.id === userId)[0];

    // user.submissonList.dayList.map((val) => (val.approvalStatus = "approved"));

    dataArr.splice(index, 1, user);

    console.log(dataArr);
  };

  const flatten = (nestedArray: any[]): any[] =>
    nestedArray.reduce((acc, val) => acc.concat(val), []);

  const handleApprove = async (
    userId: any,
    attendance: any,
    action: string
  ) => {
    const result = flatten(
      approvalEmpList?.map((employee: any) =>
        flatten(
          employee.weeklyAttendance?.map(
            (week: any) =>
              week.listOfAttendance?.filter(
                (att: any) => att.id === attendance && att.empId === userId
              ) || []
          ) || []
        )
      ) || []
    );

    let data = { ...result[0], date: result[0].date.reverse(), status: action };

    let response = await postSingleApprove(attendance, data);
    if (response) {
      getApprovalLists();
    }

    console.log(attendance, "===attendance", result, userId);
  };

  const handleWeekApprove = async (weekNumber: any, empId: any) => {
    let data = approvalEmpList.map((employee: any) =>
      employee.weeklyAttendance.map((week: any) => {
        if (week.weekNumber === weekNumber && employee.id === empId) {
          let data = week.listOfAttendance.map((attendance: any) => ({
            ...attendance,
            status: "APPROVED",
            date: attendance.date.reverse(),
          }));
          // console.log(data);
          return data;
        }
      })
    );

    let flattenedData = flatten(flatten(data));
    let finalData = flattenedData.filter((item: any) => item !== undefined);

    let response = await postAllApprove(finalData);
    if (response) {
      getApprovalLists();
    }
  };

  return (
    <>
      {approvalEmpList?.length ? (
        <Box className="__approval_list">
          <Typography variant="h5">Approval List</Typography>
          {approvalEmpList?.map((datas: any, index: number) => (
            <Accordion key={datas.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>{datas.id}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Attendance</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datas.submissonList.map((row, innerIndex) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {row.date}
                      </TableCell>
                      <TableCell align="center">{row.attendance}</TableCell>
                      <TableCell align="center">
                        <Box className="__button_container">
                          <BootstrapButton
                            onClick={() =>
                              handleApprove(datas.id, row.id, "approve")
                            }
                            variant="contained"
                          >
                            Approve
                          </BootstrapButton>
                          <BootstrapButtonRemove
                            variant="contained"
                            color="error"
                            onClick={() =>
                              handleApprove(datas.id, row.id, "reject")
                            }
                          >
                            Reject
                          </BootstrapButtonRemove>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer> */}
                {datas.weeklyAttendance?.map((weekAttendance: any) => (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      // sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <Typography>
                          Week - {weekAttendance.weekNumber}
                        </Typography>
                        <BootstrapButton
                          onClick={(event) => {
                            event.stopPropagation(); // Prevent accordion from opening
                            handleWeekApprove(
                              weekAttendance.weekNumber,
                              datas.id
                            );
                          }}
                          variant="contained"
                        >
                          Approve All
                        </BootstrapButton>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">Date</TableCell>
                              <TableCell align="center">Attendance</TableCell>
                              <TableCell align="center">Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {weekAttendance.listOfAttendance.map(
                              (attendance: any, innerIndex: any) => (
                                <TableRow
                                  key={attendance.id}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                  >
                                    {attendance.date
                                      .reverse()
                                      .join()
                                      .replace(/,/g, "-")}
                                  </TableCell>
                                  <TableCell align="center">
                                    {attendance.attendance}
                                  </TableCell>
                                  <TableCell align="center">
                                    <Box className="__button_container">
                                      <BootstrapButton
                                        onClick={() =>
                                          handleApprove(
                                            datas.id,
                                            attendance.id,
                                            "APPROVED"
                                          )
                                        }
                                        variant="contained"
                                      >
                                        Approve
                                      </BootstrapButton>
                                      <BootstrapButtonRemove
                                        variant="contained"
                                        color="error"
                                        onClick={() =>
                                          handleApprove(
                                            datas.id,
                                            attendance.id,
                                            "REJECTED"
                                          )
                                        }
                                      >
                                        Reject
                                      </BootstrapButtonRemove>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ) : (
        <>
          <Box>
            <Typography variant="h4" sx={{ marginBottom: "1em" }}>
              No data
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

export default Approval;
