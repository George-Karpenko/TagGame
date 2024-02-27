import { Cell } from "@/Classes/Cell";

export default class ShortMoves {
  constructor(readonly gridCells: Cell[][], public emptyCell: Cell) {}

  checkMoves() {
    this.gridCells.forEach((cells) =>
      cells.forEach((cell) => {
        if (
          cell === this.emptyCell ||
          (cell.x !== this.emptyCell.x && cell.y !== this.emptyCell.y)
        ) {
          return;
        }
        cell.active = true;
      })
    );
  }
  get cellsByRow(): Cell[][] {
    return Object.keys(this.gridCells[0]).map((index) => {
      return this.gridCells.map((row) => row[Number(index)]);
    });
  }
  private arrayShiftToRight(cells: Cell[]) {
    this.emptyCell = cells[0];
    let tag = cells[cells.length - 1].tag;
    for (let index = cells.length - 1; index > 0; index--) {
      cells[index].tag = cells[index - 1].tag;
    }
    cells[0].tag = tag;
  }
  move(cell: Cell) {
    if (this.emptyCell.y > cell.y) {
      this.arrayShiftToRight(
        this.gridCells[cell.x].slice(cell.y, this.emptyCell.y + 1)
      );
    }
    if (this.emptyCell.y < cell.y) {
      this.arrayShiftToRight(
        this.gridCells[cell.x].slice(this.emptyCell.y, cell.y + 1).reverse()
      );
    }
    if (this.emptyCell.x > cell.x) {
      this.arrayShiftToRight(
        this.cellsByRow[cell.y].slice(cell.x, this.emptyCell.x + 1)
      );
    }
    if (this.emptyCell.x < cell.x) {
      this.arrayShiftToRight(
        this.cellsByRow[cell.y].slice(this.emptyCell.x, cell.x + 1).reverse()
      );
    }
  }
}
