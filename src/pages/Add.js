import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        // width: "50ch",
      },
    },
    button: {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    radio: {
      marginLeft: 10,
    },
  })
);

export default function Add() {
  const classes = useStyles();
  const history = useHistory();
  //states
  const [title, setTitle] = useState("");
  const [chairperson, setChairperson] = useState("");
  const [contractor, setContractor] = useState("");
  const [description, setDescription] = useState("");
  const [contribution, setContribution] = useState("");
  const [status, setStatus] = useState("Ongoing");
  const [eb, setEb] = useState("");
  const [gb, setGb] = useState("");
  const [sd, setSd] = useState("");
  const [ed, setEd] = useState("");

  // error
  const [titleError, setTitleError] = useState(false);
  const [chairpersonError, setChairpersonError] = useState(false);
  const [contractorError, setContractorError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [contributionError, setContributionError] = useState(false);
  const [ebError, setEbError] = useState(false);
  const [gbError, setGbError] = useState(false);
  const [sdError, setSdError] = useState(false);
  const [edError, setEdError] = useState(false);

  //on Submit

  const handleSubmit = (e) => {
    e.preventDefault();

    //error state
    setTitleError(false);
    setChairpersonError(false);
    setContractorError(false);
    setDescriptionError(false);
    setContributionError(false);
    setEbError(false);
    setGbError(false);
    setSdError(false);
    setEdError(false);
    if (title === "") {
      setTitleError(true);
    }
    if (chairperson === "") {
      setChairpersonError(true);
    }
    if (contractor === "") {
      setContractorError(true);
    }
    if (description === "") {
      setDescriptionError(true);
    }
    if (contribution === "") {
      setContributionError(true);
    }

    if (eb === "" || isNaN(eb)) {
      setEbError(true);
    }
    if (gb === "" || isNaN(gb)) {
      setGbError(true);
    }
    if (sd === "") {
      setSdError(true);
    }
    if (ed === "") {
      setEdError(true);
    }

    //state update
    if (
      title &&
      chairperson &&
      contractor &&
      description &&
      contribution &&
      status &&
      !isNaN(eb) &&
      !isNaN(gb) &&
      sd &&
      ed
    ) {
      console.log(
        title,
        chairperson,
        contractor,
        description,
        contribution,
        status,
        eb,
        gb,
        sd,
        ed
      );
      fetch("http://localhost:8000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          chairperson,
          contractor,
          description,
          contribution,
          status,
          eb,
          gb,
          sd,
          ed,
        }),
      }).then((res) => {
        if (res.ok) history.push("/project");
      });
    }
  };

  return (
    <div style={{ marginLeft: -15 }}>
      <form
        noValidate
        autoComplete="off"
        className={classes.root}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <TextField
              label="Project Title"
              variant="outlined"
              fullWidth
              error={titleError}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Chairperson"
              variant="outlined"
              fullWidth
              error={chairpersonError}
              onChange={(e) => setChairperson(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Contractor"
              variant="outlined"
              fullWidth
              error={contractorError}
              onChange={(e) => setContractor(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              error={descriptionError}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Local Contribution"
              variant="outlined"
              fullWidth
              error={contributionError}
              onChange={(e) => setContribution(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Estimated budget"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rs.</InputAdornment>
                ),
              }}
              error={ebError}
              onChange={(e) => setEb(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Government budget"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rs.</InputAdornment>
                ),
              }}
              error={gbError}
              onChange={(e) => setGb(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Starting Date"
              variant="outlined"
              type="date"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              error={sdError}
              onChange={(e) => setSd(e.target.value)}
            />
            <TextField
              label="End date"
              variant="outlined"
              type="date"
              InputProps={{
                inputProps: { min: sd },
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              error={edError}
              onChange={(e) => setEd(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item xs={6} className={classes.radio}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Status</FormLabel>
            <RadioGroup
              aria-label="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              row
            >
              <FormControlLabel
                value="Ongoing"
                control={<Radio />}
                label="Ongoing"
              />
              <FormControlLabel
                value="Completed"
                control={<Radio />}
                label="Completed"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.button}
            size="large"
          >
            Submit
          </Button>
        </Grid>
      </form>
    </div>
  );
}
