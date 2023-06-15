import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import * as React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "80vw",
  transform: "translate(-50%, -50%)",
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

  const save = (cardState) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "jwt " + localStorage.getItem("authToken")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(cardState);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/transaction/add", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const newExpenseList = {
          columns: expenseList.columns,
          rows: [...expenseList.rows, result],
        };
        editExpenseList(newExpenseList);
      })
      .catch((error) => console.log("error", error));
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
                  handleChange(
                    {
                      target: {
                        value: new Date(dayjs(date))
                          .toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                          .split("/")
                          .join("-"),
                      },
                    },
                    "date"
                  );
                }}
                label="Date"
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
                save(cardState);
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
            Add Expense
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
