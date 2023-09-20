import { Icon } from "@chakra-ui/react";
import { MdBarChart, MdHome, MdHowToReg, MdLocalOffer } from "react-icons/md";

// Admin Imports
import Annotation from "views/admin/annotation";
import DataTables from "views/admin/classifier";
import MainDashboard from "views/admin/default";
import Profile from "views/admin/evaluation";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "Annotation",
    layout: "/admin",
    path: "/annotation",
    icon: <Icon as={MdLocalOffer} width="20px" height="20px" color="inherit" />,
    component: Annotation,
    secondary: true,
  },
  {
    name: "Classifier",
    layout: "/admin",
    icon: <Icon as={MdHowToReg} width="20px" height="20px" color="inherit" />,
    path: "/classifier",
    component: DataTables,
  },
  {
    name: "Evaluation",
    layout: "/admin",
    path: "/evaluation",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
];

export default routes;
