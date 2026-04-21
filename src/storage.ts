import fs from 'fs';
import path from 'path';
import { Profile } from './types';

const PROFILE_PATH = path.join(__dirname, '..', 'profile.json');

export function saveProfile(profile: Profile): void {
    fs.writeFileSync(PROFILE_PATH, JSON.stringify(profile, null, 2));
}

export function loadProfile(): Profile | null {
    if (!fs.existsSync(PROFILE_PATH)) {
        return null;
    }
    const raw = fs.readFileSync(PROFILE_PATH, 'utf-8');
    return JSON.parse(raw) as Profile;
}