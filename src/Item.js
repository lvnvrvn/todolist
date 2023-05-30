import { useState } from "react";

function Item(props) {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <li className='item' key={props.id}>
            <div className='left'>
              <input className='checkbox' type="checkbox" onClick={() => setIsChecked(!isChecked)} />
              <div className={`deal ${isChecked && 'done'}`}>{props.title}</div>
            </div>
            <button className='remove' type='button'>&#10006;</button>
        </li>
    );
}

export default Item;