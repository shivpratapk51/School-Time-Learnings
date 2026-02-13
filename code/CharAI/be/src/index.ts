import express from 'express';
import dotenv from 'dotenv';
import { routes } from './routes.js';
import { createCharacter } from './controllers.js';

dotenv.config();

const PORT = process.env.PORT;


const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post(`/api/${routes[0]}`, createCharacter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
