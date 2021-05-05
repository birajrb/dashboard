import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
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

    const [temperature, setTemperature] = useState("");
    const [oxygen, setOxygen] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(true)

    // error
    const [temperatureError, setTemperatureError] = useState(false);
    const [oxygenError, setOxygenError] = useState(false);
    const [timeError, setTimeError] = useState(false);
    const [dateError, setDateError] = useState(false);

    //on Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        //error state
        setTemperatureError(false);
        setOxygenError(false);
        setTimeError(false);
        setDateError(false);


        if (temperature === "" || isNaN(temperature)) {
            setTemperatureError(true);
        }
        if (oxygen === "" || isNaN(oxygen)) {
            setOxygenError(true);
        }
        if (time === "") {
            setTimeError(true);
        }
        if (date === "") {
            setDateError(true);
        }

        //state update
        if (
            !isNaN(temperature) &&
            !isNaN(oxygen) &&
            time &&
            date
        ) {
            console.log(
                temperature,
                oxygen,
                time,
                date
            );
            fetch("http://localhost:8000/projects", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    temperature,
                    oxygen,
                    time,
                    date,
                }),
            }).then((res) => {
                if (res.ok) history.push("/project");
            });
        }
    };


    const fetchProject = async () => {
        try {
            const response = await fetch(`http://localhost:8000/projects/${projectId}`);
            if (response.ok) {
                const data = await response.json()

                setTemperature(data.temperature)
                setOxygen(data.oxygen)
                setTime(data.time)
                setDate(data.date)
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
            <form
                noValidate
                autoComplete="off"
                className={classes.root}
                onSubmit={handleSubmit}
            >
                <Grid container spacing={2} style={{ display: "block" }}>
                    <Grid item xs={2}>
                        <TextField
                            label="Temperature"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">°F</InputAdornment>
                                ),
                            }}
                            error={temperatureError}
                            onChange={(e) => setTemperature(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            label="Oxygen Level"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">SpO₂</InputAdornment>
                                ),
                            }}
                            error={oxygenError}
                            onChange={(e) => setOxygen(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={2} size>
                        <TextField
                            label="Time"
                            variant="outlined"
                            type="time"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                ),
                            }}
                            error={timeError}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2} size>
                        <TextField
                            label="End date"
                            variant="outlined"
                            type="date"
                            fullWidth
                            InputProps={{
                                inputProps: { min: time },
                                startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                ),
                            }}
                            error={dateError}
                            onChange={(e) => setDate(e.target.value)}
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
            </form>
        </Container>
    );
}
