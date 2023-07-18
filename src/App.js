import './App.css';
import { useState, useEffect, useRef } from 'react';
import Item from './Item';

function App() {
  const [items, setItems] = useState([]);

  const input = useRef(null);

  function getItemsArrayFromLS() {
    const storageItems = [];
    for (let i = 0; i < localStorage.length; i++) {
      storageItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    return storageItems;
  }

  useEffect(() => {
    if (localStorage.length > 0) {
      setItems(getItemsArrayFromLS());
    } else {
      const initialItems = [
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
      ];
      initialItems.forEach(item => {
        localStorage.setItem(item.id, JSON.stringify(item));
      });
      window.dispatchEvent(new Event('storage'))
      setItems(getItemsArrayFromLS()); //  вывод на страницу
    }
  }, []);

  useEffect(() => {
    function stateItemsAdding() {
      setItems(getItemsArrayFromLS());
    }
    window.addEventListener('storage', stateItemsAdding);

    return () => {
      window.removeEventListener('storage', stateItemsAdding);
      console.log('removed');
    };
  }, []);

  

  console.log(localStorage.length);

  function addItem() { //заменить setitem на добавление нового item в localstorage
    localStorage.setItem(localStorage.length + 1, JSON.stringify({
      id: localStorage.length + 1,
      title: input.current.value,
      isDone: false
    }));
    window.dispatchEvent(new Event('storage'))
    input.current.value = '';
  }

  function removeItem(id) {
    localStorage.removeItem(id);
    window.dispatchEvent(new Event('storage'))
  }

  function clear() {
    input.current.value = '';
  }

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

//как отслеживать изменения в localstorage