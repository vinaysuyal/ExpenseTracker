import dayjs from "dayjs";
import React from "react";
import { useState } from "react";

export const FromToContext = React.createContext({
  fromDate: new Date(),
  toDate: new Date(),
  changeFromDate: () => {},
  changeToDate: () => {},
});

const FromToContextProvider = (props) => {
  const [fromDate, setFromDate] = useState(dayjs(new Date()));
  const [toDate, setToDate] = useState(dayjs(new Date()));
  const changeFromDate = (newFromDate) => {
    setFromDate(dayjs(newFromDate));
  };
  const changeToDate = (newToDate) => {
    setToDate(dayjs(newToDate));
  };
  return (
    <FromToContext.Provider
      value={{
        fromDate,
        toDate,
        changeFromDate,
        changeToDate,
      }}
    >
      {props.children}
    </FromToContext.Provider>
  );
};

export default FromToContextProvider;
