// the value of each square is received as a prop from the parent
const Square = ({value, onSquareClick}) => {

    return (
        // we see this value rendered on the screen. When clicking on a Square, the child Square component now asks the parent Board component to update the state of the board.
        <button className="square" onClick={onSquareClick}>{value}</button>
     );
}
 
export default Square;
