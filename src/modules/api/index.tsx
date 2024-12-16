import axios from "axios";
import {
  APPROVER,
  ATTENDANCE,
  COMPOFF,
  LEAVE,
  SHIFT_DETAILS,
} from "../utils/constants";

const baseUri = "http://localhost:8800/empdetails/employee";

//localhost:7700/empdetails/attendance/200/2024-10

const axiosClient = axios.create({
  baseURL: baseUri,
});

export const getShiftDetails = async () => {
  try {
    const response = await axiosClient.get(SHIFT_DETAILS);
    return response.data;
  } catch (error) {
    console.error("Error fetching shift details:", error);
  }
};

export const getAttendance = async (startDate: string, endDate: string) => {
  try {
    const response = await axiosClient.get(
      `${ATTENDANCE}?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          empId: "200",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching shift details:", error);
  }
};

export const postAttendance = async (attendanceData: any) => {
  try {
    const response = await axiosClient.post(`${ATTENDANCE}`, attendanceData, {
      headers: {
        empId: "200",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shift details:", error);
  }
};

export const getCompoffDetail = async () => {
  try {
    const response = await axiosClient.get(`${COMPOFF}`, {
      headers: {
        empId: "200",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shift details:", error);
  }
};

export const getLeaveCompoffCount = async () => {
  try {
    const response = await axiosClient.get(`${LEAVE}`, {
      headers: {
        empId: "200",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shift details:", error);
  }
};

export const getApprovalList = async (id: any) => {
  try {
    const response = await axiosClient.get(`${ATTENDANCE}/${APPROVER}/${id}`, {
      headers: {
        empId: "100",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shift details:", error);
  }
};

export const postSingleApprove = async (id: any, data: any) => {
  try {
    const response = await axiosClient.patch(`${ATTENDANCE}/${id}`, data, {
      headers: {
        empId: "100",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shift details:", error);
  }
};

export const postAllApprove = async (data: any) => {
  try {
    const response = await axiosClient.patch(`${ATTENDANCE}`, data, {
      headers: {
        empId: "100",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shift details:", error);
  }
};
