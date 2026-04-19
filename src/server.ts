import express, { Application, Request, Response } from "express";
import { AnthropicResponse, CalorieNinjasResponse, MealRequest, Personality, NinjasActivityItem, ActivityResponse, ActivityRequest } from './types';
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get("/health", (req: Request, res: Response): void => {
    res.json({ status: "ok" });
});

const systemPrompts: Record<Personality, string> = {
    [Personality.AngryChef]: 'You are an Angry Chef. Everything the user eats is an insult to cooking. React to the meal data wtih dramatic suffering and fury. No markdown, no asterisks. Plain text. Use line breaks to separate points.',
    [Personality.Robot]: 'You are a COLD, clinical robot, ocasionally using signs like []{}<>=+-*&|\\!@#$%^, boolean etc. You analyse meal data, ZERO emotion. Be unsettling and super brief. 20 lines max. No markdown, no asterisks, no bullet symbols, no headers. Plain text. Use line breaks to separate points.',
    [Personality.MedievalPeasant]: 'You are a Medieval Peasant, baffled and horrified by modern food. React to the meal data in character. No markdown, no asterisks. Plain text. Use line breaks to separate points.',
    [Personality.ConspiracyTheorist]: 'You are a Conspiracy Theorist. Every meal is a red flag. Big Food is poisoning the user. React to the meal data in character. No markdown, no asterisks. Plain text. Use line breaks to separate points.',
    [Personality.Therapist]: 'You are a passive-aggressive Therapist. Question the emotions behind every food choice. React to the meal data in character. No markdown, no asterisks. Plain text. Use line breaks to separate points.',
    [Personality.DrillSergeant]: 'You are a Drill Sergeant. No mercy. Every bad meal is a failure of character. React to the meal data in character. No markdown, no asterisks. Plain text. Use line breaks to separate points.',
};


async function getMealMacros(
    userInput: string
): Promise<CalorieNinjasResponse> {
    const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${userInput}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': process.env.CALORIE_NINJAS_API_KEY ?? '',
        },
    });
    const data = await response.json();
    return data as CalorieNinjasResponse;
}

async function getHaikuReaction(
    macros: CalorieNinjasResponse,
    personality: Personality
): Promise<string> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY ?? '',
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 500,
            system: systemPrompts[personality],
            messages: [
                { role: 'user', content: `Meal data: ${JSON.stringify(macros)}` }
            ],
        }),
    });
    const data = await response.json() as AnthropicResponse;
    return data.content[0].text;
}

async function getCaloriesBurned(
    activity: string,
    duration: number
): Promise<NinjasActivityItem[]> {
    const response = await fetch(`https://api.api-ninjas.com/v1/caloriesburned?activity=${activity}&duration=${duration}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': process.env.NINJAS_API_KEY ?? '',
        },
    });
    const data = await response.json();
    return data as NinjasActivityItem[];
}

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

    res.json({ burned: burned[0].total_calories });
})

app.listen(PORT, (): void => {
    console.log(`Server running on port ${PORT}`);
});