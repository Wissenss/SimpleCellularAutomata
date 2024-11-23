const ROWS = 20
const COLS = 20

function cellId(row, col)
{
    return "cell-" + row + "-" + col
}

container = document.getElementById("container");

for (let i = 0; i < ROWS; i++)
{
    let row = document.createElement("div")
    row.classList.add("grid-row")

    for (let j = 0; j < COLS; j++)
    {
        let cell = document.createElement("div")
        cell.classList.add("grid-cell")

        cell.id = cellId(i, j);

        row.appendChild(cell)
    }

    container.appendChild(row);
}

function setCellValue(row, col, value)
{
    cell = document.getElementById(cellId(row, col))

    if (value)
    {
        cell.classList.add("active");
    }
    else
    {
        cell.classList.remove("active");
    }
}