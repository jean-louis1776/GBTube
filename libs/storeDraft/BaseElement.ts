import { MasterComment } from './MasterComment';
import { CreateCommentData } from './BaseComment';
import { UserProfileList } from './UserProfileList';
import { Grades, User } from './User';
import { CreateVideoData } from './Video';



export class BaseElement<T> {
  private readonly createDate = new Date();
  private children: Map<string, T> = new Map();
  private grades = { like: 0, dislike: 0 };
  private hashTags: Set<string> = new Set();
  private readonly idList: string[];
  private name: string;
  private textContent: string;
  private viewingCount = 0;

  constructor(videoData: CreateVideoData, idList: string[]) {
    const { name, textContent } = videoData;
    this.idList = idList;
    this.name = name;
    this.textContent = textContent;
  }
  addChild(commentData: CreateCommentData, masterCommentId: string, Constructor: T): void {
    const idListForMasterComment = this.getIdList().concat(masterCommentId);
    if (Constructor.hasOwnProperty('constructor')) {
      this.children.set(masterCommentId, new Constructor(commentData, idListForMasterComment));
    }

  };
  addHashTag(hashTag: string): void {
    if (!this.hashTags.has(hashTag)) {
      this.hashTags.add(hashTag);
    }
    throw new Error(`hashTag ${hashTag} already exist`);
  }
  increaseViewCount(): void {
    this.viewingCount += 1;
  };
  getAuthorId(): string {
    return this.idList[0];
  };
  getAuthorName(userProfileList: UserProfileList): string {
    return userProfileList.getUserProfile(this.getAuthorId()).getName();
  };
  getChild(commentId: string): MasterComment {
    if (this.children.has(commentId)) {
      return <MasterComment>this.children.get(commentId);
    }
    throw new Error(`commentId ${commentId} not found in children`);
  };
  getChildren(): Map<string, T> {
    return this.children;
  };
  getCreateDate(): Date {
    return this.createDate;
  };
  getGrade(userProfile: User): Grades {
    return userProfile.getVideoGrade(this.getId());
  };
  getGrades(): {like: number, dislike: number} {
    return this.grades;
  };
  getHashTag(): string[] {
    return Array.from(this.hashTags);
  }
  getId(): string {
    const list = this.getIdList();
    return list[list.length - 1];
  };
  getIdList(): string[] {
    return this.idList;
  };
  getName(): string {
    return this.name;
  };
  getViewingCount(): number {
    return this.viewingCount;
  };
  getTextContent(): string {
    return this.textContent;
  };
  gradeDislike(userProfileList: UserProfileList): void {
    this.grades.dislike += 1;
    userProfileList.getUserProfile(this.getAuthorId()).addVideoDisliked(this.getId());
  };
  gradeLike(userProfileList: UserProfileList): void {
    this.grades.like += 1;
    userProfileList.getUserProfile(this.getAuthorId()).addVideoLiked(this.getId());
  };
  setName(newName: string): void {
    this.name = newName;
  };
  setTextContent(newInfo: string): void {
    this.textContent = newInfo;
  };
}
