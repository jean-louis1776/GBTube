import { Channel, CreateChannelData } from './Channel';

export class ChannelGroup {
  private children: Map<string, Channel> = new Map();
  private readonly idList: string[];

  constructor(idList: string[]) {
    this.idList = idList;
  }

  addChildren(channelData: CreateChannelData, channelId: string): void {
    const idListForChannel = this.getIdList().concat(channelId);
    this.children.set(channelId, new Channel(channelData, idListForChannel));
  };
  deleteChild(channelId: string): void {
    if (this.children.has(channelId)) {
      this.children.delete(channelId);
    }
    throw new Error(`channelId ${channelId} not found in ChannelGroup`);
  };
  getChild(channelId: string): Channel {
    if (this.children.has(channelId)) {
      return <Channel>this.children.get(channelId);
    }
    throw new Error(`channelId ${channelId} not found in ChannelGroup`);
  };
  getChildren(): Map<string, Channel> {
    return this.children;
  };
  getIdList(): string[] {
    return this.idList;
  };
}
