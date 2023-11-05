import { useEffect, useRef } from 'react';
import '../css/SmallGameFieldPiece.css'
function SmallGameFieldPiece(props){

    const ref = useRef(null)

    useEffect(()=>{
        changeEdges();
    },[])


    function onClick(){
        props.onClick([props.generalRow, props.generalCol], [props.smallRow, props.smallCol])
    }

    function getPic(){
        let isX =  props.field[props.generalRow][props.generalCol].isX(props.smallRow, props.smallCol);
        if (isX === undefined) return;
        return isX ? require("../resources/cross.png") : require("../resources/circle.png")
    }

    function changeEdges(){
        if (props.smallRow === 0 && props.smallCol === 0) {
            ref.current.style['borderTopLeftRadius'] = "2vh";
        }
        else if (props.smallRow === 0 && props.smallCol === 2) {
            ref.current.style['borderTopRightRadius'] = "2vh";
        } else if (props.smallRow === 2 && props.smallCol === 0) {
            ref.current.style['borderBottomLeftRadius'] = "2vh";
        }else if (props.smallRow === 2 && props.smallCol === 2) {
            ref.current.style['borderBottomRightRadius'] = "2vh";
        }

        
    }

    return (
        <div ref={ref} className={props.active ? "small-game-field-piece active" : "small-game-field-piece"} onClick={()=>onClick()}>
             {!props.field[props.generalRow][props.generalCol].isEmpty(props.smallRow, props.smallCol) && <img className='small-game-field-piece-pic' src={getPic()}></img>}
        </div>
    )
}
export default SmallGameFieldPiece;