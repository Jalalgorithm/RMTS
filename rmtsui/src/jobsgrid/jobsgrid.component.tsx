import "./jobs-grid.scss";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { IJob } from "../types/global.typing";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import httpModule from "../helpers/http.module";
import { useEffect, useState } from "react";
import { useAuth } from "../components/authprovider/authprovider.component";

interface IJobsGridProps {
  data: IJob[];
}

const JobsGrid = ({ data }: IJobsGridProps) => {
  const { user } = useAuth();
  const [rows, setRows] = useState<IJob[]>([]);

  useEffect(() => {
    httpModule
      .get<IJob[]>("/Job/Get")
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const redirect = useNavigate();

  const handleEditClick = (id: number) => {
    redirect("/job/Update/" + id);
  };

  const handleDeleteClick = (id: number) => {
    if (id < 0) {
      alert("pass a valid field");
    }

    httpModule
      .delete<IJob>("/Job/" + id)
      .then(() => {
        httpModule
          .get<IJob[]>("/Job/Get")
          .then((response) => {
            setRows(response.data);
          })
          .catch((error) => {
            alert("Error");
            console.log(error);
          });
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });

    redirect("/jobs");
  };

  const column: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "jobDescription", headerName: "Description", width: 400 },
    { field: "companyName", headerName: "Company Name", width: 150 },
    {
      field: "createdAt",
      headerName: "Creation Time",
      width: 200,

      renderCell: (params) => moment(params.row.createdAt).fromNow(),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 120,

      renderCell: (params) => (
        <Button onClick={() => handleEditClick(params.row.id)}>
          <EditIcon />
        </Button>
      ),
    },

    {
      field: "delete",
      headerName: "Delete",
      width: 120,

      renderCell: (params) => (
        <Button onClick={() => handleDeleteClick(params.row.id)}>
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  const filterColumn =
    user?.role === "Client"
      ? column.filter(
          (item) =>
            item.field === "id" ||
            item.field === "title" ||
            item.field === "jobDescription" ||
            item.field === "companyName"
        )
      : column;

  return (
    <Box sx={{ width: "100%", height: 450 }} className="jobs-grid">
      <DataGrid
        rows={rows}
        columns={filterColumn}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default JobsGrid;
