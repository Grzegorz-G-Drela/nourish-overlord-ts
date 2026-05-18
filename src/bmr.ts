import { Profile } from './types';

export function calculateBMR(profile: Profile): { bmr: number; dailyCalories: number } {
    const baseCalories = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age;
    let bmr: number;
    if (profile.gender === 'male') bmr = baseCalories + 5; 
    else bmr = baseCalories - 161;
    const dailyCalories = profile.activityLevel * bmr;
    return { bmr, dailyCalories };
}