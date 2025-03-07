import { useState } from "react"
import './Board.css'
import { useEffect } from "react";

function Square({ value, onSquareClick }) {
    return (<button className='square' onClick={onSquareClick}>{value}</button>);
}

export default function Board() {
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);
    const [isNextX, setIsNextX] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState(null);
    const [click, setClick] = useState(0);

    function reset() {
        setSquares(Array(9).fill(null));
        setIsNextX(true);
        setWinner(null);
        setClick(0);
    }

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares))
            return;
        const nextSquares = squares.slice();
        if (isNextX) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        setIsNextX(!isNextX);
        setSquares(nextSquares);
        setClick(click + 1);
    }

    const currentWinner = calculateWinner(squares);
    useEffect(() => {
        if (currentWinner) {
            setWinner(currentWinner);
            (currentWinner === "X") ? setXWins(xWins + 1) : setOWins(oWins + 1);
        }
    }, [currentWinner]);

    let status;
    let pontuation = "X Wins: " + xWins + " / O Wins: " + oWins;
    if (currentWinner) {
        status = 'Winner: ' + currentWinner;
    } else {
        status = 'Next player: ' + (isNextX ? 'X' : 'O');
    }
    if (click >= 9) {
        status = 'Draw'
    } 

    return (
        <>
            <div className="status">
                {pontuation} <br />
                {status}
            </div>
            <div className='board-row'>
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className='board-row'>
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className='board-row'>
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
            <div className="buttons">
                <button className="game-button" onClick={reset}>Reset</button>
            </div>
        </>
    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}