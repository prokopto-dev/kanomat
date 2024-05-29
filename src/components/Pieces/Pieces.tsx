export class ChessPiece {
    readonly pieceSymbols: { [Key:string] : string } = {
        'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔',
        'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚',
        'P': '♙', 'p': '♟'
    };
    
    
    constructor(
        public color: string,
        public type: string,
        public id: string
    ) {}

    getSymbol() : string {
        let _type: string = this.color === 'white' ? this.type.toUpperCase() : this.type.toLowerCase();
        return this.pieceSymbols[_type];
    }

}