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
import DashboardIcon from "@material-ui/icons/Dashboard";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import GroupIcon from "@material-ui/icons/Group";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import { Container } from "@material-ui/core";

const drawerWidth = 240;
const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon color="secondary" />,
    path: "/",
  },
  {
    text: "Project",
    icon: <ListIcon color="secondary" />,
    path: "/project",
  },
  {
    text: "Add Projects",
    icon: <AddIcon color="secondary" />,
    path: "/add",
  },
  {
    text: "Users",
    icon: <GroupIcon color="secondary" />,
    path: "/users",
  },
  {
    text: "Settings",
    icon: <SettingsIcon color="secondary" />,
    path: "/settings",
  },
  {
    text: "Profile",
    icon: <PersonIcon color="secondary" />,
    path: "/profile",
  },
  {
    text: "Log Out",
    icon: <ExitToAppIcon color="secondary" />,
    path: "/logout",
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
          <IconButton aria-label="show 4 new mails">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="show 17 new notifications">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
          >
            <AccountCircle />
          </IconButton>
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
          Admin Panel
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
        <Container className={classes.container}>{children}</Container>
      </div>
    </div>
  );
}
