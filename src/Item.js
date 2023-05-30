import { useState } from "react";

function Item({item, removeItem}) {
    const [isChecked, setIsChecked] = useState(item.isDone);

    return (
        <li className='item'>
            <div className='left'>
              <input className='checkbox' type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
              {/* <input className='checkbox' type="checkbox" checked={isChecked} onClick={() => setIsChecked(!isChecked)} /> */}
              <div className={`deal ${isChecked && 'done'}`}>{item.title}</div>
            </div>
            <button className='remove' type='button' onClick={() => removeItem(item.id)}>&#10006;</button>
        </li>
    );
}

export default Item;