import * as express from 'express';
import { Request, Response } from 'express';
import { Image } from '../initDB';
import * as passport from 'passport';
import { passportSetup } from '../auth/index';

passportSetup();

const router = express.Router();

export const authOptions = passport.authenticate('basic', { session: false });

router.get(
    '/all',
    async (req: Request, res: Response): Promise<void> => {
        console.log(req.headers);
        try {
            const all = await Image.findAll();
            res.send(all);
        } catch (error: unknown) {
            console.error(error);
            res.send(JSON.stringify(error));
        }
    }
);

router.get(
    '/id/:id',
    async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const image = await Image.findByPk(id);
            res.send(image);
        } catch (error: unknown) {
            console.error(error);
            res.send(JSON.stringify(error));
        }
    }
);

router.post(
    '/',
    authOptions,
    async (req: any, res: Response): Promise<void> => {
        const { title, url, userId } = req.body;
        console.log(req.user);
        try {
            const postResult = await Image.create({
                title,
                url,
                userId,
            });
            res.send(
                `Created image with id ${postResult.get('id')} successfully`
            );
        } catch (error: unknown) {
            console.error(error);
            res.send(JSON.stringify(error));
        }
    }
);

router.delete(
    '/id/:id',
    authOptions,
    async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        try {
            const image = await Image.findByPk(id);
            const name = image !== null && image.get('title');
            await Image.destroy({
                where: {
                    id,
                },
            });
            res.send(`Deleted ${name} successfully`);
        } catch (error: unknown) {
            console.log(error);
            res.send(JSON.stringify(error));
        }
    }
);

// Put Request (change title, url, or user id)
router.put(
    '/id/:id',
    authOptions,
    async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        // Note that the request body should contain all three
        const { title, url, userId } = req.body;
        try {
            await Image.update(
                {
                    title,
                    url,
                    userId,
                },
                { where: { id } }
            );
            res.send('Edited image successfully');
        } catch (error: unknown) {
            console.error(error);
            res.send(JSON.stringify(error));
        }
    }
);

export default router;
