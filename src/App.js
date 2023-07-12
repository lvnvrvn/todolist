import './App.css';
import { useState, useEffect, useRef } from 'react';
import Item from './Item';

function App() {
  const [items, setItems] = useState([]);

  const input = useRef(null);

  function addItemsFromLS() {
    const storageItems = [];
      for (let i = 0; i < localStorage.length; i++) {
        storageItems.push(JSON.parse(localStorage.getItem(localStorage.key(i)))); // в фунцкию отдельную вынести
      }
    setItems(storageItems);
  }

  useEffect(() => {
    // items.forEach(item => {
    //   localStorage.setItem(item.id, JSON.stringify(item))
    // });
    
    if (localStorage.length > 0) {
      addItemsFromLS();
    } else {
      setItems([
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
    }
  }, []);

  // useEffect(() => {
  //   const lastItem = items[items.length - 1];
  //   localStorage.setItem(lastItem.id, JSON.stringify(lastItem));
  // });

  useEffect(() => {
    addItemsFromLS();  
  }, [localStorage.length]);

  function addItem() { //заменить setitem на добавление нового item в localstorage
    // setItems([...items, {
    //   id: items.length + 1,
    //   title: input.current.value,
    //   isDone: false
    // }]);
    // console.log(items);

    localStorage.setItem(localStorage.length + 1, {
      id: localStorage.length + 1,
      title: input.current.value,
      isDone: false
    });
    
    input.current.value = '';
  }

  function removeItem(id) {
    localStorage.removeItem(id);
    // const newItems = items.filter(item => item.id !== id);
    // setItems(newItems);
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
    if (event.keyCode === 13) {
      
      addItem();
      console.log(items);
    }
  }

  return (
    <div className="App">
      <form className='form' action="/" onSubmit={(e) => e.preventDefault()}>
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
