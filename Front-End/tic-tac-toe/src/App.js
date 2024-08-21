import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import React, { useState } from "react";
import {WINNING_COMBINATIONS} from './components/WINNING_COMBINATIONS';

let Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function currentActivePlayer(gameTurns){
  

  let currentPlayer = 'X';
      if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O'
      }
      return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = currentActivePlayer(gameTurns);

  let gameBoard = Board;
  for(const turn of gameTurns){
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col] = player;
  }
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = firstSquareSymbol;
    }
  }

  // const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((prev) => (prev === "X" ? "O" : "X"));  
    setGameTurns((prevTurn)=> {
      // let currentPlayer = 'X';
      // if(prevTurn.length > 0 && prevTurn[0].player === 'X'){
      //   currentPlayer = 'O'
      // }
      const currentPlayer = currentActivePlayer(prevTurn);
      const updatedTurns = [
        { square: {row: rowIndex, col: colIndex}, player : currentPlayer},
        ...prevTurn
      ]
      return updatedTurns;
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={"Abdullah"}
            symbol={"X"}
            isActive={activePlayer === "X"}
          />
          <Player
            name={"Musafir"}
            symbol={"O"}
            isActive={activePlayer === "O"}
          />
        </ol>
        {winner && <p>You won!</p>}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          // activePlayerSymbol={activePlayer}
          // turns={gameTurns}
          Board={gameBoard}
        />
      </div>
      <Log logs={gameTurns}/>
    </main>
  );
}

export default App;
