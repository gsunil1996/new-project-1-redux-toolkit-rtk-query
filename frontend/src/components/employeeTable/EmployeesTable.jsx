import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import moment from "moment";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import InputLabel from '@mui/material/InputLabel';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { useGetEmployeesTableQuery } from '../../redux/features/employeesSlice';

const columns = [
  {
    id: "firstName",
    label: "First Name",
    minwidth: 60,
    align: "left",
    background: "#755139FF"
  },
  {
    id: "lastName",
    label: "Last Name",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },

  {
    id: "email",
    label: "Email",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },
  {
    id: "gender",
    label: "Gender",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },
  {
    id: "status",
    label: "Status",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },
  {
    id: "location",
    label: "Location",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },
  {
    id: "date",
    label: "Date",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },

  {
    id: "actions",
    label: "Actions",
    minwidth: 60,
    align: "center",
    background: "#755139FF",
  },
];

const EmployeesTable = () => {

  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("new");
  const [currentPage, setCurrentPage] = useState(sessionStorage.getItem('employeePage') || 1);
  const [tableRowId, setTableRowId] = useState("");
  const [addEmployeeOpen, setAddEmployeeOpen] = React.useState(false);
  const [editEmployeeopen, setEditEmployeeOpen] = React.useState(false);
  const [deleteEmployeeOpen, setDeleteEmployeeOpen] = useState(false);

  const { data, isFetching, isError, error, isSuccess, refetch } = useGetEmployeesTableQuery({ search, gender, status, sort, page: currentPage })

  return (
    <div>
      <div> <h1>Employees Table</h1> </div>
      {isFetching ? (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
        </div>
      ) : isError ? (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <h4>{error.status}</h4>
        </div>
      ) : data?.employeesTableData.length == 0 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1>No Data Found</h1>
        </div>
      ) : isSuccess ? (
        <div style={{ width: "95%", margin: "auto" }}>

          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                width: "100%",
                overflowX: "auto",
                display: "inline-grid",
                marginTop: "10px",
              }}
            >
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            background: column.background,
                            color: "#fff",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.employeesTableData?.map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row._id}
                          style={{
                            background: "#F2EDD7FF"
                          }}
                        >
                          <TableCell align="left" >
                            {row.fname}
                          </TableCell>
                          <TableCell align="left">
                            {row.lname}
                          </TableCell>

                          <TableCell align="left">
                            {row.email}
                          </TableCell>

                          <TableCell align="left">
                            {row.mobile}
                          </TableCell>

                          <TableCell align="left">
                            {row.gender}
                          </TableCell>

                          <TableCell align="left">
                            {row.status}
                          </TableCell>
                          <TableCell align="left">
                            {row.location}
                          </TableCell>
                          <TableCell align="left">
                            {moment(row.datecreated).format(
                              "DD-MM-YYYY hh:mm a"
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <div style={{ display: "flex", justifyContent: "space-between" }} >
                              <Button variant="contained" color="success"
                              // onClick={(event) =>
                              //   handleViewClick(event, row._id)
                              // }
                              >
                                View
                              </Button>
                              <Button variant="contained" color="secondary"
                              // onClick={(event) =>
                              //   handleEditClick(event, row._id)
                              // }
                              >
                                Edit
                              </Button>
                              <Button variant="contained" color="error"
                              // onClick={(event) =>
                              //   handleDeleteClick(event, row._id)
                              // }
                              >Delete</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Pagination
                  count={data?.Pagination?.pageCount}
                  page={Number(currentPage)}
                  //  onChange={handlePageChange}
                  variant="outlined"
                  color="primary"
                />
              </div>
            </Grid>
          </Grid>
        </div>
      ) : ""}
    </div>
  )
}

export default EmployeesTable