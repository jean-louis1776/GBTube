import { ChannelGroup } from './ChannelGroup';

//TODO Проверить, что idList работает как надо
export class UserChannelGroupList {
    private children: Map<string, ChannelGroup> = new Map();
    addChild(authorId: string): void {
      this.children.set(authorId, new ChannelGroup([authorId]));
    };
    deleteChild(authorId: string): void {
      if (!this.children.has(authorId)) {
        throw new Error(`authorId ${authorId} not found in UserChannelGroupList`);
      }
      this.children.delete(authorId);
    };
    getChild(authorId: string): ChannelGroup {
        if (this.children.has(authorId)) {
            return <ChannelGroup>this.children.get(authorId);
        }
        throw new Error(`user ID ${authorId} not found in UserChannelGroupList`);
    };
    getChildren(): Map<string, ChannelGroup> {
      return this.children;
    }
}
