import React, { useState, useEffect } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import { Typography } from '@material-ui/core';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";



const paperwidth = 500;
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => {
    return {
        paper: {
            maxWidth: paperwidth
        },
        table: {
            width: 1550
        },
        appBar: {
            background: "white",

        },
    }
})



function Project() {
    const classes = useStyles();

    const history = useHistory()

    const [projects, setProjects] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const results = !searchTerm ? projects :
        projects.filter(project => {
            return Object.keys(project).some(key => {
                if (typeof (project[key]) === 'string')
                    return project[key].toLowerCase().includes(searchTerm.toLowerCase())
            })
        })


    useEffect(() => {
        const abortCont = new AbortController();
        fetch("http://localhost:8000/projects", { signal: abortCont.signal })
            .then((res) => {
                if (!res.ok) {
                    throw Error("Could not fetch data")
                }
                return res.json();
            })
            .then((data) => {
                setError(false);
                setProjects(data);
            })
            .catch(err => {
                if (err.name === "FetchError") {
                    console.log("fetch error")
                } else {
                    setError(err.message);
                }
            })
            .finally(() => setLoading(false))
        return () => {
            abortCont.abort()
        }
    }, [])

    const exclude = ["id", "name"]
    const get_columns = data => {
        return Object.keys(data).filter(value => exclude.indexOf(value) < 0)
    }

    const handleDelete = (id) => {
        console.log('Deleting..')
        fetch("http://localhost:8000/projects/" + id,
            {
                method: "DELETE",
            })
            .then(res => {
                if (res.ok) {
                    const newProjects = projects.filter(data => data.id !== id);
                    setProjects(newProjects)
                }
            })
    }

    return (
        <div style={{ marginLeft: 20 }}>
            <AppBar style={{ marginTop: 65, backgroundColor: "white", borderBottom: "none", height: 62 }} elevation={-1} position="fixed">
                <Toolbar>
                    <div style={{ marginBottom: 20, marginLeft: 240 }} >
                        <Grid container spacing={1} alignItems="flex-end" >
                            <Grid item>
                                <TextField
                                    label="Search"
                                    color="secondary"
                                    size="small"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item>
                                <SearchIcon style={{ fontSize: 25, position: "relative", right: "10", color: "black" }} />
                            </Grid>
                        </Grid>
                    </div>
                </Toolbar>
            </AppBar>
            <div style={{ marginTop: 75 }}>
                {isLoading ? <CircularProgress disableShrink /> :
                    error ? <div>{error}</div> :
                        results.length > 0 ? <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {get_columns(projects[0]).map(item => <StyledTableCell key={item}>{(item === "eb") ? "E. BUDGET" : (item === "gb") ? "G. BUDGET" : (item === "sd") ? "START DATE" : (item === "ed") ? "END DATE" : item.toUpperCase()}</StyledTableCell>)}
                                        <StyledTableCell>EDIT</StyledTableCell>
                                        <StyledTableCell>DELETE</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {results.map((project, index) => (
                                        <StyledTableRow key={index}>
                                            { get_columns(project).map(key => (
                                                <StyledTableCell>{project[key]}</StyledTableCell>
                                            ))}
                                            <StyledTableCell><IconButton aria-label="edit" className={classes.settingIcons} onClick={() => {
                                                history.push(`/project/${project.id}/edit`)
                                            }}>
                                                <EditIcon />
                                            </IconButton></StyledTableCell>
                                            <StyledTableCell><IconButton aria-label="delete" onClick={() => {
                                                console.log('A')
                                                handleDelete(project.id)
                                            }}>
                                                <DeleteIcon />
                                            </IconButton></StyledTableCell >
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> : <Typography variant="h4">No Results Found</Typography>
                }
            </div>

        </div >
    )
}

export default Project;
