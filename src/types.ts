import { z } from 'zod';


// === ENUMS ===

export enum Personality {
    Robot = "robot",
    AngryChef = "angry-chef",
    MedievalPeasant = "medieval-peasant",
    ConspiracyTheorist = "conspiracy-theorist",
    Therapist = "therapist",
    DrillSergeant = "drill-sergeant"
}


// === PROFILE ===

export interface Profile {
    age: number;
    weight: number;
    height: number;
    gender: "male" | "female";
    activityLevel: number;
}


// === MEAL (CalorieNinjas API) ===

export interface Meal {
    name: string;
    calories: number;
    protein_g: number;
    fat_total_g: number;
    carbohydrates_total_g: number;
}

export interface CalorieNinjasResponse {
    items: Meal[];
}

export interface MealRequest {
    query: string;
    personality: Personality;
}

export interface MealResponse {
    items: Meal[];
    reaction: string;
}



// === ACTIVITY (API Ninjas) ===

export interface NinjasActivityItem {
    name: string;
    calories_per_hour: number;
    duration_minutes: number;
    total_calories: number;
}

export interface ActivityRequest {
    activity: string;
    duration: number;
}

export interface ActivityResponse {
    burned: number;
}



// === EXTERNAL APIs ===

export interface AnthropicResponse {
    content: { type: string; text: string }[];
}


// === ZOD SCHEMAS ===

export const MealSchema = z.object({
    name: z.string(),
    calories: z.number(),
    protein_g: z.number(),
    fat_total_g: z.number(),
    carbohydrates_total_g: z.number(),
});

export const CalorieNinjasResponseSchema = z.object({
    items: z.array(MealSchema),
});

export const AnthropicResponseSchema = z.object({
    content: z.array(
        z.object({
            type: z.string(),
            text: z.string(),
        }),
    ),
});

export const NinjasActivityItemSchema = z.object({
    name: z.string(),
    calories_per_hour: z.number(),
    duration_minutes: z.number(),
    total_calories: z.number(),
});