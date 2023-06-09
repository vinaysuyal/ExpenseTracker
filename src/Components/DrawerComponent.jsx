import { Add, DvrOutlined, Insights } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { FromToContext } from "../Context/fromToContext";
import expenseLayout from "../Layouts/sampleExpenseList.json";
import AddEditCard from "./AddEditCard";
import ExpenseListComponent from "./ExpenseListComponent";
import TimeRange from "./TimeRange";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  position: "relative",
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": { ...openedMixin(theme), position: "relative" },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": { ...closedMixin(theme), position: "relative" },
  }),
}));

const expenseListPreCursor = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : expenseLayout;

export default function MiniDrawer() {
  const [expenseList, editExpenseList] = React.useState(expenseListPreCursor);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [addEditCardVisible, setAddEditCardVisible] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fromToContext = React.useContext(FromToContext);
  const fromDate = fromToContext.fromDate;
  const toDate = fromToContext.toDate;
  const rows = expenseList.rows;
  const filteredRows = React.useMemo(() => {
    const a = rows.filter((row) => {
      return (
        new Date(new Date(row.date).setHours(12, 0, 0, 0)) >=
          new Date(new Date(fromDate.$d).setHours(12, 0, 0, 0)) &&
        new Date(new Date(row.date).setHours(12, 0, 0, 0)) <=
          new Date(new Date(toDate.$d).setHours(12, 0, 0, 0))
      );
    });
    return a;
  }, [fromDate, toDate, expenseList]);
  return (
    // < sx={{ display: "flex", maxWidth: "100%" }}>"
    <div
      style={{
        position: "relative",
        display: "flex",
      }}
    >
      <Drawer sx={{ maxWidth: "100%" }} variant="permanent" open={open}>
        {!open && (
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        )}
        {open && (
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
        )}
        <Divider />
        <List>
          {[
            { text: "Expense List", icon: <DvrOutlined /> },
            { text: "Charts", icon: <Insights /> },
            // "Starred",
            // "Send email",
            // "Drafts",
          ].map(({ text, icon }, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>

      {filteredRows.length > 0 && (
        <ExpenseListComponent filteredRows={filteredRows} />
      )}

      <div
        style={
          filteredRows.length > 0
            ? {
                marginTop: 2,
                position: "absolute",
                top: "0",
                right: "0",
              }
            : {
                marginTop: 2,
                position: "absolute",
                top: "40vh",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }
        }
      >
        {filteredRows.length === 0 && (
          <h3>
            No expenses tracked yet. Click on the new button to get started.
          </h3>
        )}
        <IconButton
          sx={{ borderRadius: 0 }}
          color="primary"
          aria-label="add new Item"
          component="label"
          onClick={() => setAddEditCardVisible(true)}
        >
          <Add fontSize="large" />
          Add new
        </IconButton>
        <TimeRange />
      </div>
      <AddEditCard
        expenseList={expenseList}
        editExpenseList={(newList) => editExpenseList(newList)}
        open={addEditCardVisible}
        setOpen={(value) => {
          setAddEditCardVisible(value);
        }}
      />
    </div>
  );
}
