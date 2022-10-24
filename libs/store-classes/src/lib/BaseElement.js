export const CREATE_DATE = 'createDate';
export const ID = 'id';
export const ID_LIST = 'idList';
export const NAME = 'name';
export const TEXT_CONTENT = 'textContent';
/**
 * @type {{name: string, textContent: string, idList: number[], createDate: Date}}
 */
export const TChildDataConstructor = {[CREATE_DATE]: new Date() , [ID_LIST]: [0], [NAME]: '', [TEXT_CONTENT]: ''};
/**
 * @type {{name: string, textContent: string, id: number, createDate: Date}}
 */
export const TChildDataAddMethod = {[CREATE_DATE]: new Date() , [ID]: 0, [NAME]: '', [TEXT_CONTENT]: ''};

export class BaseElement {
  createDate = new Date();
  children = new Map();
  grades = { like: 0, dislike: 0 };
  name = '';
  textContent = '';
  /**
   * @param {{ idList: number[], createDate: Date, name: string, textContent: string}} childData
   */
  constructor(childData = TChildDataConstructor) {
    const fixedChildData = {...TChildDataConstructor, ...childData};
    const { idList, createDate, name, textContent } = fixedChildData;
    this.idList = idList;
    this.createDate = createDate;
    this.name = name;
    this.textContent = textContent;
  }
  /**
   * @param {{ id: number, createDate: Date, name: string, textContent: string}} childData
   * @param {{constructor: Function}} Constructor
   */
    addChild(Constructor, childData = TChildDataAddMethod) {
      const childId = TChildDataAddMethod[ID];
      const childIdList = this.getIdList().concat(childId);
    // @ts-ignore
      this.children.set(childId, new Constructor(childIdList, childData));
    }
  /**
   * @returns {number}
   */
  getAuthorId() {
      return this.idList[0];
    }
  /**
   * @param {{getName: Function}} userProfile
   * @returns {string}
   */
  getAuthorName(userProfile) {
      return userProfile.getName();
    }
  /**
   * @param {string} commentId
   * @returns {Map<string, Object>}
   */
  getChild(commentId) {
      if (this.children.has(commentId)) {
          return this.children.get(commentId);
      }
      throw new Error(`commentId ${commentId} not found in ${this.constructor.name}`);
    }
  /**
   * @returns {Map<string, Object>}
   */
  getChildren() {
      return this.children;
    }
  /**
   * @returns {Date}
   */
  getCreateDate() {
      return this.createDate;
    }
  /**
   * @param {{getVideoGrade: Function}} userProfile
   * @returns {string}
   */
  getGrade(userProfile) {
      return userProfile.getVideoGrade(this.getId());
    }
  /**
   * @returns {{like: number, dislike: number}}
   */
  getGrades() {
      return this.grades;
    }
  /**
   * @returns {number}
   */
  getId() {
      const list = this.getIdList();
      return list[list.length - 1];
    }
  /**
   * @returns {number[]}
   */
  getIdList() {
      return this.idList;
    }
  /**
   * @returns {string}
   */
  getName() {
      return this.name;
    }
  /**
   * @returns {string}
   */
  getTextContent() {
      return this.textContent;
    }
  /**
   * @param {{addVideoDisliked: Function}} userProfile
   */
  gradeDislike(userProfile) {
      this.grades.dislike += 1;
      userProfile.addVideoDisliked(this.getId());
    }
  /**
   * @param {{addVideoLiked: Function}} userProfile
   */
  gradeLike(userProfile) {
      this.grades.like += 1;
      userProfile.addVideoLiked(this.getId());
    }
  /**
   * @param {string} name
   */
  setName(name) {
      this.name = name;
    }
  /**
   * @param {string} textContent
   */
  setTextContent(textContent) {
        this.textContent = textContent;
    }
}
