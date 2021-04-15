import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import { CircularProgress } from "@material-ui/core";
import Container from "@material-ui/core/Container"


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
    })
);

export default function EditProject() {

    const { projectId } = useParams();

    const classes = useStyles();
    const history = useHistory();
    //states
    const [title, setTitle] = useState("");
    const [chairperson, setChairperson] = useState("");
    const [contractor, setContractor] = useState("");
    const [description, setDescription] = useState("");
    const [contribution, setContribution] = useState("");
    const [status, setStatus] = useState("");
    const [eb, setEb] = useState("");
    const [gb, setGb] = useState("");
    const [sd, setSd] = useState("");
    const [ed, setEd] = useState("");
    const [loading, setLoading] = useState(true)

    // error
    const [titleError, setTitleError] = useState(false);
    const [chairpersonError, setChairpersonError] = useState(false);
    const [contractorError, setContractorError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [contributionError, setContributionError] = useState(false);
    const [statusError, setStatusError] = useState(false);
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
        setStatusError(false);
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
        if (status === "") {
            setStatusError(true);
        }
        if (eb === "") {
            setEbError(true);
        }
        if (gb === "") {
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
            eb &&
            gb &&
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
            fetch(`http://localhost:8000/projects/${projectId}`, {
                method: "PUT",
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


    const fetchProject = async () => {
        try {
            setLoading(true)
            const response = await fetch(`http://localhost:8000/projects/${projectId}`);
            if (response.ok) {
                const data = await response.json()
                console.log(data.title)
                setTitle(data.title)
                setChairperson(data.chairperson)
                setContractor(data.contractor)
                setContribution(data.contribution)
                setDescription(data.description)
                setStatus(data.status)
                setEb(data.eb)
                setGb(data.gb)
                setSd(data.sd)
                setEd(data.ed)
            }
        }
        catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {

        fetchProject();

    }, [])

    return (
        <Container style={{ marginLeft: -12 }}>
            {loading ? <CircularProgress /> : <form
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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            value={chairperson}
                            label="Chairperson"
                            variant="outlined"
                            fullWidth
                            error={chairpersonError}
                            onChange={(e) => setChairperson(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            value={contractor}
                            label="Contractor"
                            variant="outlined"
                            fullWidth
                            error={contractorError}
                            onChange={(e) => setContractor(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={description}
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={3}
                            error={descriptionError}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={contribution}
                            label="Local Contribution"
                            variant="outlined"
                            fullWidth
                            error={contributionError}
                            onChange={(e) => setContribution(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={status}
                            label="Status"
                            variant="outlined"
                            fullWidth
                            error={statusError}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={eb}
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
                            value={gb}
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
                            value={sd}
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
                            value={ed}
                            label="End date"
                            variant="outlined"
                            type="date"
                            InputProps={{
                                inputProps: { min: sd }, startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                ),
                            }}
                            error={edError}
                            onChange={(e) => setEd(e.target.value)}
                        />
                    </Grid>
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
            </form>}
        </Container>
    );
}
