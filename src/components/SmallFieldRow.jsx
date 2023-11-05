import '../css/SmallGameField.css'
import SmallGameField from './SmallGameField'
function SmallFieldRow(props){

    return (
    <div className='small-game-field-row'>
        {props.data.map((el, ind) => <SmallGameField field={props.field} generalRow={props.generalRow} generalCol={ind} onClick={props.onClick} active={props.curField[0] === -1 ||(props.curField[0] === props.generalRow && props.curField[1] === ind)}/>)}
    </div> 
    )
}
export default SmallFieldRow;