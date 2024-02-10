import "./candidates-grid.scss";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ICandidate } from "../types/global.typing";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import httpModule from "../helpers/http.module";
import { useEffect, useState } from "react";
import { PictureAsPdf } from "@mui/icons-material";
import { baseUrl } from "../constants/url.constant";

interface ICandidatesGridProps {
  data: ICandidate[];
}

const CandidatesGrid = ({ data }: ICandidatesGridProps) => {
  const [rows, setRows] = useState<ICandidate[]>([]);

  useEffect(() => {
    httpModule
      .get<ICandidate[]>("/Candidate/GetCandidate")
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
    redirect("/Candidate/Update/" + id);
  };

  const handleDeleteClick = (id: number) => {
    if (id < 0) {
      alert("pass a valid field");
    }

    httpModule
      .delete<ICandidate>("/Candidate/" + id)
      .then(() => {
        httpModule
          .get<ICandidate[]>("/Candidate/GetCandidate")
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

    redirect("/candidates");
  };

  const column: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "firstName", headerName: "First Name", width: 120 },
    { field: "lastName", headerName: "Last Name", width: 120 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "coverLetter", headerName: "CV", width: 150 },

    {
      field: "resumeUrl",
      headerName: "Download",
      width: 100,

      renderCell: (params) => (
        <a href={`${baseUrl}/Candidate/download/${params.row.url}`} download>
          <PictureAsPdf />
        </a>
      ),
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
    <Box sx={{ width: "100%", height: 450 }} className="candidates-grid">
      <DataGrid
        rows={rows}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default CandidatesGrid;
