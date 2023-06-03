import { DataGrid } from "@mui/x-data-grid";
import expenseList from "../Layouts/sampleExpenseList.json";
import ExpenseChartComponent from "./ExpenseChartComponent";
const ExpenseListComponent = ({ filteredRows }) => {
  return (
    <>
      <ExpenseChartComponent filteredRows={filteredRows} />
      <div style={{ maxHeight: "40vh" }}>
        <DataGrid
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
    </>
  );
};

export default ExpenseListComponent;
