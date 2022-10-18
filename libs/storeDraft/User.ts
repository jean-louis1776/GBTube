import {UserProfileList} from "./UserProfileList";
import {UserChannelGroupList} from "./UserChannelGroupList";

export const LIKE = 'like';
export const DISLIKE = 'dislike';
export const UNGRADED = 'ungraded';
export const ADMIN = '3';
export const MODERATOR = '2';
export const USER = '1';
const DEFAULT_PASSWORD = '1111';

export type Roles = /*ADMIN*/'3' | /*Moderator*/'2' | /*User*/'1';
export type Grades = 'like' | 'dislike' | 'ungraded';
export type UserRegData = { id: string, email: string, name: string }

//TODO подумать как сообщить, что пользователь не авторизован, и нужно ли оно вообще тут
export class User {
    private activeStatus = true;
    private email: string;
    private gradedUsersComments: { liked: Set<string>; disliked: Set<string>; } = {
        liked: new Set(),
        disliked: new Set(),
    };
    private gradedUsersVideos: { liked: Set<string>; disliked: Set<string>; } = {
        liked: new Set(),
        disliked: new Set(),
    };
    private readonly id: string;
    private name: string;
    private role = USER;
    //TODO вспомнить зачем оно нужно
    private subscribers: Set<string> = new Set();
    private subscriptions: Set<string> = new Set();
    constructor(personalData: UserRegData) {
        const {id, email, name} = personalData;
        this.id = id;
        this.email = email;
        this.name = name;
    }
    addCommentDisliked(commentId: string): void {
        this.gradedUsersVideos.disliked.add(commentId);
    };
    addCommentLiked(commentId: string): void {
        this.gradedUsersVideos.liked.add(commentId);
    };
    addVideoDisliked(videoId: string): void {
        this.gradedUsersVideos.disliked.add(videoId);
    };
    addVideoLiked(videoId: string): void {
        this.gradedUsersVideos.liked.add(videoId);
    };
    addSubscriber(subscriberId: string): void {
        this.subscribers.add(subscriberId);
    };
    changeEmail(email: string): void {
        this.email = email;
    }
    changeOwnRole(role: Roles): void {
        this.role = role;
    };
    changeName(name: string): void {
        this.name = name;
    };
    //TODO Подумать как инициировать смену пароля.
    changePassword(password: string): void {

    };
    getActiveStatus(): boolean {
        return this.activeStatus;
    };
    getEmail(): string {
        return this.email;
    };
    getVideosViewCount(userChannelGroupList: UserChannelGroupList): Map<string, number> {
        const videoViewCount: Map<string, number> = new Map();
        userChannelGroupList.getUserChannelGroup(this.id).forEach((channel) => {
            channel.getPlayLists().forEach((playList) => {
                playList.getVideoList().forEach((video) => {
                    videoViewCount.set(video.getId(), video.getViewingCount());
                });
            })
        });
        return videoViewCount;
    };
    getCommentsCount(userChannelGroupList: UserChannelGroupList): Map<string, number> {
        const commentCount: Map<string, number> = new Map();
        let counter = 0;
        userChannelGroupList.getUserChannelGroup(this.id).forEach((channel) => {
            channel.getPlayLists().forEach((playList) => {
                playList.getVideoList().forEach((video) => {
                    const videoId = video.getId();
                    video.getMasterCommentList().forEach((masterComment) => {
                        counter += 1;
                        masterComment.getSubCommentList().forEach((subcomment) => {
                            counter += 1;
                        });
                    });
                    commentCount.set(videoId, counter);
                    counter = 0;
                });
            })
        });
        return commentCount;
    };
    getGradedOwnVideosCount(userChannelGroupList: UserChannelGroupList): Map<string, {like: number, dislike: number}> {
        const videoGradeCount: Map<string, {like: number, dislike: number}> = new Map();
        userChannelGroupList.getUserChannelGroup(this.id).forEach((channel) => {
            channel.getPlayLists().forEach((playList) => {
                playList.getVideoList().forEach((video) => {
                    videoGradeCount.set(video.getId(), video.getGrades());
                });
            })
        });
        return videoGradeCount;
    };
    getId(): string {
        return this.id;
    };
    getName(): string {
        return this.name;
    }
    getRole(): string {
        return this.role;
    };
    getSubscribers(): Set<string> {
        return this.subscribers;
    };
    getSubscribersCount(): number {
        return this.subscribers.size;
    };
    getSubscriptions(): Set<string> {
        return this.subscriptions;
    };
    getCommentGrade(commentId: string): Grades {
        if (this.gradedUsersComments.disliked.has(commentId)) {
            return DISLIKE;
        }
        if (this.gradedUsersComments.liked.has(commentId)) {
            return LIKE;
        }
        return UNGRADED;
    };
    getVideoGrade(videoId: string): Grades {
        if (this.gradedUsersVideos.disliked.has(videoId)) {
            return DISLIKE;
        }
        if (this.gradedUsersVideos.liked.has(videoId)) {
            return LIKE;
        }
        return UNGRADED;
    };
    isSubscribed(userId: string): boolean {
        return this.subscriptions.has(userId);
    };
    subscribe(userId: string): void {
        this.subscriptions.add(userId);
    };
    unsubscribe(userId: string): void {
        this.subscriptions.delete(userId);
    };

    //Moderator methods
    //TODO Дописать методы модератора и админа
    toggleBanUser(userId: string): void {
        if (this.role === USER) {
            throw new Error('No previligies for this method');
        }
        this.activeStatus = !this.activeStatus;
    };
    deleteUserComment(userChannelGroupList: UserChannelGroupList, commentId: string): void {
        //TODO убрать в том числе из списка лайкнутых у пользователей

        // userChannelGroupList.getUserChannelGroup()
    };
    deleteUserVideo(videoId: string, authorId: string): void {
        //TODO убрать в том числе из списка лайкнутых у пользователей
        if (this.role === USER) {
            throw new Error('No previligies for this method');
        }
    };

    //Admin methods

    dropUserPassword(userProfileList: UserProfileList, userId: string): void {
        if (this.role !== ADMIN) {
            throw new Error('No previligies for method dropUserPassword');
        }
        //TODO Дождаться реализации функции смены пароля в контроллере
    };
    deleteUser(userProfileList: UserProfileList, userId: string): void {
        if (this.role !== ADMIN) {
            throw new Error('No previligies for method deleteUser');
        }
        userProfileList.deleteUserProfile(userId);
        //TODO убрать в том числе из списков подписанных.
    };
    changeUserRole(userProfileList: UserProfileList, userId: string, role: Roles): void {
        if (this.role !== ADMIN) {
            throw new Error('No previligies for method changeUserRole');
        }
        userProfileList.getUserProfile(userId).changeOwnRole(role);
    };

}