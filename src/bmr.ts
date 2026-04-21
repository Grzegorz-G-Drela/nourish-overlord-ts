import { Profile } from './types';

export function calculateBMR(profile: Profile): number {
    const baseCalories = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age;
    let result;
    if (profile.gender === 'male') result = baseCalories + 5; 
    else result = baseCalories - 161; 
    return result;
}