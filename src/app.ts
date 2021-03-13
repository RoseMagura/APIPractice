import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import imagesRouter from './routes/images';
import docsRouter from './routes/docs';
import { createRelationships } from './initDB';
import * as passport from 'passport';

dotenv.config();
const app: express.Application = express();
app.use(cors());
app.use(passport.initialize());
app.use(express.json());

// make certain fields accessible through the Express version of user
declare global {
    namespace Express {
        interface User {
            id: string;
            admin?: boolean;
        }
    }
}

const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req: Request, res: Response): void => {
    console.log(req.headers);
    res.send(JSON.stringify('Send a request to the backend'));
});

app.use('/', imagesRouter);
app.use('/api-docs', docsRouter);

app.listen(port, (): void => {
    createRelationships();
    console.log(`App listening at http://localhost:${port}`);
});
