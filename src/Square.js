const Square = ({ value }) => {
 
    const handleClick = ({value}) => {
       console.log('click me');
    }

    return (
        <button className="square" onClick={handleClick}>{value}</button>
     );
}
 
export default Square;
