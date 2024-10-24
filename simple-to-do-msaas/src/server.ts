import express from 'express';
import {
	createUserController,
	findOneUserController,
	listUserController,
} from './controllers/user.controller';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/users', listUserController);
app.get('/users/:userId', findOneUserController);
app.post('/users', createUserController);

app.listen(port, () => {
	console.log(`server is running on http://localhost:${port}`);
});
