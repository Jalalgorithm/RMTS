import { useEffect, useState } from "react";
import "./jobs.scss";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ICompany, ICreateJob } from "../types/global.typing";
import httpModule from "../helpers/http.module";

const levelsArray: string[] = [
  "Intern",
  "Junior",
  "Midlevel",
  "Senior",
  "TeamLead",
  "Cto",
  "Architect",
];

const AddJob = () => {
  const [job, setJob] = useState<ICreateJob>({
    title: "",
    level: "",
    jobDescription: "",
    companyId: "",
  });

  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    httpModule
      .get<ICompany[]>("/Company/Get")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const redirect = useNavigate();

  const handleClickSaveBtn = () => {
    if (
      job.title === "" ||
      job.level === "" ||
      job.jobDescription === "" ||
      job.companyId === ""
    ) {
      alert("Fill all fields");
      return;
    }
    httpModule
      .post("/Job/Create", job)
      .then((response) => redirect("/jobs"))
      .catch((error) => console.log(error));
  };
  const handleClickBackBtn = () => {
    redirect("/jobs");
  };

  return (
    <div className="content">
      <div className="add-job">
        <h2> Add New job</h2>

        <TextField
          autoComplete="off"
          label="Job Title"
          variant="outlined"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />

        <FormControl fullWidth>
          <InputLabel> Job Level</InputLabel>
          <Select
            value={job.level}
            label="Job Level"
            onChange={(e) => setJob({ ...job, level: e.target.value })}
          >
            {levelsArray.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          autoComplete="off"
          label="Job Description"
          variant="outlined"
          value={job.jobDescription}
          onChange={(e) => setJob({ ...job, jobDescription: e.target.value })}
        />

        <FormControl fullWidth>
          <InputLabel> Company </InputLabel>
          <Select
            value={job.companyId}
            label="Company"
            onChange={(e) => setJob({ ...job, companyId: e.target.value })}
          >
            {companies.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickBackBtn}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
