import DJProfiles from "../djs/DJprofiles";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import InfoIcon from "@mui/icons-material/Info";
import EventIcon from "@mui/icons-material/Event";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import GigsPage from "./Gigs";
import ContactUsPage from "./ContactUs";
import AboutUsPage from "./AboutUs";
import HomePage from "./Home";

const AppPages = [
  { path: "home", name: "Home", Component: HomePage, Icon: HomeIcon },
  { path: "alldjs", name: "All DJs", Component: DJProfiles, Icon: PeopleIcon },
  { path: "gigs", name: "Gigs", Component: GigsPage, Icon: EventIcon },
  {
    path: "contactus",
    name: "Contact Us",
    Component: ContactUsPage,
    Icon: ContactSupportIcon,
  },
  {
    path: "aboutus",
    name: "About Us",
    Component: AboutUsPage,
    Icon: InfoIcon,
  },
];

export default AppPages;
