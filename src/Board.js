import Square from "./Square";
import { useState } from "react";

const Board = () => {
  //Each time a player moves, xIsNext (a boolean) will be flipped to determine which player goes next and the game’s state will be saved
  const [xIsNext, setXisNext] = useState(true); 
  // The Board needs to know the state of the 9 Square components. Therefore, the game's state is stored in the parent Board component. The parent then can pass state back down to the children via props. (Lifting State Up)
  //useState is the hook that returns two values. Squares is the variable that holds the current State and setSquares is the function that updates the state.

  //Array(9).fill(null) (Array constructor) creates an array with nine elements and sets each of them to null. (fill method changes all methods in the array to static value (in this case null)) The useState() call around it declares a squares state variable that’s initially set to that array. Each entry in the array corresponds to the value of a square. The board component will then pass the value prop down to each of the square components that it renders.
  const [squares, setSquares] = useState(Array(9).fill(null));

  //the squares variable will be assigned to the value property of each square component and the value property will be passed to the square component as a prop. So each square will receive a value prop of 'X' , 'O' or null. The other prop will be onSquareClick.

  // To let the players know when the game is over, you can display text such as “Winner: X” or “Winner: O”. To do that you’ll add a status section to the Board component. The status will display the winner if the game is over and if the game is ongoing you’ll display which player’s turn is next:
  
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" :  "O");
  }
   
  // JavaScript supports closures which means an inner function (e.g. handleClick) has access to variables and functions defined in a outer function (e.g. Board). The handleClick function can read the squares state and call the setSquares method because they are both defined inside of the Board function.
  const handleClick = (i) => {

    //you will call calculateWinner(squares) in the Board component’s handleClick function to check if a player has won. You can perform this check at the same time you check if a user has clicked a square that already has a X or and O. We’d like to return early in both cases:

    if(squares[i] || calculateWinner(squares)){
      //if a player has won or if a square has an x or o, we return the function early before it updates the state of the board.
      return;
    }
    //The handleClick function creates a copy of the squares array (nextSquares) with the JavaScript slice() Array method. Then, handleClick updates the nextSquares array to add X or O to the ([i] index) square.
    const nextSquares = squares.slice();
    if (xIsNext) {

      //the i arguemnt on the nextSquares variable takes the index of the square that should be updated
      nextSquares[i] = "X";

    } else {
      nextSquares[i] = "O";
    }
    //Calling the setSquares function lets React know the state of the component has changed. This will trigger a re-render of the components that use the squares state (Board) as well as its child components (the Square components that make up the board).
    setSquares(nextSquares);
    setXisNext(!xIsNext);
  }
  
    return ( 
        <>
          <div className="status">{status}</div>
          <div className="board-row">

            {/* value and onSquareClick will be passed to the child as a prop */}
            {/* handleClick is wrapped in an anonymous funcition to prevent multiple re renders, the arguement corresponds to the index of each square*/}

            {/* Clicking on the upper left square runs the function that the button received as its onClick prop from the Square. The Square component received that function as its onSquareClick prop from the Board. The Board component defined that function directly in the JSX. It calls handleClick with an argument of 0. */}
           {/* handleClick uses the argument (0) to update the first element of the squares array from null to X. */}
           {/* The squares state of the Board component was updated, so the Board and all of its children re-render. This causes the value prop of the Square component with index 0 to change from null to X */}


            <Square value={squares[0]} onSquareClick={()=>handleClick(0)} />
            <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
            <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
            <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
            <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
            <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
            <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
         </div>
        </>  
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
 
export default Board;