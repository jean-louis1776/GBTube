import {CreateVideoData, Video} from "./Video";
import {IdentsChannel} from "./Channel";

export type IdentsPlayList = IdentsChannel & { playListId: string };
export type CreatePlayListData = IdentsPlayList & { name: string, infoAbout: string };

export class PlayList {
    private readonly idents: IdentsPlayList = { playListId: '', authorId: '', channelId: '' };
    private infoAbout: string;
    private name: string;
    private videoList: Map<string, Video> = new Map();
    constructor(playListData: CreatePlayListData) {
        const { playListId, authorId, channelId, name, infoAbout } = playListData;
        this.idents.authorId = authorId;
        this.idents.playListId = playListId;
        this.idents.channelId = channelId;
        this.name = name;
        this.infoAbout = infoAbout;
    }
    changeInfoAbout(infoAbout: string): void {
        this.infoAbout = infoAbout;
    };
    changeName(name: string): void {
        this.name = name;
    };
    createVideo(videoData: CreateVideoData): void {
        const { videoId } = videoData;
        this.videoList.set(videoId, new Video(videoData));
    };
    //TODO Подумать, что ещё у кого почистить с инфой об видео
    deleteVideo(videoId: string): void {
        this.videoList.delete(videoId);
    };
    getId():string {
        return this.idents.playListId;
    };
    getAllIdents(): IdentsPlayList  {
        return this.idents;
    }
    getInfoAbout(): string {
        return this.infoAbout;
    }
    getName(): string {
        return this.name;
    }
    getVideoList(): Map<string, Video> {
        return this.videoList;
    };
    getVideo(videoId: string): Video {
        if (this.videoList.has(videoId)) {
            return <Video>this.videoList.get(videoId);
        }
        throw new Error(`videoId ${videoId} not found in videoList`);
    }
}