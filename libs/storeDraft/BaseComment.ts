import {Grades, User} from "./User";
import {UserProfileList} from "./UserProfileList";
import {IdentsMasterComment} from "./MasterComment";

export type IdentsComment = IdentsMasterComment & { commentId: string };
export type CreateCommentData = IdentsComment & { textContent: string };

export class BaseComment {
    private readonly ident: IdentsComment = {
        commentId: '',
        masterCommentId: '',
        authorId: '',
        channelId: '',
        playListId: '',
        videoId: ''};
    private readonly authorId: string;
    private readonly createDate = new Date();
    private grades = {
        like: 0,
        dislike: 0,
    }
    private textContent: string;

    constructor(commentData: CreateCommentData) {
        const { commentId, authorId, textContent } = commentData;
        this.ident.commentId = commentId;
        this.authorId = authorId;
        this.textContent = textContent;
    };
    changeTextContent(text: string): void {
        this.textContent = text;
    };
    getAuthorId(): string {
        return this.authorId;
    };
    getAuthorName(userProfileList: UserProfileList): string {
        return userProfileList.getUserProfile(this.authorId).getName();
    };
    getCreateDate(): Date {
        return this.createDate;
    };
    getGrade(currentUserProfile: User): Grades {
        return currentUserProfile.getCommentGrade(this.ident.commentId);
    };
    getId(): string {
        return this.ident.commentId;
    };
    getTextContent(): string {
        return this.textContent;
    };
    gradeDislike(userProfileList: UserProfileList): void {
        this.grades.dislike += 1;
        userProfileList.getUserProfile(this.authorId).addCommentDisliked(this.ident.commentId);
    };
    gradeLike(userProfileList: UserProfileList): void {
        this.grades.like += 1;
        userProfileList.getUserProfile(this.authorId).addCommentLiked(this.ident.commentId);
    };
}