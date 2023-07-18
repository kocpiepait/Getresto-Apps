import Detail from '../views/pages/detail';
import Favorit from '../views/pages/favorit';
import home from '../views/pages/home';

const routes = {
  '/': home, // default page
  '/home': home,
  '/favorit': Favorit,
  '/detail/:id': Detail,
};

export default routes;
