import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import imagesRouter from './routes/images';
import docsRouter from './routes/docs';
import { createRelationships } from './initDB';
import * as passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { User } from './initDB';

export const passportSetup = () => {
    passport.use('basic', new BasicStrategy(
        async (username, password, cb) => {
            const user = await User.findOne({ where: { username }})
                // .catch(error => cb(error));
            console.log('password', password);
            if(!user) {
                return cb(null, false);
            }
            if (user.get('password') !== password) {
                return cb(null, false);
            }
            return cb(null, user);
        }
    ))
}

passportSetup();

dotenv.config();
const app: express.Application = express();
app.use(cors());
app.use(passport.initialize());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use(express.static('public'));

// TODO: Add auth
app.get('/', passport.authenticate('basic', { session: false}),
    (req: Request, res: Response): void => {
        // console.log(res);
        res.send(JSON.stringify('Send a request to the backend'));
});

app.use('/', imagesRouter);
app.use('/api-docs', docsRouter);

app.listen(port, (): void => {
    createRelationships();
    console.log(`App listening at http://localhost:${port}`);
});
