
class SmallBoard{


    constructor(){
        this.won = null;
        this.board = [[null, null, null], [null, null, null],[null, null, null]]
    }

    move(pos, isX){
        this.board[pos[0]][pos[1]] = isX;

        let winner = this.checkWinner();
        if (winner !== undefined) this.won = winner;
        
    }

    isEmpty(x, y){
        return this.board[x][y] === null;
    }

    isX(x, y){
        if (this.board[x][y] === null) return undefined;
        return this.board[x][y];
    }


    isFull(){
        for (let i = 0; i < 3; i++){
            for (let j = 0; j <3; j++){
                if (this.board[i][j] === null) return false
            }
        }
        return true
    }


    checkWinner(){
        for (let i = 0; i < 3; i ++){
            if (this.board[i][0] !== null && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]) return this.board[i][0];
        }
        for (let i = 0; i < 3; i ++){
            if (this.board[0][i] !== null && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]) return this.board[0][i];
        }
        if (this.board[0][0] !== null && this.board[0][0] == this.board[1][1] && this.board[1][1] === this.board[2][2]) return  this.board[0][0];
        if (this.board[0][2] !== null && this.board[0][2] == this.board[1][1] && this.board[1][1] === this.board[2][0]) return  this.board[0][2];

        return null;
    }



     
} 
export default SmallBoard;