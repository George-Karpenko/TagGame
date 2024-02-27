import { Cell } from "@/Classes/Cell";

export default abstract class BaseMove {
  abstract emptyCell: Cell;
  abstract gridCells: Cell[][];
  checkMove(cell: Cell) {
    if (
      cell === this.emptyCell ||
      (cell.x !== this.emptyCell.x && cell.y !== this.emptyCell.y)
    ) {
      return false;
    }
    return true;
  }
}
