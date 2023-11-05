import { useEffect, useRef, useState} from 'react';
import '../css/GameField.css'
import SmallGameField from './SmallGameField';
import SmallFieldRow from './SmallFieldRow';
import SmallBoard from '../js/SmallBoard';
function GameField(props){

    const [xMove, setxMove] = useState(false);
    const [curField, setCurField] = useState([-1, -1]);
    const [field, setField] = useState([[new SmallBoard(), new SmallBoard(), new SmallBoard()], [new SmallBoard(), new SmallBoard(), new SmallBoard()],[new SmallBoard(), new SmallBoard(), new SmallBoard()]]);
    const canvasRef = useRef(null)


    

    useEffect(()=>{
    },[])

    useEffect(()=>{
        if (props.resetGame){
            resetGame();
            props.setResetGame(false)
        }
    }, [props.resetGame])

    function setNextBoard(smallPos){
        if (!field[smallPos[0]][smallPos[1]].isFull() && field[smallPos[0]][smallPos[1]].won === null) {
            setCurField(smallPos);
            console.log(smallPos)
            return
        }
        else {
            for (let i = 0; i < 3; i++){
                for (let j = 0; j < 3; j++){
                    if (!field[i][j].isFull() && field[i][j].won === null) {
                        setCurField([i, j]);
                        return;
                    }
                }
            }
        }
    }

    function resetGame(){
        setField([[new SmallBoard(), new SmallBoard(), new SmallBoard()], [new SmallBoard(), new SmallBoard(), new SmallBoard()],[new SmallBoard(), new SmallBoard(), new SmallBoard()]]);
        canvasRef.current.classList.add("invisible");
        setCurField([-1, -1]);
        setxMove(false);
    }

    function checkIfGameOver(){
        let won = null;
        for (let i = 0; i < 3; i ++){
            if (field[i][0].won !== null && field[i][0].won === field[i][1].won && field[i][1].won === field[i][2].won) {
                canvasDrawLine([i,0], [i,2]);
                won = field[i][0].won;
            }
        }
        for (let i = 0; i < 3; i ++){
            if (field[0][i].won !== null && field[0][i].won === field[1][i].won && field[1][i].won === field[2][i].won) {
                canvasDrawLine([0, i], [2, i]);
                won = field[0][i].won;
            }
        }
        if (field[0][0].won !== null && field[0][0].won === field[1][1].won && field[1][1].won === field[2][2].won) {
            canvasDrawLine([0, 0], [2, 2]);
            won = field[0][0].won;
        }
        if (field[0][2].won !== null && field[0][2].won === field[1][1].won && field[1][1].won === field[2][0].won) {
            canvasDrawLine([0, 2], [2, 0]);
            won = field[0][2].won;

        }

        if (won !== null) props.setGameWinner(won);
    }
    
    


    function onClick(generalPos, smallPos){
        let copy = [...field]
        if (!copy[generalPos[0]][generalPos[1]].isEmpty(smallPos[0], smallPos[1])) return;
        if (curField[0] !== -1 && (curField[0] !== generalPos[0] || curField[1] !== generalPos[1])) return;
        copy[generalPos[0]][generalPos[1]].move(smallPos, xMove);
        setxMove(!xMove)

        setNextBoard(smallPos)
        checkIfGameOver();

        console.log(copy)

    }

    function canvasDrawLine(first, second){
        const canvas = canvasRef.current;
        canvas.classList.remove("invisible");
        void canvas.offsetWidth;
        const context = canvas.getContext("2d");
        context.lineWidth = 12;
        let width = canvas.width;
        let height = canvas.height;
        const widthP = width / 6;
        const heightP = height / 6;


        console.log(width);

        let verts = calculateVerts([widthP * (first[1]*2+1), heightP * (first[0]*2+1)], [widthP * (second[1]*2+1), heightP * (second[0]*2+1)])
        console.log(verts)


        let t = 1;
        function animate(){
            if(t<verts.length-1){ requestAnimationFrame(animate); }
            // draw a line segment from the last waypoint
            // to the current waypoint
            context.moveTo(verts[t-1]['x'],verts[t-1]['y']);
            context.lineTo(verts[t]['x'],verts[t]['y']);
            context.stroke();
            // increment "t" to get the next waypoint
            t++;
        }
        animate();

        


    }

    function calculateVerts(start, end){
        let verts = [];
        let xDif = end[0] - start[0];
        let yDif = end[1] - start[1];
        for (let i = 1; i < 100; i++){
            let x = start[0] + xDif * i / 100;
            let y = start[1] + yDif * i / 100;
            verts.push({"x": x, "y": y})
        }
        return verts;
    }

    return (
        <div className="game-field">
            
            <canvas width={1000} height={1000} ref={canvasRef} className='game-field-canvas invisible'></canvas>
            {field.map((el, ind) => <SmallFieldRow field={field} onClick={onClick} curField={curField} xMove={xMove} generalRow={ind} data={el}/>)}
        </div>
    )
}
export default GameField;