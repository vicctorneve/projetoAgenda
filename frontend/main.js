import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';
import Login from './modules/Login';
import Register from './modules/Register';
import Contato from './modules/Contato';

const login = new Login();
const cadastro = new Register();
const contato = new Contato();

cadastro.init();
login.init();
contato.init();

