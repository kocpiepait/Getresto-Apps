import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/responsif.css';
import '../styles/footer.css';
import '../styles/detail.css';
import '../styles/favorited.css';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import App from './views/app';
import swRegister from './utils/sw-register';
import './component/header';
import './component/hero';
import './component/footer';

const app = new App({
  button: document.querySelector('#hamburgerMenu'),
  drawer: document.querySelector('#navigasiDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
