import { calculateBMR } from '../src/bmr';
import { Profile } from '../src/types'

describe('calculateBMR', () => {
    it('returns correct BMR for male profile', () => {
        const profile: Profile = {
            age: 36,
            weight: 80,
            height: 175,
            gender: "male",
            activityLevel: 1.55
        };
        expect(calculateBMR(profile)).toBe(1718.75);
    });
});