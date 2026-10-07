import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SaveIcon from "@mui/icons-material/Save";
import "./App.css";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import type { GridColDef } from "@mui/x-data-grid";

interface Todo {
  id: number;
  description: string;
  date: string;
}

function App() {
  const [todo, setTodo] = useState({ description: "", date: "" });
  const [todos, setTodos] = useState<Todo[]>([]);

    const columns: GridColDef[] = [
    { field: "description", headerName: "Description", width: 200 },
    { field: "date", headerName: "Date", width: 250 },
    
    ];

  const inputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const addTodo = () => {
    const newTodo: Todo = { ...todo, id: new Date().getTime() };
    setTodos([...todos, newTodo]);
    setTodo({ description: "", date: "" });
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Todolist</Typography>
        </Toolbar>
      </AppBar>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
      >
        <TextField
          variant="standard"
          label="Description"
          name="description"
          value={todo.description}
          onChange={inputChanged}
        />
        <TextField
          variant="standard"
          label="Date"
          name="date"
          value={todo.date}
          onChange={inputChanged}
        />
        <Button variant="outlined" onClick={addTodo} startIcon={<SaveIcon />}>
          Add
        </Button>
      </Stack>
      <div style={{ height: 500, width: 500, margin: "20px auto" }}>
        <DataGrid
          rows={todos}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: { paginationModel: { pageSize: 100 } },
          }}
          pageSizeOptions={[25, 50, 100]}
        />
        
      </div>
    </>
  );
}

export default App;