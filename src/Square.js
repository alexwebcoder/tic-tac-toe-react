const Square = ({ value }) => {
 
    const handleClick = ({value}) => {
       console.log('clickedddd');
    }

    return (
        <button className="square" onClick={handleClick}>{value}</button>
     );
}
 
export default Square;
