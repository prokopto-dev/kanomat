class ChessPiece {
    readonly pieceSymbols: { [Key:string] : string } = {
        'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔',
        'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚',
        'P': '♙', 'p': '♟'
    };
    
    
    constructor(
        public color: string,
        public type: string,
        public position: string,
        public id: string
    ) {}
}