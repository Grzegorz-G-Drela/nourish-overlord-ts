import cors from 'cors';
import express, { Application, Request, Response } from "express";
import { MealRequest, ActivityRequest } from './types';
import {getMealMacros, getHaikuReaction, getCaloriesBurned} from './app';
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());

app.get("/health", (req: Request, res: Response): void => {
    res.json({ status: "ok" });
});

app.post('/api/meal', async (
    req: Request<{}, {}, MealRequest>,
    res: Response
): Promise<void> => {
    const { query, personality } = req.body;

    const macros = await getMealMacros(query);
    const reaction = await getHaikuReaction(macros, personality);

    res.json({ items: macros.items, reaction });
});

app.post('/api/burned', async (
    req: Request<{}, {}, ActivityRequest>,
    res: Response
): Promise<void> => {
    const {activity, duration} = req.body;
    const burned = await getCaloriesBurned(activity, duration);

    if (!burned.length) {
        res.status(404).json({ error: 'Activity not found' });
        return;
    }

    res.json({ burned: burned[0].total_calories });
})

app.listen(PORT, (): void => {
    console.log(`Server running on port ${PORT}`);
});