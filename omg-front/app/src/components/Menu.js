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

import DraftsIcon from "@material-ui/icons/Drafts";

import picMember from "../lib/picMember";
import memberInfo from "../lib/memberInfo";

import {
  ListItemAvatar,
  ListItemSecondaryAction,
  Checkbox,
  CardMedia,
  Card,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
    maxWidth: 36000,
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
}));

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
};

const Menu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  console.log(picMember);

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
      <List component="nav" aria-label="main mailbox folders">
        {memberInfo.map((member, index) => {
          return (
            <ListItem
              key={index}
              target="_blank"
              button
              href="http://www.google.com"
            >
              <ListItemIcon>
                <Avatar
                  alt={member.name}
                  src={member.image}
                  className={classes.large}
                />
              </ListItemIcon>
              <ListItemText primary={member.name} />
            </ListItem>
          );
        })}
        <ListItem button>
          <ListItemIcon>
            <Avatar
              alt="all"
              src={picMember.img_all}
              className={classes.large}
            />
          </ListItemIcon>
          <ListItemText primary="group" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItemLink href="#simple-list">
          <ListItemText primary="Spam" />
        </ListItemLink>
      </List>

      {/* <List dense>
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
      </List> */}
    </div>
  );
};

export default Menu;
