import { useRef } from "react";

import style from "./Checkbox.module.css";

export default function Checkbox({types , handleChecked}) {

  const checkboxe = useRef();

    let expanded = false;

    function showCheckboxes() {
        if(checkboxe.current){
            if (!expanded) {
                checkboxe.current.style.display = "block";
                 expanded = true;
            } else {
                checkboxe.current.style.display = "none";
                expanded = false;
            }
            console.log(expanded)
        } 
    }

  return (
    <form>
        <div className={style.multiselect}>
            <div ref={checkboxe} className={style.checkboxes}>
                {
                    types.map( type => (
                        <label for={type.name} key={type.name}>
                            <input 
                                type="checkbox" 
                                id={type.name} 
                                value={type.name}
                                onChange={(e) => handleChecked(e)}
                            />
                            {type.name}
                         </label>
                    ))
                }    
            </div>
            <div className={style.selectBox} onClick={showCheckboxes}>
            <select className={style.select}>
                <option>Select Pokemon types</option>
            </select>
            <div className={style.overSelect}></div>
            </div>
        </div>
    </form>
  );
}