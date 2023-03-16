// You will now write a new top-level component called Game to display a list of past moves. That’s where you will place the history state that contains the entire game history.

// Placing the history state into the Game component will let you remove the squares state from its child Board component. Just like you “lifted state up” from the Square component into the Board component, you will now lift it up from the Board into the top-level Game component. This gives the Game component full control over the Board’s data and lets it instruct the Board to render previous turns from the history.


import { useState } from "react";

const Game = () => {
    // state for who is next
    const [xIsNext, setXisNext] = useState(true);
     // state for history of moves, which is  an array with each item as null
     const [history, setHistory] = useState([Array(9).fill(null)]);
    // The array is an array with a single item, which itself is an aray of 9 nulls. To render the squares for the current move, you’ll want to read the last squares array from the history' You don’t need useState for this—you already have enough information to calculate it during rendering:
    const currentSquares = history[history.length-1];

    //handlePlay will be called by the Board component to update the game
//     The Board component is fully controlled by the props passed to it by the Game component. You need to implement the handlePlay function in the Game component to get the game working again.

// What should handlePlay do when called? Remember that Board used to call setSquares with an updated array; now it passes the updated squares array to onPlay.

// The handlePlay function needs to update Game’s state to trigger a re-render, but you don’t have a setSquares function that you can call any more (commented out Board.js line 60)—you’re now using the history state variable to store this information. You’ll want to update history by appending the updated squares array as a new history entry. You also want to toggle xIsNext, just as Board used to do:
    const handlePlay = (nextSquares) => {
        setHistory([...history, nextSquares]);
        setXIsNext(!xIsNext);
    }

    return ( 
        <div className="game">
            <div className="game-board">
                {/* xIsNext, currentSquares and handlePlay are passed in as props to the Board component */}
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>
                    {/* TODO */}
                </ol>
            </div>
        </div>
     );
}

const calculateWinner = (squares) => {
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
 
export default Game;