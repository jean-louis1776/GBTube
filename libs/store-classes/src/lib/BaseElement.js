export class BaseElement {
  createDate = new Date();
  children = new Map();
  grades = { like: 0, dislike: 0 };
  name = '';
  textContent = '';
  /**
   * @param {{name: string, textContent: string}} childData
   * @param {string[]} idList
   */
  constructor(idList, childData = {name: '', textContent: ''}) {
    const fixedChildData = {...{name: '', textContent: ''}, childData};
    const { name, textContent } = fixedChildData;
    this.idList = idList;
    this.name = name;
    this.textContent = textContent;
  }
  /**
   * @param {{name: string, textContent: string}} childData
   * @param {string} childId
   * @param {{constructor: Function}} Constructor
   */
    addChild(childId, Constructor, childData = {name: '', textContent: ''}) {
      const childIdList = this.getIdList().concat(childId);
    // @ts-ignore
      this.children.set(childId, new Constructor(childIdList, childData));
    }
  /**
   * @returns {string}
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
   * @returns {string}
   */
  getId() {
      const list = this.getIdList();
      return list[list.length - 1];
    }
  /**
   * @returns {string[]}
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
