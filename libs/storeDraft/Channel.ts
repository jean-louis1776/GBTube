import {CreatePlayListData, PlayList} from "./PlayList";

export type IdentsChannel = {channelId: string, authorId: string};
export type CreateChannelData = IdentsChannel & { name: string, infoAbout: string }

export class Channel {
    private readonly idents: IdentsChannel = {channelId: '', authorId: ''};
    private infoAbout: string;
    private name: string;
    private playLists: Map<string, PlayList> = new Map();
    constructor(channelData: CreateChannelData) {
        const { channelId, authorId, name, infoAbout } = channelData;
        this.idents.channelId = channelId;
        this.idents.authorId = authorId;
        this.name = name;
        this.infoAbout = infoAbout;
    }
    changeInfoAbout(infoAbout: string): void {
        this.infoAbout = infoAbout;
    };
    changeName(name: string): void {
        this.name = name;
    };
    createPlaylist(playListData: CreatePlayListData): void {
        const { playListId } = playListData;
        this.playLists.set(playListId, new PlayList(playListData));
    };
    //TODO Подумать, что ещё у кого почистить с инфой об Playlists
    deletePlaylist(playListId: string): void {
        this.playLists.delete(playListId);
    };
    getId():string {
        return this.idents.channelId;
    };
    getAllIdents(): IdentsChannel {
        return this.idents;
    }
    getInfoAbout(): string {
        return this.infoAbout;
    }
    getName(): string {
        return this.name;
    }
    getPlayLists(): Map<string, PlayList> {
        return this.playLists;
    };
    getPlayList(playListId: string): PlayList {
        if (this.playLists.has(playListId)) {
            return <PlayList>this.playLists.get(playListId);
        }
        throw new Error(`playListId ${playListId} not found in playLists`);
    }
}