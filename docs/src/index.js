import { ReactApp } from './react-masonry.jsx';
import SmoothScroll from 'smooth-scroll';
import registerServiceWorker from './utils/registerServiceWorker';

window.onload = init;

/*starter function */
function init() {
  let scroll = new SmoothScroll('a[href*="#"]');
  let masonry = new ReactApp();
  registerServiceWorker();
}
