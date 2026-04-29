"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../src/app");
const types_1 = require("../src/types");
global.fetch = jest.fn();
beforeEach(() => {
    jest.clearAllMocks();
});
describe('getMealMacros', () => {
    it('returns CalorieNinjasResponse on success', async () => {
        const mockData = {
            items: [
                {
                    name: 'test-food',
                    calories: 999,
                    protein_g: 999,
                    fat_total_g: 999,
                    carbohydrates_total_g: 999,
                },
            ],
        };
        global.fetch.mockResolvedValueOnce({
            json: async () => mockData,
        });
        const result = await (0, app_1.getMealMacros)('give me a meal');
        expect(result).toEqual(mockData);
    });
    it('throws when fetch fails', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Network error'));
        await expect((0, app_1.getMealMacros)('chicken')).rejects.toThrow('Network error');
    });
});
describe('getHaikuReaction', () => {
    it('returns reaction string on success', async () => {
        const mockMacros = {
            items: [
                {
                    name: 'test-food',
                    calories: 999,
                    protein_g: 999,
                    fat_total_g: 999,
                    carbohydrates_total_g: 999,
                },
            ],
        };
        const mockData = {
            content: [{ type: "text", text: 'You disgust me.' }],
        };
        global.fetch.mockResolvedValueOnce({
            json: async () => mockData,
        });
        const result = await (0, app_1.getHaikuReaction)(mockMacros, types_1.Personality.AngryChef);
        expect(result).toBe('You disgust me.');
    });
    it('throws when fetch fails', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Network error'));
        await expect((0, app_1.getHaikuReaction)({ items: [] }, types_1.Personality.Robot)).rejects.toThrow('Network error');
    });
});
describe('getCaloriesBurned', () => {
    it('returns NinjasActivityItem array on success', async () => {
        const mockData = {
            burned: 300,
        };
        global.fetch.mockResolvedValueOnce({
            json: async () => mockData,
        });
        const result = await (0, app_1.getCaloriesBurned)('running', 30);
        expect(result).toEqual(mockData);
    });
    it('throws when fetch fails', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Network error'));
        await expect((0, app_1.getCaloriesBurned)('running', 30)).rejects.toThrow('Network error');
    });
});
