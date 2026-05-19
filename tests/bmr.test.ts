import { calculateBMR } from '../src/bmr';
import { Profile } from '../src/types'

describe('calculateBMR', () => {
    it('returns correct BMR for male profile', () => {
        const profile: Profile = {
            age: 36,
            weight: 80,
            height: 175,
            gender: 'male',
            activityLevel: 1.55
        };
        expect(calculateBMR(profile).bmr).toBe(1718.75);
        expect(calculateBMR(profile).dailyCalories).toBe(2664.0625);
    });

    it('returns correct BMR for a female profile', () => {
        const profile: Profile = {
            age: 28,
            weight: 65,
            height: 165,
            gender: 'female',
            activityLevel: 1.2
        };
        expect(calculateBMR(profile).bmr).toBe(1380.25);
        expect(calculateBMR(profile).dailyCalories).toBe(1656.3);
    });

    it('returns a number greater than zero for any valid profile', () => {
        const profile: Profile = {
            age: 1,
            weight: 10,
            height: 50,
            gender: 'male',
            activityLevel: 1.2
        };
        expect(calculateBMR(profile).bmr).toBeGreaterThan(0);
    });
});