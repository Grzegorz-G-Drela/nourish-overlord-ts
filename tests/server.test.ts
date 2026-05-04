import request from 'supertest';
import app from '../src/server';
import { getMealMacros, getHaikuReaction, getCaloriesBurned } from '../src/app';
import { Personality } from '../src/types';

jest.mock('../src/app');

const mockGetMealMacros = getMealMacros as jest.Mock;
const mockGetHaikuReaction = getHaikuReaction as jest.Mock;
const mockGetCaloriesBurned = getCaloriesBurned as jest.Mock;

beforeEach(() => {
    jest.clearAllMocks();
});

describe('POST /api/meal', () => {
    it('returns meal on data success', async () => {
        const mockMacros = {
            items: [{ name: 'chickem', calories: 200, protein_g: 30, fat_total_g: 5, carbohydrates_total_g: 0 }],
        };

        mockGetMealMacros.mockResolvedValueOnce(mockMacros);
        mockGetHaikuReaction.mockResolvedValueOnce('Pathetic.');

        const res = await request(app)
            .post('/api/meal')
            .send({ query: 'chicken', personality: Personality.AngryChef });

        expect(res.status).toBe(200);
        expect(res.body.items).toEqual(mockMacros.items);
        expect(res.body.reaction).toBe('Pathetic.');
    });

    it('returns empty items when meal not found', async () => {
        mockGetMealMacros.mockResolvedValueOnce({ items: [] });
        mockGetHaikuReaction.mockResolvedValue('');

        const res = await request(app)
            .post('/api/meal')
            .send({ query: 'xyzabc', personality: Personality.Robot });

        expect(res.status).toBe(200);
        expect(res.body.items).toEqual([]);
    });
});

describe("POST /api/burned", () => {
    it('returns calorie burned on success', async () => {
        mockGetCaloriesBurned.mockResolvedValueOnce([
            { name: 'running', calories_per_hour: 600, duration_minutes: 30, total_calories: 300}
        ]);

        const res = await request(app)
            .post('/api/burned')
            .send({ activity: 'running', duration: 30 });

        expect(res.status).toBe(200);
        expect(res.body.burned).toBe(300);
    });

    it('returns 404 when activity not found', async () => {
        mockGetCaloriesBurned.mockResolvedValueOnce([]);

        const res = await request(app)
            .post('/api/burned')
            .send({ activity: 'xyzabc', duration: 30 });

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Activity not found');
    });
});