import { Box } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

const LeaveContext = createContext<any>(null);
export const ContextState = ({ children }: any) => {
  const [user, setUser] = useState({
    user: "Person One",
    role: "user",
    designation: "Developer",
    userId: "PE00516",
  }) as any;
  const login = (userData: any) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };
  return (
    <LeaveContext.Provider value={{ user, login, logout }}>
      {children}
    </LeaveContext.Provider>
  );
};

export const useContextState = () => useContext(LeaveContext);
