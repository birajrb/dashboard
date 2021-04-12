import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import CardLayout from '../layout/CardLayout';
import { Container } from '@material-ui/core';

const paperwidth = 500;

const useStyles = makeStyles((theme) => {
    return {
        paper: {
            maxWidth: paperwidth
        }
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

    const handleDelete = (id) => {
        console.log('DEleting..')
        fetch("http://localhost:8000/projects/" + id,
            {
                method: "DELETE",
            })
            .then(res => {
                if (res.ok) {
                    const newDetails = details.filter(data => data.id !== id);
                    setDetails(newDetails)
                }
            })

    }


    return (
        <div>
            <Grid container spacing={1}>
                {details.map((data) => (
                    <Grid item xs={12} sm={6} lg={4} key={data.id}>
                        <Paper className={classes.paper}><CardLayout data={data} handleDelete={handleDelete} /></Paper>
                    </Grid>
                ))}

            </Grid>
        </div>
    )
}

export default Project;