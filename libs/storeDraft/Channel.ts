import {CreatePlayListData, PlayList} from "./PlayList";

export type CreateChannelData = { name: string, textContent: string }

export class Channel {
    private children: Map<string, PlayList> = new Map();
    private readonly createDate = new Date();
    private readonly idList: string[];
    private textContent: string;
    private name: string;

    constructor(channelData: CreateChannelData, idList: string[]) {
      this.idList = idList;
      const { name, textContent } = channelData;
      this.name = name;
      this.textContent = textContent;
    }

    addChild(playListData: CreatePlayListData, playListId: string): void {
      const idListForPlaylist = this.getIdList().concat(playListId);
      this.children.set(playListId, new PlayList(playListData, idListForPlaylist));
    };
    //TODO Подумать, что ещё у кого почистить с инфой об Playlists
    deleteChild(playListId: string): void {
      if (this.children.has(playListId)) {
        this.children.delete(playListId);
      }
      throw new Error(`playListId ${playListId} not found in Channel`);
    };
    getAuthorId(): string {
      return this.idList[0];
    };
    getChild(playListId: string): PlayList {
      if (this.children.has(playListId)) {
        return <PlayList>this.children.get(playListId);
      }
      throw new Error(`playListId ${playListId} not found in Channel`);
    };
    getChildren(): Map<string, PlayList> {
      return this.children;
    };
    getCreateDate(): Date {
      return this.createDate;
    };
    getId():string {
      return this.idList[this.idList.length - 1];
    };
    getIdList(): string[] {
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
