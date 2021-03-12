import { BasicStrategy } from 'passport-http';
import { User } from '../initDB';
import * as passport from 'passport';

export const passportSetup = (): void  => {
    passport.use(
        'basic',
        new BasicStrategy(async (username, password, cb) => {
            const user = await User.findOne({
                where: { username },
            }).catch((error) => cb(error));
            console.log('password', password);
            if (!user) {
                return cb(null, false);
            }
            if (user.get('password') !== password) {
                return cb(null, false);
            }
            return cb(null, user);
        })
    );
    console.log('setting up passport');
};