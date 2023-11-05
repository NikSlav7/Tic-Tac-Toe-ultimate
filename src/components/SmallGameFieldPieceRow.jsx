import '../css/SmallGameFieldPiece.css'
import SmallGameFieldPiece from './SmallGameFieldPiece';
function SmallGameFieldPieceRow(props){

    return (
    <div className="small-game-field-piece-row">
        {props.data.map((el, ind) => <SmallGameFieldPiece  field={props.field} generalRow={props.generalRow} generalCol={props.generalCol} smallRow={props.smallRow} smallCol={ind} onClick={props.onClick} active={props.active}/>)}
    </div>)
}
export default SmallGameFieldPieceRow;