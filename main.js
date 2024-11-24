const ROWS = 50
const COLS = 50

function cellId(row, col)
{
    return "cell-" + row + "-" + col
}

container = document.getElementById("container");

// create the world
for (let i = 0; i < ROWS; i++)
{
    let row = document.createElement("div")
    row.classList.add("grid-row")

    for (let j = 0; j < COLS; j++)
    {
        let cell = document.createElement("div")
        cell.classList.add("grid-cell")

        cell.addEventListener("click", toggleCell)

        cell.id = cellId(i, j);

        row.appendChild(cell)
    }

    container.appendChild(row);
}

function toggleCell(e)
{
    const source = event.target || event.srcElement;

    if (source.classList.contains("active"))
    {
        source.classList.remove("active");
    }
    else
    {
        source.classList.add("active");
    }
}

// set the initial state 
let worldMatrix = []

for (let i = 0; i < ROWS; i++)
{
    worldMatrix.push([])
    for (let j = 0; j < COLS; j++)
    {
        worldMatrix[i].push(0)
    }
}

console.log("initial state: ", worldMatrix)

updateCellValues(worldMatrix)

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

function getCellValue(row, col)
{
    cell = document.getElementById(cellId(row, col))

    return cell.classList.contains("active")
}

function updateCellValues(worldMatrix)
{
    for (let i = 0; i < worldMatrix.length; i++)
    {
        for (let j = 0; j < worldMatrix[i].length; j++)
        {
            setCellValue(i, j, worldMatrix[i][j])
        }
    }
}

function nextState_GameOfLife(row, col)
{
    current_state = getCellValue(row, col)

    alive_neightbours = 0

    cords = [
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1]
    ]

    for (let i = 0; i < cords.length; i++)
    {
        rowNew = row + cords[i][0]
        colNew = col + cords[i][1]
        
        if (rowNew < 0 || rowNew >= ROWS || colNew < 0 || colNew >= COLS)
        {
            continue;
        }

        if (getCellValue(rowNew, colNew))
        {
            alive_neightbours += 1
        }
    }

    console.log("alive neightbours: ", alive_neightbours)

    if (current_state && (alive_neightbours == 3 || alive_neightbours == 2)) // survives
    {
        return true;
    }

    if (alive_neightbours == 3) // reproduces
    {
        return true;
    }

    return false // every other cell dies
}

let INTERVAL_ID;

function startAutomata()
{
    INTERVAL_ID = setInterval(() => {
        newWorldMatrix = []

        for (let i = 0; i < ROWS; i++)
        {
            newWorldMatrix.push([])

            for (let j = 0; j < COLS; j++)
            {
                value = nextState_GameOfLife(i, j)

                newWorldMatrix[i].push(value)
            }
        }

        updateCellValues(newWorldMatrix)

    }, 500);
}

function stopAutomata()
{
    if (INTERVAL_ID)
    {
        clearInterval(INTERVAL_ID);
    }

    INTERVAL_ID = null;
}