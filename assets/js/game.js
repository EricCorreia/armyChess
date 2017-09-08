var NUMBER_OF_ROWS = 16;
var BLOCK_COLOUR_1 = 'black';
var BLOCK_COLOUR_2 = 'white';

function draw()
{
    canvas = document.getElementById('chess');

    if(canvas.getContext)
    {
        ctx = canvas.getContext('2d');

        BLOCK_SIZE = canvas.height / NUMBER_OF_ROWS;

        drawBoard();

        defaultPositions();

        pieces = new Image();
        pieces.src = 'pieces.png';
        pieces.onload = drawPieces;

        canvas.addEventListener('click', board_click, false);
    }
    else
    {
        alert("Canvas not supported!");
    }
}

function drawBoard()
{
    for(iRowCounter = 0; iRowCounter < NUMBER_OF_ROWS; iRowCounter++)
    {
        drawRow(iRowCounter);
    }

    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, NUMBER_OF_ROWS * BLOCK_SIZE, NUMBER_OF_COLS * BLOCK_SIZE);
}

function drawRow(iRowCounter)
{
    for(iBlockCounter = 0; iBlockCounter < NUMBER_OF_ROWS; iBlockCounter++)
    {
        drawBlock(iRowCounter, iBlockCounter);
    }
}

function drawBlock(iRowCounter, iBlockCounter)
{
    ctx.fillStyle = getBlockColour(iRowCounter, iBlockCounter);


    ctx.fillRect(iRowCounter * BLOCK_SIZE, iBlockCounter * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

    ctx.stroke();
}

function getBlockColour(iRowCounter, iBlockCounter)
{
    var cStartColour;

    if(iRowCounter % 2)
        cStartColour = (iBlockCounter % 2?BLOCK_COLOUR_1:BLOCK_COLOUR_2);
    else
        cStartColour = (iBlockCounter % 2?BLOCK_COLOUR_2:BLOCK_COLOUR_1);

    return cStartColour;
}
