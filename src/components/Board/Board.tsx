

class ChessBoard {
    board: (string | null)[][];

    constructor() {
        this.board = [];
        this.board = this.createBoard();
    }

    createBoard() {
        const board = [];
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                row.push(null);
            }
            board.push(row);
        }
        return board;
    }

    getBoard() {
        return this.board;
    }

    getPiece(row, col) {
        return this.board[row][col];
    }

    setPiece(row, col, piece) {
        this.board[row][col] = piece;
    }

    movePiece(fromRow, fromCol, toRow, toCol) {
        const piece = this.getPiece(fromRow, fromCol);
        this.setPiece(fromRow, fromCol, null);
        this.setPiece(toRow, toCol, piece);
    }

    resetBoard() {
        this.board = this.createBoard();
    }

    renderBoard() {
        return this.board.map((row, i) => {
            return (
                <div key={i} className="board-row">
                    {row.map((piece, j) => {
                        return (
                            <Square key={j} piece={piece} />
                        );
                    })}
                </div>
            );
        });
    }
}