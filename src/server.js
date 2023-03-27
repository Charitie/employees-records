import 'dotenv/config';
import App from './app.js'
import { getConfig } from './config/index.js';


const { port } = getConfig();

const app = new App();

app.start(port);


