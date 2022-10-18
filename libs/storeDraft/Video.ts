import {MasterComment} from "./MasterComment";
import {Grades, User} from "./User";
import {UserProfileList} from "./UserProfileList";
import {CreateCommentData} from "./BaseComment";
import {IdentsPlayList} from "./PlayList";

export type IdentsVideo = IdentsPlayList & {videoId: string};
export type CreateVideoData = IdentsVideo & { name: string, infoAbout: string }

export class Video {
    private readonly createDate = new Date();
    private grades = {
        like: 0,
        dislike: 0,
    };
    private idents: IdentsVideo = {videoId: '', authorId: '', playListId: '', channelId: ''};
    private infoAbout: string;
    private masterComments: Map<string, MasterComment> = new Map();
    private name: string;
    private viewingCount = 0;

    constructor(videoData: CreateVideoData) {
        const { videoId, authorId, name, infoAbout } = videoData;
        this.idents.videoId = videoId;
        this.idents.authorId = authorId;
        this.name = name;
        this.infoAbout = infoAbout;
    }
    createMasterComment(commentData: CreateCommentData): void {
        const {commentId} = commentData;
        this.masterComments.set(commentId, new MasterComment(commentData));
    };
    changeInfoAbout(newInfo: string): void {
        this.infoAbout = newInfo;
    };
    changeName(newName: string): void {
        this.name = newName;
    };
    increaseViewCount(): void {
        this.viewingCount += 1;
    };
    getAuthorId(): string {
        return this.idents.authorId;
    };
    getAuthorName(userProfileList: UserProfileList): string {
        return userProfileList.getUserProfile(this.idents.authorId).getName();
    };
    getCreateDate(): Date {
        return this.createDate;
    };
    getGrade(userProfile: User): Grades {
        return userProfile.getVideoGrade(this.idents.videoId);
    };
    getGrades(): {like: number, dislike: number} {
        return this.grades;
    }
    getId(): string {
        return this.idents.videoId;
    };
    getAllIdentsVideo(): IdentsVideo {
        return this.idents;
    }
    getInfoAbout(): string {
        return this.infoAbout;
    };
    getMasterCommentList(): Map<string, MasterComment> {
        return this.masterComments;
    };
    getMasterComment(commentId: string): MasterComment {
        if (this.masterComments.has(commentId)) {
            return <MasterComment>this.masterComments.get(commentId);
        }
        throw new Error(`commentId ${commentId} not found in masterComments`);
    };
    getName(): string {
        return this.name;
    };
    getViewingCount(): number {
        return this.viewingCount;
    }
    gradeDislike(userProfileList: UserProfileList): void {
        this.grades.dislike += 1;
        userProfileList.getUserProfile(this.idents.authorId).addVideoDisliked(this.idents.videoId);
    };
    gradeLike(userProfileList: UserProfileList): void {
        this.grades.like += 1;
        userProfileList.getUserProfile(this.idents.authorId).addVideoLiked(this.idents.videoId);
    };
}