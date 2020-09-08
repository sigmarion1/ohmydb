import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import { useDispatch, useSelector } from "react-redux";
import { sideDrawerChange } from "../modules/isSideDrawerOpened";

import SideDrawer from "./SideDrawer";
import logo from "../img/logo.png";
import HideOnScroll from "./HideOnScroll";
import { getPics } from "../modules/sample";


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  title: {
    flexGrow: 1,
  },
}));


const Header = () => {
  const classes = useStyles();
  const isOpened = useSelector((state) => state.isSideDrawerOpened);
  const dispatch = useDispatch();

  return (
    <React.Fragment>

    <HideOnScroll>
      <AppBar position="fixed">
        <Toolbar>
          {/* <CameraIcon className={classes.icon} /> */}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => dispatch(getPics({member:'all'}))}
          >
            <img className={classes.icon} src={logo}></img>
            </ IconButton>
          
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            Oh My DB
          </Typography>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => dispatch(sideDrawerChange(true))}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={isOpened.open}
            onClose={() => dispatch(sideDrawerChange(false))}
          >
            <SideDrawer />
          </Drawer>
        </Toolbar>
      </AppBar>
</HideOnScroll>
    </React.Fragment>
  );
};

export default Header;
