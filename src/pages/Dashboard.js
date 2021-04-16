import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container"
import CircularProgress from '@material-ui/core/CircularProgress'


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
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
    },
    button: {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    table: {
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      borderColor: "white"
    },
    cardHeight: {
      height: 200,
      flexShrink: 1,
      flexGrow: 1,
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(5),
      width: 150,
    },
    cardDisplay: {
      display: "inline",

    },
    cardContainer: {
      display: "flex",
      flexWrap: "wrap"
    },
    container: {
      marginTop: 10,
      marginRight: 10,
      marginLeft: 0,
    },

  })
);

function Dashboard() {
  const classes = useStyles();
  const [projects, setProjects] = useState([])
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const results = projects.sort((a, b) => {
    if (a.sd < b.sd) return -1
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

  const exclude = ['id', 'description', 'chairperson', 'contractor', 'contribution', 'eb', 'gb', 'sd', 'ed']
  const get_columns = data => {
    return Object.keys(data).filter(
      (value) => exclude.indexOf(value) < 0
    );
  }
  const [spacing, setSpacing] = React.useState(2);
  return (
    <Container className={classes.container}>
      { isLoading ? <CircularProgress disableShrink /> :
        error ? <div>{error}</div> :
          <div className={classes.cardContainer}>
            <Card className={classes.cardHeight} elevation={2}>
              <CardContent>
                <Typography variant="h4" color="textSecondary">Total Number of Projects: <Typography variant="h4" className={classes.cardDisplay} color="secondary">{projects.length}</Typography></Typography>
              </CardContent>
            </Card>
            <Card className={classes.cardHeight} elevation={2}>
              <CardContent>
                <Typography variant="h4" color="textSecondary">Total Number of Users: <Typography variant="h4" className={classes.cardDisplay} color="secondary">4</Typography></Typography>
              </CardContent>
            </Card>
            <Card className={classes.cardHeight} elevation={2}>
              <CardContent>
                <Typography variant="h4" color="textSecondary">Completed Projects: <Typography variant="h4" className={classes.cardDisplay} color="secondary">{projects.filter(project => project.status === 'Completed').length}</Typography></Typography>
              </CardContent>
            </Card>
            <Card className={classes.cardHeight} elevation={2}>
              <CardContent>
                <Typography variant="h4" color="textSecondary">Ongoing Projects: <Typography variant="h4" className={classes.cardDisplay} color="secondary">{projects.filter(project => project.status === 'Ongoing').length}</Typography></Typography>
              </CardContent>
            </Card>
          </div>}
      {projects.length > 0 ? <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell variant="head" colSpan="2" align="center"><Typography variant="h6">RECENT PROJECTS</Typography></StyledTableCell>
            </TableRow>
            <TableRow>
              {
                get_columns(projects[0]).map(item => <StyledTableCell key={item}>{(item === "eb") ? "E. BUDGET" : (item === "gb") ? "G. BUDGET" : (item === "sd") ? "START DATE" : (item === "ed") ? "END DATE" : item.toUpperCase()}</StyledTableCell>)
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              results.slice(0, 10).map((project, index) => (
                <StyledTableRow key={index}>
                  {
                    get_columns(project).map(key => (<StyledTableCell key={key}>{project[key]}</StyledTableCell>))
                  }
                </StyledTableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer> : null}
    </Container >
  )
}

export default Dashboard;