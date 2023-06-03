import { useContext, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { FromToContext } from "../Context/fromToContext";
function FromToComponent() {
  const fromToContext = useContext(FromToContext);
  const fromDate = fromToContext.fromDate;
  const toDate = fromToContext.toDate;
  useEffect(() => {
    if (new Date(fromDate.$d) > new Date(toDate.$d)) {
      alert("Start Date should be less than or equal to End Date");
    }
  }, [fromDate, toDate]);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            value={fromDate}
            onChange={(e) => fromToContext.changeFromDate(e)}
            label="From"
            maxDate={toDate}
            format="DD-MMM-YYYY"
            disableFuture
          />
          <DatePicker
            value={toDate}
            onChange={(e) => fromToContext.changeToDate(e)}
            label="To"
            minDate={fromDate}
            format="DD-MMM-YYYY"
            disableFuture
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
export default FromToComponent;
