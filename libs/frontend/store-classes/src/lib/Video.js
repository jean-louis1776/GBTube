import { BaseElement } from './BaseElement';

export class Video extends BaseElement {
  /**
   * @type {Set<string>}
   */
  #hashTags = new Set();
  #viewingCount = 0;
  #ageLimit = 0;
  /**
   * @param {string} hashTag
   */
  addHashTag(hashTag) {
    if (!this.#hashTags.has(hashTag)) {
      this.#hashTags.add(hashTag);
    }
    throw new Error(`hashTag ${hashTag} already exist`);
  }
  increaseViewCount() {
    this.#viewingCount += 1;
  }
  /**
   * @returns {number}
   */
  getAgeLimit() {
    return this.#ageLimit;
  }
  /**
   * @returns {string[]}
   */
  getHashTag() {
    return Array.from(this.#hashTags);
  }
  /**
   * @returns {number}
   */
  getViewingCount() {
    return this.#viewingCount;
  }
  /**
   * @param {number} ageLimit
   */
  setAgeLimit(ageLimit) {
    this.#ageLimit = ageLimit;
  }
}
