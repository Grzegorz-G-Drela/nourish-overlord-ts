export enum Personality {
    Robot = "robot",
    AngryChef = "angry-chef",
    MedievalPeasant = "medieval-peasant",
    ConspiracyTheorist = "conspiracy-theorist",
    Therapist = "therapist",
    DrillSergeant = "drill-sergeant"
}

export interface Meal {
    name: string;
    calories: number;
    protein_g: number;
    fat_total_g: number;
    carbohydrates_total_g: number;
}

export interface MealResponse {
    items: Meal[];
    reaction: string;
}

export interface ActivityResponse {
    burned: number;
}

export interface Profile {
    age: number;
    weight: number;
    height: number;
    gender: "male" | "female";
    activityLevel: number;
}