import { getMealMacros, getHaikuReaction, getCaloriesBurned } from "../src/app";
import type { CalorieNinjasResponse, AnthropicResponse, ActivityResponse } from "../src/types";

global.fetch = jest.fn();

beforeEach(() => {
    jest.clearAllMocks;
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
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error ('Network error'));
        await expect(getMealMacros('chicken')).rejects.toThrow('Network error');
    });
});