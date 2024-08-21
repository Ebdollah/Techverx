import React, { useState } from "react";
// let Board = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ];
export default function GameBoard({ onSelectSquare, Board }) {
  
  // let gameBoard = Board;
  // for(const turn of turns){
  //   const {square, player} = turn;
  //   const {row, col} = square;
  //   gameBoard[row][col] = player;
  // }
  // const [gameBoard, setGameBoard] = useState(Board);
  // function handleBoard(row, col) {
  //   setGameBoard((prevArray) => {
  //     const newBoard = [...prevArray.map((boardRows) => [...boardRows])];
  //     newBoard[row][col] = activePlayerSymbol;  // it is setting either X or O
  //     return newBoard;
  //   });
  //   onSelectSquare();
  // }
  return (
    <>
      <ol id="game-board">
        {Board.map((Row, Rowindex) => (
          <li key={Rowindex}>
            <ol>
              {Row.map((Players, ColIndex) => (
                <li key={ColIndex}>
                  <button onClick={()=>onSelectSquare(Rowindex,ColIndex )} disabled={Players != null}>
                    {Players}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}
