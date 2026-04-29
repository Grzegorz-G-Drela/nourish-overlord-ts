"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bmr_1 = require("../src/bmr");
describe('calculateBMR', () => {
    it('returns correct BMR for male profile', () => {
        const profile = {
            age: 36,
            weight: 80,
            height: 175,
            gender: 'male',
            activityLevel: 1.55
        };
        expect((0, bmr_1.calculateBMR)(profile)).toBe(1718.75);
    });
    it('returns correct BMR for a female profile', () => {
        const profile = {
            age: 28,
            weight: 65,
            height: 165,
            gender: 'female',
            activityLevel: 1.2
        };
        expect((0, bmr_1.calculateBMR)(profile)).toBe(1380.25);
    });
    it('returns a number greater than zero for any valid profile', () => {
        const profile = {
            age: 1,
            weight: 10,
            height: 50,
            gender: 'male',
            activityLevel: 1.2
        };
        expect((0, bmr_1.calculateBMR)(profile)).toBeGreaterThan(0);
    });
});
