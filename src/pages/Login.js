import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/Lock';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            "& .MuiTextField-root": {
                marginBottom: theme.spacing(1),
                // width: "50ch",
            },
            marginRight: theme.spacing(1)
        },

        container: {
            marginTop: theme.spacing(1)
        }

    }))

const avatarStyle = {
    backgroundColor: "#f50057",
    marginBottom: 10
}

const paperStyle = {
    padding: 20,
    height: "60vh",
    width: 350,
    margin: "10px auto"
}
function Login() {
    const classes = useStyles();
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <div>
            <Grid container style={{ marginTop: 50 }}>
                <Paper elevation={10} style={paperStyle} width="280">
                    <Grid align="center" style={{ marginBottom: 50 }}>
                        <Avatar style={avatarStyle}><LockIcon /></Avatar>
                        <Typography variant="h5">Sign In</Typography>
                    </Grid>
                    <form className={classes.root} noValidate >
                        <TextField id="username" label="Username" variant="outlined" fullWidth required />
                        <TextField id="password" label="Password" variant="outlined" fullWidth type="password" required />
                        <FormGroup>
                            <FormControlLabel control={<Checkbox name="Remember" />} label="Remember me" />
                        </FormGroup>
                        <Button color="secondary" variant="contained" fullWidth size="large" type="submit">Sign In</Button>

                        <Typography className={classes.container} variant="subtitle1">
                            <Link to="#" style={{ textDecoration: "none" }}> Forgot Password?</Link>
                        </Typography>
                        <Typography className={classes.container} variant="subtitle1"> Don't have an account?
                            <Link to="#" style={{ paddingLeft: 10, textDecoration: "none", }
                            }> Sign Up Here!</Link>
                        </Typography>


                    </form>
                </Paper>
            </Grid>
        </div >
    )
}

export default Login
