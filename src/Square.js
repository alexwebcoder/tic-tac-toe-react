// the value of each square is received as a prop from the parent
const Square = ({value, onSquareClick}) => {

    return (
        // we see this value rendered on the screen.
        <button className="square" onClick={onSquareClick}>{value}</button>
     );
}
 
export default Square;
