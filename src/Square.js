const Square = ({ value }) => {
 
    const handleClick = ({value}) => {
       console.log('clicked');
    }

    return (
        <button className="square" onClick={handleClick}>{value}</button>
     );
}
 
export default Square;
