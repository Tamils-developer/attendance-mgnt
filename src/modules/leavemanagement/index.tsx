import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  NativeSelect,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import "./leaveManagement.css";
import styled from "styled-components";
import { BootstrapButton } from "../utils";
import Calender from "../calender";
import Approval from "../approval";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useContextState } from "../context";
import { v4 as uuidV4 } from "uuid";
import {
  getApprovalList,
  getAttendance,
  getCompoffDetail,
  getLeaveCompoffCount,
  getShiftDetails,
  postAttendance,
} from "../api";

const LeaveManagement = () => {
  const [selectedNumber, setSelectedNumber] = useState() as any;
  const [calendarNumbers, setCalenderNumbers] = useState([]) as any;
  const [month, setMonth] = useState("");
  const [monthNumber, setMonthNumber] = useState(0);
  const [monthYear, setMonthYear] = useState(0);
  const [attendance, setAttendance] = useState([]) as any;
  const [attendanceStatus, setAttendanceStatus] = useState("P");
  const [approvalList, setApprovalList] = useState(false);
  const [shiftdetails, setShiftDetails] = useState([]);
  const [shift, setShift] = useState() as any;
  const [count, setCount] = useState(0);
  const [disableButtons, setDisableButtons] = useState(false);
  const [compOffDate, setCompOffDate] = useState([]) as any;
  const [approvalEmpList, setApprovalEmpList] = useState([]) as any;
  const [leaveCompoffCount, setLeaveCompoffCount] = useState({}) as any;

  const date = new Date();
  const { user } = useContextState();

  useEffect(() => {
    setMonthNumber(
      (date.getMonth() + 1 + count) % 12 == 0
        ? 12
        : (date.getMonth() + 1 + count) % 12
    );
  }, [count]);

  const handleAttendance = (e: any) => {
    let value = e.target.value;
    setAttendanceStatus(value);
    // if (value == "CO") {
    // getCompoffDate();
    // } else {
    // setCompOffDate([]);
    // }
  };

  // const handleAttendanceDetail = () => {
  //   let payload: any = {
  //     id: uuidV4(),
  //     userId: user.userId,
  //     date: `${selectedNumber}/${monthNumber}/${monthYear}`,
  //     attendance: attendance,
  //   };

  //   if (attendance == "compoff")
  //     payload = { ...payload, compOffDate: compOffDate };

  //   if (attendance == "present") payload = { ...payload, shift: shift };
  // };

  useEffect(() => {
    const getMonthDetail = async () => {
      if (monthYear && monthNumber) {
        let attendanceResponse = await getAttendance(
          `${monthYear}-${monthNumber}-1`,
          `${monthYear}-${monthNumber}-${calendarNumbers?.at(-1)}`
        );
        console.log(attendanceResponse, "attendanceResponse");
        if (attendanceResponse?.length) {
          setAttendance(attendanceResponse);
        } else {
          setAttendance([]);
        }
      }
    };
    getMonthDetail();
  }, [monthYear, monthNumber]);
  // const datas = prompt("paste the details here");
  // console.log(JSON.parse(datas ? datas : ""));
  useEffect(() => {
    const shiftDetails = async () => {
      let response = await getShiftDetails();
      setShiftDetails(response);
    };
    shiftDetails();
    getCompoffDate();
    getApprovalLists();
    getCount();
  }, []);

  const getCompoffDate = async () => {
    let response = await getCompoffDetail();
    // console.log(response[0].date.reverse().join().replace(/,/g, "-"));
    response?.filter((item: any) => {
      if (item) {
        setCompOffDate([
          ...compOffDate,
          item.date.reverse().join().replace(/,/g, "-"),
        ]);
      }
    });
  };

  const getCount = async () => {
    let response = await getLeaveCompoffCount();
    setLeaveCompoffCount(response);
  };

  const getApprovalLists = async () => {
    let response = await getApprovalList(100);
    setApprovalEmpList(response);
    console.log(response, "=approval list");
  };

  useEffect(() => {
    let val = attendance?.find(
      (item: any) => dayjs(item?.date).date() == selectedNumber
    );
    console.log(val, "=======vallllllll", selectedNumber);
    if (val) {
      setDisableButtons(val.status !== "REJECTED" ? true : false);
      setAttendanceStatus(val.attendance);
      setShift(parseInt(val.shiftId));
    } else {
      setDisableButtons(false);
      setAttendanceStatus("P");
      setShift(shiftdetails?.length ? "104" : "");
    }
  }, [selectedNumber, attendance]);

  const submitValue = async () => {
    let numberValue =
      selectedNumber < 10 ? `0${selectedNumber}` : `${selectedNumber}`;
    let payload = {
      empId: "200",
      date: `${monthYear}-${monthNumber}-${numberValue}`,
      shiftId: shift,
      attendance: attendanceStatus,
      status: "pending",
      approverId: "100",
    };

    let response = await postAttendance(payload);
    console.log(response, "====post response");
    if (response) setAttendance([...attendance, response]);
  };

  console.log(compOffDate);
  const [roosterData, setRoosterdata] = useState([]);
  const jsonref = useRef<HTMLInputElement>(null);
  function saveFn(event: any) {


    console.log(
      JSON.parse(jsonref?.current?.value ? jsonref?.current?.value : "")
    );
  }

  // function handleRooster(event: any): void {
  //   let data =JSON.parse(event.target.value);
  //    setRoosterdata(data);
   
  // }

  return (
    <Box>
      <Box className="__dashboard_main">
        <h1>Attendance</h1>
        <Box className="__peron_head">
          <h5>Person One</h5>
          <p>Developer</p>
        </Box>
      </Box>
      {/* <Box className="__button_container">
        <BootstrapButton variant="contained">Apply Leave</BootstrapButton>
      </Box>
      <Box className="__leave_container_main">
        <Box className="__leave_detail">
          <Box className="__leave_detail_section_one">
            <Typography>Total Paid Leaves : </Typography>
            <Typography>Remaining Paid Leaves : </Typography>
          </Box>
          <Box className="__leave_detail_section_two">
            <Typography>Total Comp-Off : </Typography>
            <Typography>Remaining Comp-Off : </Typography>
          </Box>
          <Box className="__leave_detail_section_three">
            <Typography>Paid Leaves Taken : </Typography>
            <Typography>Comp-Off Taken : </Typography>
          </Box>
          <Box className="__leave_detail_section_four">
            <Typography>Comp-Off CashOut : </Typography>
          </Box>
        </Box>
      </Box> */}
      <Box className="__calendar_main">
        <Box className="__calendar">
          <Calender
            setCount={setCount}
            setMonth={setMonth}
            setCalenderNumbers={setCalenderNumbers}
            setMonthYear={setMonthYear}
            setSelectedNumber={setSelectedNumber}
            selectedNumber={selectedNumber}
            month={month}
            monthYear={monthYear}
            calendarNumbers={calendarNumbers}
            presentDate={attendance}
          />
        </Box>
        <Box className="__calendar_leaves">
          <Typography>
            Leaves Remaining : {leaveCompoffCount?.leaveCount ?? 0} / 12
          </Typography>
          <Typography>
            Comp-Off Remaining : {leaveCompoffCount?.compOffCount ?? 0} / 6
          </Typography>
          <Typography className="__attendance_color_type">
            Present<span className="__green"></span>
          </Typography>
          <Typography className="__attendance_color_type">
            Leave<span className="__red"></span>
          </Typography>
          <Typography className="__attendance_color_type">
            Comp-Off<span className="__purple"></span>
          </Typography>
        </Box>
      </Box>
      {selectedNumber && (
        <Box>
          <Box sx={{ marginTop: "1em", fontWeight: 700 }}>
            Date - {selectedNumber}/{monthNumber}/{monthYear}
          </Box>
          <Box sx={{ display: "flex", marginTop: "1em", alignItems: "end" }}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Attendance
              </FormLabel>
              <RadioGroup
                row
                value={attendanceStatus}
                onChange={handleAttendance}
              >
                <FormControlLabel
                  value="P"
                  control={<Radio />}
                  label="Present"
                  disabled={disableButtons}
                />
                <FormControlLabel
                  value="L"
                  control={<Radio />}
                  label="Leave"
                  disabled={disableButtons}
                />
                {!!compOffDate?.length && (
                  <FormControlLabel
                    value="CO"
                    control={<Radio />}
                    label="Comp-Off"
                    disabled={disableButtons}
                  />
                )}
              </RadioGroup>
            </FormControl>
            {/* <Box>
              {attendanceStatus === "CO" && (
                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Select a date
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Select a date"
                    // onChange={handleChange}
                  >
                    {compOffDate?.map((date: any, index: number) => (
                      <MenuItem value={date} key={index}>
                        {date}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box> */}
          </Box>
          {attendanceStatus === "P" && (
            <Box sx={{ marginTop: "1em" }}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Shift</FormLabel>
                {/* <RadioGroup
                  row
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                >
                  <FormControlLabel
                    value="day"
                    control={<Radio />}
                    label="Day Shift"
                  />
                  <FormControlLabel
                    value="night"
                    control={<Radio />}
                    label="Night Shift"
                  />
                </RadioGroup> */}
                <Select
                  sx={{ width: "350px" }}
                  value={shift}
                  onChange={(e: any) => setShift(parseInt(e.target.value))}
                  disabled={disableButtons}
                >
                  {shiftdetails?.map((shift: any) => (
                    <MenuItem value={shift.id} key={shift.id}>
                      {shift.type} | {shift.timing}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </Box>
      )}
      <Box className="__button_container">
        <BootstrapButton
          variant="contained"
          onClick={submitValue}
          disabled={disableButtons}
        >
          Save
        </BootstrapButton>
        <BootstrapButton
          variant="contained"
          onClick={() => setApprovalList(!approvalList)}
          // disabled={disableButtons}
        >
          Approve
        </BootstrapButton>
      </Box>
      {approvalList && (
        <Approval
          approvalEmpList={approvalEmpList}
          getApprovalLists={getApprovalLists}
        />
      )}
      <input ref={jsonref} type="text" />
      <Button onClick={saveFn}>SUMBIT ROOSTER</Button>
    </Box>
  );
};

export default LeaveManagement;
