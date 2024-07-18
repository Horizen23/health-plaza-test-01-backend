import express from 'express';
import todoRoutes from './routes/todoRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', todoRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
