import './App.css';
import { useState, useRef } from 'react';

function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'купить хлеб',
      isDone: true
    },
    {
      id: 2,
      title: 'посмотреть фильм',
      isDone: false
    },
    {
      id: 3,
      title: 'почитать журнал',
      isDone: true
    }
  ]);

  const input = useRef(null);
  const checkbox = useRef(null);

  function addItem() {
    setItems([...items, {
      id: items.length + 1,
      title: input.value,
      isDone: false
    }]);
    console.log(items);
  }

  // function removeItem(id) {
  //   setItems([items.filter(item => item.id !== id)]);
  // }

  function clear() {
    input.value = '';
  }



  return (
    <div className="App">
      <form className='form' action="/">
        <input className='input' type="text" ref={input} />
        <button className='delete' type='button' onClick={clear}>&#10006;</button>
        <button className='add' type='button' onClick={addItem}>добавить</button>
      </form>
      <ul className='list'>
        {items.map(item => (
          <li className='item' key={item.id}>
            <div className='left'>
              <input className='checkbox' type="checkbox"  ref={checkbox} />
              <div className={checkbox.checked ? 'deal done' : 'deal'}>{item.title}</div>
            </div>
            <button className='remove' type='button'>&#10006;</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
