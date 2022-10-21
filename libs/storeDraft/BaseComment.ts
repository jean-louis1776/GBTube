import {Grades, User} from "./User";
import {UserProfileList} from "./UserProfileList";

export type CreateCommentData = { textContent: string };

export class BaseComment {
    private readonly createDate = new Date();
    private readonly idList: string[];
    private grades = { like: 0, dislike: 0 };
    private textContent: string;

    constructor(commentData: CreateCommentData, idList: string[]) {
      const { textContent } = commentData;
      this.idList = idList;
      this.textContent = textContent;
    };

    getAuthorId(): string {
      return this.idList[0];
    };
    getAuthorName(userProfileList: UserProfileList): string {
      return userProfileList.getUserProfile(this.getAuthorId()).getName();
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
