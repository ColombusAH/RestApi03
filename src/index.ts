import App from './app';
import * as dotenv from 'dotenv';

dotenv.config();
const port = +(process.env.PORT || '3000');
const app = new App(port);
app.listen();
