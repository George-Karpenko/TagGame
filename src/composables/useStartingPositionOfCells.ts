import { ref } from "vue";
import { Cell, Tag } from "@/Classes/Cell";

export default function useStartingPositionOfCells(
  countRow: number,
  countColumn: number
) {
  // const indexEmptyCell = ref(countRow * countColumn - 1);
  const indexEmptyCell = countRow * countColumn - 1;
  const gridCells = ref(createGridCells(countColumn, countRow, indexEmptyCell));
  const cells = gridCells.value.flat(1);
  const emptyCell = cells.find(
    (cell) =>
      cell.tag.imgX === countRow - 1 && cell.tag.imgY === countColumn - 1
  );

  // const emptyCell = undefined;
  if (emptyCell === undefined) {
    throw "Переменная emptyCell пустая";
  }

  return {
    emptyCell,
    gridCells,
  };
}

function createGridCells(
  countColumn: number,
  countRow: number,
  indexEmptyCell: number
) {
  const gridCells: Cell[][] = [];
  let cells = createCells(countColumn, countRow);
  cells = shuffleCells(cells, countColumn, countRow, indexEmptyCell);
  let i = 0;
  for (let x = 0; x < countColumn; x++) {
    gridCells.push([]);
    for (let y = 0; y < countRow; y++) {
      gridCells[x].push(cells[i]);
      i++;
    }
  }
  return gridCells;
}

function createCells(countColumn: number, countRow: number) {
  const cells = [];
  let i = 0;
  for (let x = 0; x < countColumn; x++) {
    for (let y = 0; y < countRow; y++) {
      cells.push(new Cell(i, x, y));
      i++;
    }
  }
  return cells;
}

function shuffleCells(
  cells: Cell[],
  countColumn: number,
  countRow: number,
  indexEmptyCell: number
): any {
  function shuffle(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  function isWinningPosition() {
    return arrayRandomIndexTags.every((element, index) => {
      return element === index;
    });
  }
  let arrayRandomIndexTags = [...Array(cells.length).keys()];
  arrayRandomIndexTags = shuffle(arrayRandomIndexTags);

  let k = 0;
  let tag = arrayRandomIndexTags.findIndex((i) => indexEmptyCell === i);

  if (
    countColumn % 2 === 0 &&
    (countRow - Math.floor(tag / countColumn)) % 2 === 0
  )
    k++;

  const CELLS_WITHOUT_EMPTY_CELL = arrayRandomIndexTags.filter(
    (i) => indexEmptyCell !== i
  );
  for (let i = 0; i < CELLS_WITHOUT_EMPTY_CELL.length; i++) {
    for (let j = i + 1; j < CELLS_WITHOUT_EMPTY_CELL.length; j++) {
      if (CELLS_WITHOUT_EMPTY_CELL[i] > CELLS_WITHOUT_EMPTY_CELL[j]) k++;
    }
  }
  if (k % 2 !== 0 || isWinningPosition())
    return shuffleCells(cells, countColumn, countRow, indexEmptyCell);

  const arrayTag: Tag[] = [];
  arrayRandomIndexTags.forEach((element, index) => {
    arrayTag.push(cells[index].tag);
    cells[index].tag = arrayTag[element] || cells[element].tag;
  });

  return cells;
}
