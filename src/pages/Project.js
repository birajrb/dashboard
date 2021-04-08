import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container'
import CardLayout from '../layout/CardLayout';

const useStyles = makeStyles((theme) => {
    return {

    }

})

function Project() {
    const classes = useStyles();
    const [details, setDetails] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/projects")
            .then((res) => { return res.json() })
            .then((data) => setDetails(data))
    }, [])


    return (
        <div>
            <Grid container spacing={1}>
                {details.map((data) => (
                    <Grid item xs={12} sm={6} lg={4} key={data.id}>
                        <Paper className={classes.paper}><CardLayout data={data} /></Paper>
                    </Grid>
                ))}

            </Grid>
        </div>
    )
}

export default Project;