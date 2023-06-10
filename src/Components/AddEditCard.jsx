import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddEditCard({
  open,
  setOpen,
  editExpenseList,
  expenseList,
}) {
  const [cardState, setCardState] = React.useState({
    category: "",
    name: "",
    description: "",
    amount: 0,
    date: null,
  });
  const [showError, setShowError] = React.useState(false);
  const handleClose = () => setOpen(false);

  const handleChange = (event, field) => {
    setCardState((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };
  const categories = [
    "Food",
    "Utilities",
    "Miscellaneous",
    "Transport",
    "Entertainment",
    "Fitness",
  ];
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth sx={{ marginBottom: "16px" }}>
            <InputLabel>Category</InputLabel>
            <Select
              error={!cardState.category && showError}
              labelId="demo-simple-select-label"
              value={cardState.category}
              label="Category"
              onChange={(event) => {
                handleChange(event, "category");
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Name"
            error={!cardState.name && showError}
            fullWidth
            value={cardState.name}
            onChange={(event) => {
              handleChange(event, "name");
            }}
            sx={{ marginBottom: "16px" }}
          />

          <TextField
            error={!cardState.amount && showError}
            label="Amount"
            type="number"
            fullWidth
            value={cardState.amount}
            onChange={(event) => {
              event.target.value = parseInt(event.target.value);
              handleChange(event, "amount");
            }}
            sx={{ marginBottom: "16px" }}
          />

          <TextField
            error={!cardState.description && showError}
            label="Description"
            fullWidth
            value={cardState.description}
            onChange={(event) => {
              handleChange(event, "description");
            }}
            sx={{ marginBottom: "16px" }}
          />

          {/* <TextField
            error={showError}
            label="Date"
            type="date"
            fullWidth
            value={cardState.date}
            onChange={(event) => {
              handleChange(event, "date");
            }}
            sx={{ marginBottom: "16px" }}
            InputLabelProps={{
              shrink: true,
            }}
          /> */}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={cardState.date}
                onChange={(date) => {
                  handleChange({ target: { value: dayjs(date) } }, "date");
                }}
                label="Date"
                maxDate={cardState.date}
                format="DD-MMM-YYYY"
                disableFuture
              />
            </DemoContainer>
          </LocalizationProvider>
          {showError && (
            <div style={{ color: "red" }}>
              One or more field(s) are missing.
            </div>
          )}
          <Button
            sx={{ marginTop: "20px" }}
            onClick={(e) => {
              e.preventDefault();
              if (
                !!cardState.amount &&
                !!cardState.category &&
                !!cardState.date &&
                !!cardState.description &&
                !!cardState.name
              ) {
                const newExpenseList = {
                  columns: expenseList.columns,
                  rows: [...expenseList.rows, cardState],
                };
                editExpenseList(newExpenseList);
                localStorage.setItem(
                  "expenses",
                  JSON.stringify(newExpenseList)
                );
                setOpen(false);
                setCardState({
                  category: "",
                  name: "",
                  description: "",
                  amount: 0,
                  date: null,
                });
              } else {
                setShowError(true);
              }
            }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
