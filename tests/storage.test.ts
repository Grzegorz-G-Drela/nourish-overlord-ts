import fs from 'fs';
import path from 'path';
import { saveProfile, loadProfile } from '../src/storage';
import { Profile } from '../src/types';

jest.mock('fs');

const mockProfile: Profile = {
    age: 36,
    weight: 80,
    height: 175,
    gender: 'male',
    activityLevel: 1.55
};

describe('saveProfile', () => {
    it('writes the prifle to disk as JSON', () => {
        saveProfile(mockProfile);
        expect(fs.writeFileSync).toHaveBeenCalledWith(
            expect.stringContaining('profile.json'),
            JSON.stringify(mockProfile, null, 2)
        );
    });
});

describe('loadProfile', () => {
    it('returns a Profile when the file exist', () => {
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockProfile));
        const result = loadProfile();
        expect(result).toEqual(mockProfile);
    });

    it('returns null when the file does not exist', () => {
        (fs.existsSync as jest.Mock).mockReturnValue(false);
        const result = loadProfile();
        expect(result).toBeNull();
    });
});