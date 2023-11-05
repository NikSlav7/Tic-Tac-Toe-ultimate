import '../css/MainPage.css'
import GameField from './GameField';
import { useRef, useState } from 'react';
import Header from './Header';
function MainPage(){

    const [gameWinner, setGameWinner] = useState(null);
    const [resetGame, setResetGame] = useState(false);
    const winnerRef = useRef(null);


    function setNewGameWinner(xWon){
        setGameWinner(xWon);
        document.getElementById("main-page-winner-container").style['maxHeight'] = "30vh";
    }


    return (
        <div className="main-page-container">
            <Header />
            <div ref={winnerRef} id="main-page-winner-container" className='main-page-winner-container'>
                <div className='main-page-winner-text-container'>
                    <p className='main-page-winner-text'>Game Over!</p>
                </div>
                <div className='main-page-winner-buttons-container'>
                    <button className='main-page-winner-button' onClick={()=>setResetGame(true)}>Play Again</button>
                </div>
            </div>
            <GameField resetGame={resetGame} setResetGame={setResetGame} gameWinner={gameWinner} setGameWinner={setNewGameWinner}/>
        </div>
    )
}
export default MainPage;