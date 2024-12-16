import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./Calender.css";
import dayjs from "dayjs";

let count = 0;
const Calender = ({
  setMonth,
  setCount,
  setCalenderNumbers,
  setMonthYear,
  setSelectedNumber,
  selectedNumber,
  month,
  monthYear,
  calendarNumbers,
  presentDate,
}: any) => {
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const monthOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const daysInMonth = (year: number, month: number) =>
    new Date(year, month, 0).getDate();

  const startDayInMonth = (year: number, month: number, day: number) =>
    new Date(year, month, day).getDay();

  const dayNumbers = (days: number) =>
    Array.from({ length: days }, (_, index) => index + 1);

  const year = (count: number) =>
    new Date(date.getFullYear(), date.getMonth() + count).getFullYear();

  useEffect(() => {
    let getStartDay = startDayInMonth(date.getFullYear(), date.getMonth(), 1);

    let totalDays = daysInMonth(date.getFullYear(), date.getMonth() + 1);

    const numbers = dayNumbers(totalDays);

    const calendar = [...Array(getStartDay).fill(""), ...numbers];
    setMonth(monthOfYear[date.getMonth()]);
    setCalenderNumbers(calendar);
    setMonthYear(year(count));
    setSelectedNumber(date.getDate());
  }, []);

  const handleClick = (number: any) => {
    if (typeof number !== "string") setSelectedNumber(number);
  };

  const handleMonthChange = (number: number) => {
    count += number;
    setCount(count);

    let getStartDay = startDayInMonth(
      date.getFullYear(),
      date.getMonth() + count,
      1
    );

    let totalDays = daysInMonth(
      date.getFullYear(),
      date.getMonth() + 1 + count
    );

    const numbers = dayNumbers(totalDays);

    setMonth(monthOfYear[(date.getMonth() + count) % 12]);

    const calendar = [...Array(getStartDay).fill(""), ...numbers];
    setCalenderNumbers(calendar);
    setMonthYear(year(count));
  };

  const getDateDetail = (number: any) => {
    return presentDate?.find((item: any) => dayjs(item?.date).date() == number);
  };

  const getAttendanceMark = (number: any) => {
    let date = getDateDetail(number);

    if (date?.attendance == "P" && date?.status == "PENDING") {
      return "3px solid #88e788";
    } else if (date?.attendance == "L" && date?.status == "PENDING") {
      return "3px solid #ff7081";
    } else if (date?.attendance == "CO" && date?.status == "PENDING") {
      return "3px solid #ed80e9";
    }

    return "";
  };

  const getPendingMark = (number: any) => {
    let date = getDateDetail(number);

    if (date?.attendance == "P" && date?.status == "APPROVED") {
      return "#88e788";
    } else if (date?.attendance == "L" && date?.status == "APPROVED") {
      return "#ff7081";
    } else if (date?.attendance == "CO" && date?.status == "APPROVED") {
      return "#ed80e9";
    }

    return "";
  };

  return (
    <Box>
      {!!monthYear && (
        <Box className="____calender_head">
          <Box
            className="__bold"
            sx={{ cursor: "pointer" }}
            onClick={() => handleMonthChange(-1)}
          >
            <KeyboardArrowLeftIcon />
          </Box>

          <Typography>
            {month} - {monthYear}
          </Typography>

          <Box
            className="__bold"
            sx={{ cursor: "pointer" }}
            onClick={() => handleMonthChange(1)}
          >
            <KeyboardArrowRightIcon />
          </Box>
        </Box>
      )}
      <Box className="__calender_main __bold">
        {daysOfWeek.map((day) => (
          <Box key={day}>{day}</Box>
        ))}
      </Box>
      <Box className="__calender_main">
        {calendarNumbers.map((number: any, index: number) => (
          <Box
            key={index}
            onClick={() => handleClick(number)}
            sx={{
              cursor: number ? "pointer" : "default",
              backgroundColor:
                number === selectedNumber ? "lightblue" : "inherit",
              borderBottom: getAttendanceMark(number),
              background: getPendingMark(number),
              padding: "10px",
              // borderRadius: "50%",
              display: "inline-block",
              textAlign: "center",
              height: "30px",
              margin: "5px",
              color: index % 7 == 6 || index % 7 == 0 ? "red" : "black",
            }}
          >
            {number}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Calender;
