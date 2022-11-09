import {User} from "./User";

export class UserProfileList {
    list: Map<string, User> = new Map();
    getUserProfile(userId: string): User {
        if (this.list.has(userId)) {
            return <User>this.list.get(userId);
        }
        throw new Error(`user ID ${userId} not found in UserProfileList`);
    }
    createUserProfile(userId: string, personalData: User) {
        this.list.set(userId, personalData);
    }
    deleteUserProfile(userId: string): void {
        this.list.delete(userId);
    }
}