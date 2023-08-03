import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

const AppPages = [
  { path: 'page1', name: 'Page 1', Component: Page1, Icon: HomeIcon },
  { path: 'page2', name: 'Page 2', Component: Page2, Icon: SettingsIcon },
];

export default AppPages;

// components for each page
function Page1() {
  return <h2>Page 1 Content</h2>;
}
function Page2() {
  return <h2>Page 2 Content</h2>;
}

export { Page1, Page2, };
