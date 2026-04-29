"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const storage_1 = require("../src/storage");
jest.mock('fs');
const mockProfile = {
    age: 36,
    weight: 80,
    height: 175,
    gender: 'male',
    activityLevel: 1.55
};
describe('saveProfile', () => {
    it('writes the prifle to disk as JSON', () => {
        (0, storage_1.saveProfile)(mockProfile);
        expect(fs_1.default.writeFileSync).toHaveBeenCalledWith(expect.stringContaining('profile.json'), JSON.stringify(mockProfile, null, 2));
    });
});
describe('loadProfile', () => {
    it('returns a Profile when the file exist', () => {
        fs_1.default.existsSync.mockReturnValue(true);
        fs_1.default.readFileSync.mockReturnValue(JSON.stringify(mockProfile));
        const result = (0, storage_1.loadProfile)();
        expect(result).toEqual(mockProfile);
    });
    it('returns null when the file does not exist', () => {
        fs_1.default.existsSync.mockReturnValue(false);
        const result = (0, storage_1.loadProfile)();
        expect(result).toBeNull();
    });
});
