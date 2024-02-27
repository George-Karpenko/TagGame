export class Cell {
  #tag;
  readonly x;
  readonly y;
  constructor(tag: Tag, x: number, y: number) {
    this.#tag = tag;
    this.x = x;
    this.y = y;
  }

  set tag(value: Tag) {
    this.#tag = value;
  }

  get tag() {
    return this.#tag;
  }
}
export class Tag {
  // TODO Замена value на index
  readonly value;
  readonly x;
  readonly y;
  constructor(value: number, x: number, y: number) {
    this.value = value;
    this.x = x;
    this.y = y;
  }
}
