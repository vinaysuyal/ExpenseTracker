import { Card, MenuItem, Select } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FromToContext } from "../Context/fromToContext";
import FromToComponent from "./FromToComponent";
import "./TimeRange.css";

function TimeRange(props) {
  const fromToContext = useContext(FromToContext);
  const fromDate = fromToContext.fromDate;
  const toDate = fromToContext.toDate;
  const [timeRangeType, setTimeRangeType] = useState("month");
  const handleChange = (event) => {
    setTimeRangeType(event.target.value);
  };
  useEffect(() => {
    const date = new Date();
    if (timeRangeType === "month") {
      fromToContext.changeFromDate(
        new Date(date.getFullYear(), date.getMonth(), 1)
      );
      fromToContext.changeToDate(new Date());
    }
    if (timeRangeType === "week") {
      fromToContext.changeFromDate(
        new Date().setDate(date.getDate() - date.getDay())
      );
      fromToContext.changeToDate(
        new Date().setDate(date.getDate() + (6 - date.getDay()))
      );
    }
  }, [timeRangeType]);

  return (
    <Card sx={{ padding: 2 }}>
      <div className="rangeSelector">
        <Select
          labelId="timeRangeSelect"
          id="timeRangeSelect"
          value={timeRangeType}
          onChange={handleChange}
        >
          <MenuItem value={"month"}>This Month</MenuItem>
          <MenuItem value={"week"}>This Week</MenuItem>
          <MenuItem value={"custom"}>Select Custom Range</MenuItem>
        </Select>
        {timeRangeType === "custom" && <FromToComponent />}
      </div>
    </Card>
  );
}
export default TimeRange;
