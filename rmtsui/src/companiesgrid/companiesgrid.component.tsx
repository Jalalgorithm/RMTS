import "./companies-grid.scss";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { ICompany } from "../types/global.typing";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import httpModule from "../helpers/http.module";
import { useEffect, useState } from "react";
import { useToken } from "../components/tokenprovider/tokenprovider.component";

interface ICompaniesGridProps {
  data: ICompany[];
}

const CompaniesGrid = ({ data }: ICompaniesGridProps) => {
  const [rows, setRows] = useState<ICompany[]>([]);
  const { token } = useToken();

  useEffect(() => {
    httpModule
      .get<ICompany[]>("/Company/Get", {
        headers: {
          Authorization: "bearer " + token,
        },
      })
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
    redirect("/companies/Update/" + id);
  };

  const handleDeleteClick = (id: number) => {
    if (id < 0) {
      alert("pass a valid field");
    }

    httpModule
      .delete<ICompany>("/Company/" + id)
      .then(() => {
        httpModule
          .get<ICompany[]>("/Company/Get")
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

    redirect("/companies");
  };

  const column: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "description", headerName: "Description", width: 400 },
    { field: "size", headerName: "Size", width: 150 },
    {
      field: "createdAt",
      headerName: "Creation Time",
      width: 200,

      renderCell: (params) => moment(params.row.createdAt).format("YYYY-MM-DD"),
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

  return (
    <Box sx={{ width: "100%", height: 450 }} className="companies-grid">
      <DataGrid
        rows={rows}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default CompaniesGrid;
