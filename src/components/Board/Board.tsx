import { ChessPiece } from '../Pieces/Pieces';

export class ChessBoard {
    board: (ChessPiece | null)[][];
    private board_render: HTMLElement;
    // The board is represented as a 2D array of strings
    readonly columns: string[] = ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
    readonly rows: string[] = ['8', '7', '6', '5', '4', '3', '2', '1'];
    // size in pixels of each square on the board
    square: number = 50;
    // orientation of the board, true for white, false for black
    orientation: boolean = true;

    constructor(container_id: string, size: number, orientation: string = 'white') {
        this.board = [];
        this.board = this.createBoard();
        // The square size is based on the total size of the board,
        // divided by 8 (the number of squares in a row and column.
        this.square = size/8;
        // Set the starting positions of the pieces on the board
        this.setStartingPositions();
        const _render = document.getElementById(container_id);
        if (!_render) {
            throw new Error('Render container not found');
        }
        this.board_render = _render;
        this.setupRender()
    }

    setupRender() : void {
        this.board_render.style.display = 'grid';
        this.board_render.style.gridTemplateColumns = `repeat(8, ${this.square}px)`;
        this.board_render.style.gridTemplateRows = `repeat(8, ${this.square}px)`;
        this.board_render.style.gap = '0px';
        this.board_render.style.border = '2px solid black';
    }

    createBoard() : (ChessPiece | null)[][] {
        let board: (ChessPiece | null)[][] = [];
        for (let i = 0; i < 8; i++) {
            board[i] = [];
            for (let j = 0; j < 8; j++) {
                board[i][j] = null;
            }
        }
        return board;
    }

    getPieceSize() : number {
        // The piece size is 80% of the square size
        // so that the pieces fit inside the squares
        // with some padding
        return this.square * 0.8;
    }

    getColumns() : string[] {
        // The rows are reversed if the board is oriented for black
        // so that the board is displayed correctly
        // regardless of the orientation (used just for rendering)
        if (this.orientation) {
            return this.columns;
        }
        return this.columns.reverse();
    }

    getRows() : string[] {
        // The rows are reversed if the board is oriented for black
        // so that the board is displayed correctly
        // regardless of the orientation (used just for rendering)
        if (this.orientation) {
            return this.rows;
        }
        return this.rows.reverse();
    }

    getBoardPosition(string: string) : { row: number, column: number } {
        // take a string like a1 and return the row and column in the
        // internal 2d array representation, returned as an object
        // with row and column properties
        let column = this.columns.indexOf(string[0]);
        let row = this.rows.indexOf(string[1]);
        return { row, column };
    }

    setStartingPositions() : void {
        // Two arrays of pieces, one for white and one for black
        // Each piece is represented as an array with the color,
        // type, and position of the piece
        let blackpieces: [string, string, string][];
        let whitepieces: [string, string, string][];

        blackpieces = [
            ['black', 'r', 'a8'],
            ['black', 'n', 'b8'],
            ['black', 'b', 'c8'],
            ['black', 'q', 'd8'],
            ['black', 'k', 'e8'],
            ['black', 'b', 'f8'],
            ['black', 'n', 'g8'],
            ['black', 'r', 'h8'],
            ['black', 'p', 'a7'],
            ['black', 'p', 'b7'],
            ['black', 'p', 'c7'],
            ['black', 'p', 'd7'],
            ['black', 'p', 'e7'],
            ['black', 'p', 'f7'],
            ['black', 'p', 'g7'],
            ['black', 'p', 'h7']
        ];

        whitepieces = [
            ['white', 'r', 'a1'],
            ['white', 'n', 'b1'],
            ['white', 'b', 'c1'],
            ['white', 'q', 'd1'],
            ['white', 'k', 'e1'],
            ['white', 'b', 'f1'],
            ['white', 'n', 'g1'],
            ['white', 'r', 'h1'],
            ['white', 'p', 'a2'],
            ['white', 'p', 'b2'],
            ['white', 'p', 'c2'],
            ['white', 'p', 'd2'],
            ['white', 'p', 'e2'],
            ['white', 'p', 'f2'],
            ['white', 'p', 'g2'],
            ['white', 'p', 'h2']
        ];

        // Loop through the black pieces and add them to the board
        for (let i = 0; i < blackpieces.length; i++) {
            let piece = blackpieces[i];
            let position = this.getBoardPosition(piece[2]);
            this.board[position.row][position.column] = new ChessPiece(piece[0], piece[1], piece[2]);
        }
    }

    isSquareBlack(column: number, row: number) : boolean {
        // Check if a square is black or white
        return (column + row) % 2 === 1;
    }

    getBoard() : (ChessPiece | null)[][] {
        return this.board;
    }

    renderBoard() : void {
        for (let j = 0; j < this.rows.length; j++) {
            for (let i = 0; i < this.columns.length; i++ ) {
                let square = document.createElement('div');
                square.style.width = this.square + 'px';
                square.style.height = this.square + 'px';
                square.style.textAlign = 'center';
                square.style.lineHeight = this.square + 'px';
                square.style.fontSize = this.getPieceSize() + 'px';
                square.style.color = this.isSquareBlack(i, j) ? 'black' : 'white';
                square.style.backgroundColor = this.isSquareBlack(i, j) ? 'black' : 'white';
                square.style.border = '1px solid black';
                if (this.board[j][i]) {
                    let piece = document.createElement('div');
                    piece.style.display = 'flex';
                    piece.style.justifyContent = 'center';
                    piece.style.alignItems = 'center';
                    piece.style.width = this.getPieceSize() + 'px';
                    piece.style.height = this.getPieceSize() + 'px';
                    piece.textContent = this.board[j][i].getSymbol();
                    piece.style.color = this.board[j][i].color;
                    piece.style.backgroundColor = 'transparent';
                    piece.style.webkitTextStroke = '1px ' + this.isSquareBlack(i, j) ? 'white' : 'black';
                    square.appendChild(piece);           
                }
                this.board_render.appendChild(square);
            }
        }   
    }

}