import {BaseComment, CreateCommentData} from "./BaseComment";
import {IdentsVideo} from "./Video";

export type IdentsMasterComment = IdentsVideo & { masterCommentId: string }
export type CreateMasterCommentData = IdentsMasterComment & { textContent: string };


export class MasterComment extends BaseComment {
    idents: IdentsMasterComment = {masterCommentId: '', authorId: '', channelId: '', playListId: '', videoId: ''};
    commentList: Map<string, BaseComment> = new Map();
    constructor(masterCommentData: CreateMasterCommentData) {
        super();
        //TODO Переделать цепочку идентификаторов на список и назвать одним именем метод для добычи вложенного
    }
    addSubComment(commentData: CreateCommentData): void {
        const {commentId} = commentData;
        this.commentList.set(commentId, new BaseComment(commentData))
    };
    getAllIdents(): IdentsMasterComment {
        return this.idents;
    }
    getSubCommentList(): Map<string, BaseComment> {
        return this.commentList;
    };
    getSubComment(subCommentId: string): BaseComment {
        if (this.commentList.has(subCommentId)) {
            return <BaseComment>this.commentList.get(subCommentId);
        }
        throw new Error(`subCommentId ${subCommentId} not found in commentList`);
    }
}
