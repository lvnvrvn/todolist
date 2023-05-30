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

  const input = useRef(null);

  function addItem() {
    setItems([...items, {
      id: items.length + 1,
      title: input.current.value,
      isDone: false
    }]);
    input.current.value = '';
  }

  function removeItem(id) {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
  }

  function clear() {
    input.current.value = '';
  }

  // function onEnter(e) {
  //   if (e.keyCode === 13) {
  //     addItem();
  //   }
  // }

  function onEnter(event) {
    if (event.keyCode == 13) {
      addItem();
      console.log(items);
    }
  }

  return (
    <div className="App">
      <form className='form' action="/" onKeyDown={(e) => {if (e.keyCode == 13) return false;}}>
        <input className='input' type="text" ref={input} onKeyDown={onEnter} />
        <button className='delete' type='button' onClick={clear}>&#10006;</button>
        <button className='add' type='button' onClick={addItem}>добавить</button>
      </form>
      <ul className='list'>
        {items.map(item => <Item item={item} key={item.id} removeItem={removeItem} />)}
      </ul>
    </div>
  );
}

export default App;
