import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
        // width: "50ch",
      },
    },
    button: {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    table: {
      minWidth: 700
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,

      borderColor: "white"
    },
    cardHeight: {
      height: 200,
      width: 350
    },
    cardDisplay: {
      display: "inline"
    }

  })
);



function Dashboard() {
  const classes = useStyles();
  const [projects, setProjects] = useState([])
  useEffect(() => {
    fetch("http://localhost:8000/projects")
      .then((res) => { return res.json() })
      .then((data) => {
        setProjects(data)

      })

  }, [])
  const exclude = ['id', 'description']

  const get_columns = data => {
    return Object.keys(data).filter(
      (value) => exclude.indexOf(value) < 0
    );
  }
  const [spacing, setSpacing] = React.useState(2);
  return (
    <div >
      <Grid container spacing={10} >
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Grid item xs={3}>
              <Card className={classes.cardHeight} elevation={2}>
                <CardContent>
                  <Typography variant="h3" color="textSecondary">Total Number of Projects: <Typography variant="h3" className={classes.cardDisplay} color="secondary">{projects.length}</Typography></Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.cardHeight} elevation={2}>
                <CardContent>
                  <Typography variant="h3" color="textSecondary">Total Number of Users: <Typography variant="h3" className={classes.cardDisplay} color="secondary">4</Typography></Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.cardHeight} elevation={2}>
                <CardContent>
                  <Typography variant="h3" color="textSecondary">Completed Projects: <Typography variant="h3" className={classes.cardDisplay} color="secondary">{projects.filter(project => project.status === 'Completed').length}</Typography></Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.cardHeight} elevation={2}>
                <CardContent>
                  <Typography variant="h3" color="textSecondary">Ongoing Projects: <Typography variant="h3" className={classes.cardDisplay} color="secondary">{projects.filter(project => project.status === 'Ongoing').length}</Typography></Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {projects.length > 0 ? <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {
                    get_columns(projects[0]).map(item => <StyledTableCell key={item}>{(item === "eb") ? "E. BUDGET" : (item === "gb") ? "G. BUDGET" : (item === "sd") ? "START DATE" : (item === "ed") ? "END DATE" : item.toUpperCase()}</StyledTableCell>)
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  projects.map((project, index) => (
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
        </Grid>
      </Grid>

    </div >
  )
}

export default Dashboard;