export class Cell {
  active = false;
  tag: Tag;
  constructor(
    public readonly index: number,
    public readonly x: number,
    public readonly y: number
  ) {
    this.tag = new Tag(x, y);
  }
}

export class Tag {
  constructor(readonly imgX: number, readonly imgY: number) {}
}
