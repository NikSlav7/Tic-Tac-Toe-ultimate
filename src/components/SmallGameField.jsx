import { useEffect, useRef, useState } from 'react';
import '../css/SmallGameField.css'
import SmallGameFieldPiece from './SmallGameFieldPiece';
import SmallFieldRow from './SmallFieldRow';
import SmallGameFieldPieceRow from './SmallGameFieldPieceRow';
function SmallGameField(props){

    const ref = useRef(null)

    useEffect(()=>{
        changeEdges()
    })


    const [field, setField] = useState([[null, null, null], [null, null, null],[null, null, null]]);
    function getImage(){
        return props.field[props.generalRow][props.generalCol].won ? require("../resources/cross.png") : require("../resources/circle.png")
    }
    function changeEdges(){
        if (props.generalRow === 0 && props.generalCol === 0) {
            ref.current.style['borderTopLeftRadius'] = "5vh";
        }
        if (props.generalRow === 0 && props.generalCol === 2) {
            ref.current.style['borderTopRightRadius'] = "5vh";
        }
        if (props.generalRow === 2 && props.generalCol === 0) {
            ref.current.style['borderBottomLeftRadius'] = "5vh";
        }
        if (props.generalRow === 2 && props.generalCol === 2) {
            ref.current.style['borderBottomRightRadius'] = "5vh";
        }
    }


    return (
        <div ref={ref} className="small-game-field-container">
            {props.field[props.generalRow][props.generalCol].won !== null && <div className='small-game-field-won-image-container'>
                <img className='small-game-field-won-image' src={getImage()}></img>
            </div>}
            
            <div className='small-game-field'>
                {field.map((el, ind) => <SmallGameFieldPieceRow  field={props.field} generalRow={props.generalRow} generalCol={props.generalCol} smallRow={ind}  onClick={props.onClick} active={props.active}  data={el}/>)}
            </div>
        </div>
    )
}
export default SmallGameField;