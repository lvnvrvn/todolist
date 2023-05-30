import './App.css';
import { useState, useEffect, useRef } from 'react';
import Item from './Item';

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
  // const [isChecked, setIsChecked] = useState()

  const input = useRef(null);
  const checkbox = useRef(null);

  function addItem() {
    setItems([...items, {
      id: items.length + 1,
      title: input.current.value,
      isDone: false
    }]);
    input.current.value = '';
    console.log(items);
  }

  // function removeItem(id) {
  //   setItems([items.filter(item => item.id !== id)]);
  // }

  function clear() {
    input.current.value = '';
  }

  console.log('checkbox', checkbox.current?.checked);

  return (
    <div className="App">
      <form className='form' action="/">
        <input className='input' type="text" ref={input} />
        <button className='delete' type='button' onClick={clear}>&#10006;</button>
        <button className='add' type='button' onClick={addItem}>добавить</button>
      </form>
      <ul className='list'>
        {items.map(item => <Item title={item.title} key={item.id} />)}
      </ul>
    </div>
  );
}

export default App;
