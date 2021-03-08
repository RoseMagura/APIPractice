import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import imagesRouter from './routes/images';
import docsRouter from './routes/docs';

dotenv.config();
const app: express.Application = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use('/', imagesRouter);
app.use('/api-docs', docsRouter);

app.listen(port, (): void => {
    console.log(`App listening at http://localhost:${port}`);
});
