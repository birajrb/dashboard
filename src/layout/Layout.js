import React, { useState } from "react";
import { useLocation, useHistory, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";


const drawerWidth = 240;
const menuItems = [

  {
    text: "Report",
    icon: <ListIcon color="secondary" />,
    path: "/project",
  },
  {
    text: "Add Report",
    icon: <AddIcon color="secondary" />,
    path: "/add",
  },

];

const getTitle = (menuItems, pathname) => {
  const menu = menuItems.find((m) => m.path === pathname);
  return menu ? menu.text : "";
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      background: "white",
      borderBottom: `1px solid  rgba(0, 0, 0, 0.12)`,
    },
    drawer: {
      width: drawerWidth,
    },
    children: {
      width: "100%",
    },

    drawerPaper: {
      width: drawerWidth,
    },
    title: {
      padding: theme.spacing(2),

      //   marginBottom: theme.spacing(2),
      //   marginTop: theme.spacing(1),
    },
    active: {
      background: "#f4f4f4",
    },
    toolbar: theme.mixins.toolbar,
    appItems: {
      flexGrow: 1,
      display: "flex",
    },
    appItemsTitle: {
      marginRight: theme.spacing(4),
    },
    container: {
      marginTop: 10,
      marginRight: 10,
      marginLeft: 0,
    },
  };
});

export default function Layout({ children }) {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [title, setTitle] = useState(getTitle(menuItems, location.pathname));
  const handleTitle = (menu) => {
    setTitle(menu.text);
    history.push(menu.path);
  };

  return (
    <div className={classes.root}>
      {/*navbar  */}
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar>
          <div className={classes.appItems}>
            <Typography
              variant="h6"
              color="textSecondary"
              className={classes.appItemsTitle}
            >
              {title}
            </Typography>
          </div>

        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Typography
          variant="h5"
          component="h2"
          color="textSecondary"
          className={classes.title}
        >
          Medical Report
        </Typography>
        <Divider />
        <List>
          {menuItems.map((menu) => (
            <ListItem
              button
              key={menu.text}
              className={
                location.pathname === menu.path ? classes.active : null
              }
              onClick={() => handleTitle(menu)}
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.children}>
        <div className={classes.toolbar}></div>
        <div className={classes.container}>{children}</div>
      </div>
    </div>
  );
}
