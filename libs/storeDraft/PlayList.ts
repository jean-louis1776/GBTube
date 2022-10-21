import {CreateVideoData, Video} from "./Video";

export type CreatePlayListData = { name: string, textContent: string };

export class PlayList {
    private children: Map<string, Video> = new Map();
    private readonly createDate = new Date();
    private readonly idList: string[];
    private textContent: string;
    private name: string;

    constructor(playListData: CreatePlayListData, iDList: string[]) {
      const { name, textContent } = playListData;
      this.idList = iDList;
      this.name = name;
      this.textContent = textContent;
    }

    addChild(videoData: CreateVideoData, videoId: string): void {
      const idListForVideo = this.getIdList().concat(videoId);
      this.children.set(videoId, new Video(videoData, idListForVideo));
    };
    //TODO Подумать, что ещё у кого почистить с инфой об видео
    deleteChild(videoId: string): void {
      this.children.delete(videoId);
    };
    getAuthorId(): string {
      return this.idList[0];
    };
    getChild(videoId: string): Video {
      if (this.children.has(videoId)) {
        return <Video>this.children.get(videoId);
      }
      throw new Error(`videoId ${videoId} not found in children`);
    };
    getChildren(): Map<string, Video> {
      return this.children;
    };
    getCreateDate(): Date {
      return this.createDate;
    };
    getId():string {
      const list = this.getIdList();
      return list[list.length - 1];
    };
    getIdList(): string[]  {
      return this.idList;
    };
    getName(): string {
      return this.name;
    };
    getTextContent(): string {
      return this.textContent;
    };
    setName(name: string): void {
      this.name = name;
    };
    setTextContent(textContent: string): void {
      this.textContent = textContent;
    };
}
