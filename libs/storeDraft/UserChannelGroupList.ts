import {Channel, CreateChannelData} from "./Channel";

export class UserChannelGroupList {
    private list: Map<string, Map<string, Channel>> = new Map();
    getUserChannelGroup(authorId: string): Map<string, Channel> {
        if (this.list.has(authorId)) {
            return <Map<string, Channel>>this.list.get(authorId);
        }
        throw new Error(`user ID ${authorId} not found in UserProfileList`);
    };
    createUserChannelGroup(authorId: string) {
        this.list.set(authorId, new Map());
    };
    createUserChannel(channelData: CreateChannelData) {
        const { channelId, authorId } = channelData;
        const newChannel =  new Channel(channelData);
        const userChannelGroup = this.getUserChannelGroup(authorId);
        userChannelGroup.set(channelId, newChannel);
    };
    deleteUserChannelGroup(authorId: string): void {
        if (!this.list.has(authorId)) {
            throw new Error(`user ID ${authorId} not found in UserProfileList`);
        }
        this.list.delete(authorId);
    };
    deleteUserChannel(authorId: string): void {
        if (!this.list.has(authorId)) {
            throw new Error(`user ID ${authorId} not found in UserProfileList`);
        }
        this.list.delete(authorId);
    };
}