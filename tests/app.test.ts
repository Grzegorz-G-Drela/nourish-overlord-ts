import { getMealMacros, getHaikuReaction, getCaloriesBurned } from "../src/app";
import { type CalorieNinjasResponse, type AnthropicResponse, type ActivityResponse, Personality } from "../src/types";

global.fetch = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe('getMealMacros', () => {
    it('returns CalorieNinjasResponse on success', async () => {
        const mockData: CalorieNinjasResponse = {
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

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: async () => mockData,
        });

        const result = await getMealMacros('give me a meal');
        expect(result).toEqual(mockData);
    });

    it('throws when fetch fails', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
        await expect(getMealMacros('chicken')).rejects.toThrow('Network error');
    });
});

describe('getHaikuReaction', () => {
    it('returns reaction string on success', async () => {
        const mockMacros: CalorieNinjasResponse = {
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
        const mockData: AnthropicResponse = {
            content: [{ type: "text", text: 'You disgust me.' }],
        };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: async () => mockData,
        });

        const result = await getHaikuReaction(mockMacros, Personality.AngryChef);
        expect(result).toBe('You disgust me.');
    });

    it('throws when fetch fails', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
        await expect(getHaikuReaction({ items: [] }, Personality.Robot)).rejects.toThrow('Network error');
    });
});

describe('getCaloriesBurned', () => {
    it('returns NinjasActivityItem array on success', async () => {
        const mockData = [
            {
                name: 'running',
                calories_per_hour: 600,
                duration_minutes: 30,
                total_calories: 300,
            },
        ];
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: async () => mockData,
        });

        const result = await getCaloriesBurned('running', 30);
        expect(result).toEqual(mockData);
    });

    it('throws when fetch fails', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
        await expect(getCaloriesBurned('running', 30)).rejects.toThrow('Network error');
    });
});
