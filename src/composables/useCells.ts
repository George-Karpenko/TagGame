import { Cell, Tag } from "@/js/games/Class/Cell";
import { Ref, ref } from "vue";

export default function useCells(
  tagsColumns: number,
  tagsRows: number
): { cells: Ref<Cell[]> } {
  const cells = ref(createCellElements(tagsColumns, tagsRows));
  console.log(cells);
  console.log(cells.value);

  return { cells };
}

function createCellElements(tagsColumns: number, tagsRows: number) {
  const cells = [];
  for (let i = 0; i < tagsColumns * tagsRows; i++) {
    const X = i % tagsColumns;
    const Y = Math.floor(i / tagsColumns);
    cells.push(new Cell(new Tag(i, X, Y), X, Y));
  }
  return cells;
}
