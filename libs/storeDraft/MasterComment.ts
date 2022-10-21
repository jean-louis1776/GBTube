import {BaseComment, CreateCommentData} from "./BaseComment";
import { UserProfileList } from './UserProfileList';
import { Grades, User } from './User';

export type CreateMasterCommentData = { textContent: string };

export class MasterComment {
    private children: Map<string, BaseComment> = new Map();
    private readonly createDate = new Date();
    private readonly idList: string[];
    private grades = { like: 0, dislike: 0 };
    private textContent: string;

    constructor(masterCommentData: CreateMasterCommentData, idList: string[]) {
      const { textContent } = masterCommentData;
      this.textContent = textContent;
      this.idList = idList;
    }

    addChild(commentData: CreateCommentData, subCommentId: string): void {
      const idListForSubComment = this.getIdList().concat(subCommentId);
      this.children.set(subCommentId, new BaseComment(commentData, idListForSubComment));
    };
    getAuthorId(): string {
      return this.idList[0];
    };
    getAuthorName(userProfileList: UserProfileList): string {
      return userProfileList.getUserProfile(this.getAuthorId()).getName();
    };
    getChild(subCommentId: string): BaseComment {
      if (this.children.has(subCommentId)) {
        return <BaseComment>this.children.get(subCommentId);
      }
      throw new Error(`subCommentId ${subCommentId} not found in children`);
    };
    getChildren(): Map<string, BaseComment> {
      return this.children;
    };
    getCreateDate(): Date {
      return this.createDate;
    };
    getGrade(currentUserProfile: User): Grades {
      return currentUserProfile.getCommentGrade(this.getId());
    };
    getGrades(): {like: number, dislike: number} {
      return this.grades;
    };
    getId(): string {
      const list = this.getIdList();
      return list[list.length - 1];
    };
    getIdList(): string[] {
      return this.idList;
    };
    getTextContent(): string {
      return this.textContent;
    };
    gradeDislike(userProfileList: UserProfileList): void {
      this.grades.dislike += 1;
      userProfileList.getUserProfile(this.getAuthorId()).addCommentDisliked(this.getId());
    };
    gradeLike(userProfileList: UserProfileList): void {
      this.grades.like += 1;
      userProfileList.getUserProfile(this.getAuthorId()).addCommentLiked(this.getId());
    };
    setTextContent(text: string): void {
      this.textContent = text;
    };
}
