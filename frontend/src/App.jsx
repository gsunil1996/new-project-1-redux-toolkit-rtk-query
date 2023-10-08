import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import EmployeesTable from "./components/employeeTable/EmployeesTable";
import UsersList from "./components/usersList/UsersList";
import Counter from "./components/counter/Counter";
import Pets from "./components/pets/Pets";
import TodoApi from "./components/todoApi/TodoApi";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<EmployeesTable />} />
        <Route path="/counter-todo" element={<Counter />} />
        <Route path="/todo-api" element={<TodoApi />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/pets" element={<Pets />} />
        <Route
          path="*"
          element={
            <div>
              <h1>Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default App