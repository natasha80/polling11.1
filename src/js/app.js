/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
import Polling from './Polling';

const pollingElement = document.querySelector('.polling');
const polling = new Polling(pollingElement);
polling.init();