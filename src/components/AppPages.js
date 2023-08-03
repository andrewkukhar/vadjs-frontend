import { allDJsIcon, HomePageIcon, GigsPageIcon } from './CustomIcons';
import DJProfiles from './DJProfiles';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import InfoIcon from '@mui/icons-material/Info';

// components for each page
function HomePage() {
  return <h2>Home Page with some information</h2>;
}

function allDJsPage() {
  return <DJProfiles />;
}

function GigsPage() {
  return <h5>Page will contain all gigs, events, fest or events that DJs will show in profile</h5>;
}

function ContactUsPage() {
  return <h5>Page will contain all gigs, events, fest or events that DJs will show in profile</h5>;
}

function AboutUsPage() {
  return <h5>Page will contain all gigs, events, fest or events that DJs will show in profile</h5>;
}

const AppPages = [
  { path: '/home', name: 'Home', Component: HomePage, Icon: HomePageIcon },
  { path: '/alldjs', name: 'All DJs', Component: allDJsPage, Icon: allDJsIcon },
  { path: '/gigs', name: 'Gigs', Component: GigsPage, Icon: GigsPageIcon },
  { path: '/contactus', name: 'Contact Us', Component: ContactUsPage, Icon: ContactSupportIcon },
  { path: '/aboutus', name: 'About Us', Component: AboutUsPage, Icon: InfoIcon },
];

export default AppPages;
