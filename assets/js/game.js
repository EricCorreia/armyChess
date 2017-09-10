var numOfCol = 9,
		numOfRows = 9,
		blockSize = 100;

var blockColor1 = '#AB6D4C',
		blockColor2 = '#543525',
		highlightColor = 'red';

var piecePositions = null;

var PIECE_PAWN = 0,
		PIECE_CASTLE = 1,
		PIECE_ROUKE = 2,
		PIECE_BISHOP = 3,
		PIECE_QUEEN = 4,
		PIECE_KING = 5,
		IN_PLAY = 0,
		TAKEN = 1,
		pieces = null,
		ctx = null,
		json = null,
		canvas = null,
		secoundPlayer = 0,
		firstPlayer = 1,
		selectLineWidth = 5,
		currentTurn = firstPlayer,
		selectedPiece = null;

function screenToBlock(x, y) {
	var block =  {
		"row": Math.floor(y / blockSize),
		"col": Math.floor(x / blockSize)
	};

	return block;
}

function getPieceAtBlockForTeam(teamOfPieces, clickedBlock) {

	var curPiece = null,
		iPieceCounter = 0,
		pieceAtBlock = null;

	for (iPieceCounter = 0; iPieceCounter < teamOfPieces.length; iPieceCounter++) {

		curPiece = teamOfPieces[iPieceCounter];

		if (curPiece.status === IN_PLAY &&
				curPiece.col === clickedBlock.col &&
				curPiece.row === clickedBlock.row) {
				curPiece.position = iPieceCounter;

			pieceAtBlock = curPiece;
			iPieceCounter = teamOfPieces.length;
		}
	}

	return pieceAtBlock;
}

function blockOccupiedByEnemy(clickedBlock) {
	var team = (currentTurn === secoundPlayer ? json.white : json.black);

	return getPieceAtBlockForTeam(team, clickedBlock);
}


function blockOccupied(clickedBlock) {
	var pieceAtBlock = getPieceAtBlockForTeam(json.black, clickedBlock);

	if (pieceAtBlock === null) {
		pieceAtBlock = getPieceAtBlockForTeam(json.white, clickedBlock);
	}

	return (pieceAtBlock !== null);
}

function canPawnMoveToBlock(selectedPiece, clickedBlock, enemyPiece) {
	var iRowToMoveTo = (currentTurn === firstPlayer ? selectedPiece.row + 1 : selectedPiece.row - 1),
			bAdjacentEnemy = (clickedBlock.col === selectedPiece.col - 1 ||
						clickedBlock.col === selectedPiece.col + 1) &&
						enemyPiece !== null,
			bNextRowEmpty = (clickedBlock.col === selectedPiece.col &&
						blockOccupied(clickedBlock) === false);

			console.log(selectedPiece);
			console.log(clickedBlock);


	return clickedBlock.row === iRowToMoveTo &&
			(bNextRowEmpty === true || bAdjacentEnemy === true);
}

function canCastleMoveToBlock(selectedPiece, clickedBlock, enemyPiece) {
	var iColToMoveTo = (currentTurn === firstPlayer ? clickedBlock.col : clickedBlock.col);
	var	bNextColEmpty = (clickedBlock.row === selectedPiece.row && blockOccupied(clickedBlock) === false);
	var iRowToMoveTo = (currentTurn === firstPlayer ? clickedBlock.row : clickedBlock.row);
	var bNextRowEmpty = (clickedBlock.col === selectedPiece.col && blockOccupied(clickedBlock) === false);

	if (!enemyPiece){
				return clickedBlock.col === iColToMoveTo &&
						(bNextColEmpty === true) ||
							 clickedBlock.row === iRowToMoveTo &&
							 		(bNextRowEmpty === true ) ||

			 } else {
				 console.log("I can not let you do that dave")
			 }

	}

function canQueenMoveToBlock(selectedPiece, clickedBlock, enemyPiece) {
	var iColToMoveTo = (currentTurn === firstPlayer ? clickedBlock.col : clickedBlock.col);
	var	bNextColEmpty = (clickedBlock.row === selectedPiece.row && blockOccupied(clickedBlock) === false);
	var iRowToMoveTo = (currentTurn === firstPlayer ? clickedBlock.row : clickedBlock.row);
	var bNextRowEmpty = (clickedBlock.col === selectedPiece.col && blockOccupied(clickedBlock) === false);

	if (!enemyPiece){
				return clickedBlock.col === iColToMoveTo &&
						(bNextColEmpty === true) ||
							 clickedBlock.row === iRowToMoveTo &&
							 		(bNextRowEmpty === true )
			 } else {
				 console.log("I can not let you do that dave")
			 }

	}

function canBishopMoveToBlock(selectedPiece, clickedBlock, enemyPiece) {
	var iColToMoveTo = (currentTurn === firstPlayer ? clickedBlock.col : clickedBlock.col);
	var	bNextColEmpty = (clickedBlock.row === selectedPiece.row && blockOccupied(clickedBlock) === false);
	var iRowToMoveTo = (currentTurn === firstPlayer ? clickedBlock.row : clickedBlock.row);
	var bNextRowEmpty = (clickedBlock.col === selectedPiece.col && blockOccupied(clickedBlock) === false);

	if (!enemyPiece){
				return clickedBlock.col === iColToMoveTo &&
						(bNextColEmpty === true) ||
							 clickedBlock.row === iRowToMoveTo &&
							 		(bNextRowEmpty === true ) ||

			 } else {
				 console.log("I can not let you do that dave")
			 }

	}

function canSelectedMoveToBlock(selectedPiece, clickedBlock, enemyPiece) {
	var bCanMove = false;

	switch (selectedPiece.piece) {

	case PIECE_PAWN:

		bCanMove = canPawnMoveToBlock(selectedPiece, clickedBlock, enemyPiece);

		break;

	case PIECE_CASTLE:

		bCanMove = canCastleMoveToBlock(selectedPiece, clickedBlock, enemyPiece);

		break;

	case PIECE_ROUKE:

		bCanMove = canRoukeMoveToBlock(selectedPiece, clickedBlock, enemyPiece);

		break;

	case PIECE_BISHOP:

		bCanMove = canBishopMoveToBlock(selectedPiece, clickedBlock, enemyPiece);

		break;

	case PIECE_QUEEN:

		bCanMove = canQueenMoveToBlock(selectedPiece, clickedBlock, enemyPiece);

		break;

	case PIECE_KING:

		bCanMove = canKingMoveToBlock(selectedPiece, clickedBlock, enemyPiece);

		break;
	}

	return bCanMove;
}

function getPieceAtBlock(clickedBlock) {

	var team = (currentTurn === secoundPlayer ? json.black : json.white);

	return getPieceAtBlockForTeam(team, clickedBlock);
}

function getBlockColour(iRowCounter, iBlockCounter) {
	var cStartColour;

	if (iRowCounter % 2) {
		cStartColour = (iBlockCounter % 2 ? blockColor1 : blockColor2);
	} else {
		cStartColour = (iBlockCounter % 2 ? blockColor2 : blockColor1);
	}

	return cStartColour;
}

function drawBlock(iRowCounter, iBlockCounter) {

	ctx.fillStyle = getBlockColour(iRowCounter, iBlockCounter);

	ctx.fillRect(iRowCounter * blockSize, iBlockCounter * blockSize,
		blockSize, blockSize);

	ctx.stroke();
}

function getImageCoords(pieceCode, bBlackTeam) {

	var imageCoords =  {
		"x": pieceCode * blockSize,
		"y": (bBlackTeam ? 0 : blockSize)
	};

	return imageCoords;
}

function drawPiece(curPiece, bBlackTeam) {

	var imageCoords = getImageCoords(curPiece.piece, bBlackTeam);


	ctx.drawImage(pieces,
		imageCoords.x, imageCoords.y,
		blockSize, blockSize,
		curPiece.col * blockSize, curPiece.row * blockSize,
		blockSize, blockSize);
}

function removeSelection(selectedPiece) {
	drawBlock(selectedPiece.col, selectedPiece.row);
	drawPiece(selectedPiece, (currentTurn === secoundPlayer));
}

function drawTeamOfPieces(teamOfPieces, bBlackTeam) {
	var iPieceCounter;

	for (iPieceCounter = 0; iPieceCounter < teamOfPieces.length; iPieceCounter++) {
		drawPiece(teamOfPieces[iPieceCounter], bBlackTeam);
	}
}

function drawPieces() {
	drawTeamOfPieces(json.black, true);
	drawTeamOfPieces(json.white, false);
}

function drawRow(iRowCounter) {
	var iBlockCounter;

	for (iBlockCounter = 0; iBlockCounter < numOfRows; iBlockCounter++) {
		drawBlock(iRowCounter, iBlockCounter);
	}
}

function drawBoard() {
	var iRowCounter;

	for (iRowCounter = 0; iRowCounter < numOfRows; iRowCounter++) {
		drawRow(iRowCounter);
	}

	ctx.lineWidth = 3;
	ctx.strokeRect(0, 0,
		numOfRows * blockSize,
		numOfCol * blockSize);
}

function defaultPositions() {
	json = {
		"white":
			[
				{
					"piece": PIECE_CASTLE,
					"row": 0,
					"col": 0,
					"status": IN_PLAY,
					"wound": 10,
					"damage": 7,
					"armor": 3
				},
				{
					"piece": PIECE_ROUKE,
					"row": 0,
					"col": 1,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_BISHOP,
					"row": 0,
					"col": 2,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_KING,
					"row": 0,
					"col": 3,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_QUEEN,
					"row": 0,
					"col": 4,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_BISHOP,
					"row": 0,
					"col": 5,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_ROUKE,
					"row": 0,
					"col": 6,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_CASTLE,
					"row": 0,
					"col": 7,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_PAWN,
					"row": 1,
					"col": 0,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_PAWN,
					"row": 1,
					"col": 1,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_PAWN,
					"row": 1,
					"col": 2,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_PAWN,
					"row": 1,
					"col": 3,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_PAWN,
					"row": 1,
					"col": 4,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_PAWN,
					"row": 1,
					"col": 5,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_PAWN,
					"row": 1,
					"col": 6,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_PAWN,
					"row": 1,
					"col": 8,
					"status": IN_PLAY
				}
			],
		"black":
			[
				{
					"piece": PIECE_CASTLE,
					"row": 8,
					"col": 0,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_ROUKE,
					"row": 7,
					"col": 1,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_BISHOP,
					"row": 7,
					"col": 2,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_KING,
					"row": 7,
					"col": 3,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_QUEEN,
					"row": 7,
					"col": 4,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_BISHOP,
					"row": 7,
					"col": 5,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_ROUKE,
					"row": 7,
					"col": 6,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_CASTLE,
					"row": 7,
					"col": 7,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_PAWN,
					"row": 6,
					"col": 0,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_PAWN,
					"row": 6,
					"col": 1,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_PAWN,
					"row": 6,
					"col": 2,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_PAWN,
					"row": 6,
					"col": 3,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_PAWN,
					"row": 6,
					"col": 4,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_PAWN,
					"row": 6,
					"col": 5,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_PAWN,
					"row": 6,
					"col": 6,
					"status": IN_PLAY
				},
				{
					"piece": PIECE_PAWN,
					"row": 6,
					"col": 7,
					"status": IN_PLAY
				}
			]
	};
}

function selectPiece(pieceAtBlock) {
	// Draw outline
	ctx.lineWidth = selectLineWidth;
	ctx.strokeStyle = highlightColor;
	ctx.strokeRect((pieceAtBlock.col * blockSize) + selectLineWidth,
		(pieceAtBlock.row * blockSize) + selectLineWidth,
		blockSize - (selectLineWidth * 2),
		blockSize - (selectLineWidth * 2));

	selectedPiece = pieceAtBlock;
}

function checkIfPieceClicked(clickedBlock) {
	var pieceAtBlock = getPieceAtBlock(clickedBlock);

	if (pieceAtBlock !== null) {
		selectPiece(pieceAtBlock);
	}
}

function movePiece(clickedBlock, enemyPiece) {
	drawBlock(selectedPiece.col, selectedPiece.row);

	var team = (currentTurn === firstPlayer ? json.white : json.black),
		opposite = (currentTurn !== firstPlayer ? json.white : json.black);

	team[selectedPiece.position].col = clickedBlock.col;
	team[selectedPiece.position].row = clickedBlock.row;

	if (enemyPiece !== null) {
		drawBlock(enemyPiece.col, enemyPiece.row);
		opposite[enemyPiece.position].status = TAKEN;
	}

	drawPiece(selectedPiece, (currentTurn === secoundPlayer));

	currentTurn = (currentTurn === firstPlayer ? secoundPlayer : firstPlayer);

	selectedPiece = null;
}

function processMove(clickedBlock) {
	var pieceAtBlock = getPieceAtBlock(clickedBlock),
		enemyPiece = blockOccupiedByEnemy(clickedBlock);

	if (pieceAtBlock !== null) {
		removeSelection(selectedPiece);
		checkIfPieceClicked(clickedBlock);
	} else if (canSelectedMoveToBlock(selectedPiece, clickedBlock, enemyPiece) === true) {
		movePiece(clickedBlock, enemyPiece);
	}
}

function board_click(ev) {
	var x = ev.clientX - canvas.offsetLeft,
		y = ev.clientY - canvas.offsetTop,
		clickedBlock = screenToBlock(x, y);

	if (selectedPiece === null) {
		checkIfPieceClicked(clickedBlock);
	} else {
		processMove(clickedBlock);
	}
}

function draw() {

	canvas = document.getElementById('chess');

	if (canvas.getContext) {
		ctx = canvas.getContext('2d');

		blockSize = canvas.height / numOfRows;

		drawBoard();

		defaultPositions();

		pieces = new Image();
		pieces.src = './assets/images/pieces.png';
		pieces.onload = drawPieces;

		canvas.addEventListener('click', board_click, false);
	} else {
		alert("Canvas not supported!");
	}
}
