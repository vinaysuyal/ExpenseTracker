import { Box, Button, Modal } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React, { useContext, useEffect } from "react";
import { FromToContext } from "../Context/fromToContext";
function FromToComponent({ timeRangeType }) {
  const fromToContext = useContext(FromToContext);
  const fromDate = fromToContext.fromDate;
  const toDate = fromToContext.toDate;
  const [open, setOpen] = React.useState(true);
  useEffect(() => {
    if (
      new Date(fromDate.$d).setHours(12, 0, 0, 0) >
      new Date(toDate.$d).setHours(12, 0, 0, 0)
    ) {
      alert("Start Date should be less than or equal to End Date");
    }
  }, [fromDate, toDate]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "fit-content",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Show Date Picker
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
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
        </Box>
      </Modal>
    </>
  );
}
export default FromToComponent;
