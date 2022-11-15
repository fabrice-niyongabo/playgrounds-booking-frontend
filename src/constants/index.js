import { GoDashboard } from "react-icons/go";
import { GrPlan } from "react-icons/gr";
import Dashboard from "../components/Dashboard/contents/dashboard";
import Playgrounds from "../components/Dashboard/contents/playgrounds";
export const adminSidebarTabs = [
  {
    tabName: "dashboard",
    tabLabel: "Dashboard",
    tabIcon: <GoDashboard size={20} />,
    component: <Dashboard />,
  },
  {
    tabName: "playgrounds",
    tabLabel: "Playgrounds",
    tabIcon: <GrPlan size={20} />,
    component: <Playgrounds />,
  },
];
