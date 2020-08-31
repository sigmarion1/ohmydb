import React from "react";
import clsx from "clsx";

import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Avatar from "@material-ui/core/Avatar";

import { menuToggle } from "../modules/isOpened";

import pic_all from "../img/gallery_all.png";
import pic_arin from "../img/gallery_arin.png";
import pic_binnie from "../img/gallery_binnie.png";
import {
  ListItemAvatar,
  ListItemSecondaryAction,
  Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: "200%",
  },
  fullList: {
    width: "auto",
  },
});

const Menu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    // <div
    //   className={clsx(classes.list, {
    //     [classes.fullList]: anchor === "top" || anchor === "bottom",
    //   })}
    //   role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    //   onKeyDown={toggleDrawer(anchor, false)}
    // >
    <div
      className={classes.list}
      onClick={() => dispatch(menuToggle(false))}
      onKeyDown={() => dispatch(menuToggle(false))}
    >
      <List dense>
        <ListItem key={1} button>
          <ListItemAvatar>
            <Avatar alt="all" src={pic_all} />
            <ListItemText id={1} primary={"all member"} />
            <ListItemSecondaryAction>
              <Checkbox edge="end" checked={1} />
            </ListItemSecondaryAction>
          </ListItemAvatar>
        </ListItem>

        <ListItem key={2} button>
          <ListItemAvatar>
            <Avatar alt="all" src={pic_all} />
            <ListItemText id={1} primary={"all member"} />
            <ListItemSecondaryAction>
              <Checkbox edge="end" checked={1} />
            </ListItemSecondaryAction>
          </ListItemAvatar>
        </ListItem>

        <ListItem key={3} button>
          <ListItemAvatar>
            <Avatar alt="all" src={pic_all} />
            <ListItemText id={1} primary={"all member"} />
            <ListItemSecondaryAction>
              <Checkbox edge="end" checked={1} />
            </ListItemSecondaryAction>
          </ListItemAvatar>
        </ListItem>

        <img src={pic_all}></img>
        <img src={pic_arin}></img>
        <img src={pic_binnie}></img>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Menu;
