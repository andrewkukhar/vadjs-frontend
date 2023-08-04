import DJProfiles from './DJprofiles';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import InfoIcon from '@mui/icons-material/Info';
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';

function HomePage() {
  return <h2>Home Page with some information</h2>;
}

function GigsPage() {
  return <h5>Page will contain all gigs, events, fest or events that DJs will show in profile</h5>;
}

function ContactUsPage() {
  return <h5>Contact us page content will be here.</h5>;
}

function AboutUsPage() {
  return <h5>About us page content will be here.</h5>;
}

const AppPages = [
  { path: '/home', name: 'Home', Component: HomePage, Icon: HomeIcon },
  { path: '/alldjs', name: 'All DJs', Component: DJProfiles, Icon: PeopleIcon },
  { path: '/gigs', name: 'Gigs', Component: GigsPage, Icon: EventIcon },
  { path: '/contactus', name: 'Contact Us', Component: ContactUsPage, Icon: ContactSupportIcon },
  { path: '/aboutus', name: 'About Us', Component: AboutUsPage, Icon: InfoIcon },
];

export default AppPages;
