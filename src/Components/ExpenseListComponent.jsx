import { DataGrid } from "@mui/x-data-grid";
import expenseList from "../Layouts/sampleExpenseList.json";
import ExpenseChartComponent from "./ExpenseChartComponent";
const ExpenseListComponent = ({ filteredRows }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ExpenseChartComponent filteredRows={filteredRows} />
      <DataGrid
        sx={{ maxWidth: "80vw" }}
        rows={filteredRows}
        columns={expenseList.columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        getRowId={() => Math.random() * 10000}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default ExpenseListComponent;
