import './App.css';
import React, { useState } from 'react';


function App() {
const [cardList, setCardList] = useState([
{id: 1, order:1, text:'Cart 1'},
{id: 2, order:2, text:'Cart 2'},
{id: 3, order:3, text:'Cart 3'},
{id: 4, order:4, text:'Cart 4'},
])
const [currentCard, setCurrentCard] = useState({id: 2, order:2, text:'Cart 2'})

const dragStartHandler = (e,card) => {
setCurrentCard(card)
console.log(currentCard);
}

const dragEndHandler = (e) => {
  e.target.style.background = 'white'
}

const dragOverHandler = (e) => {
  e.preventDefault()
  e.target.style.background = 'red'
}

const dropHandler = (e,card) => {
 e.preventDefault()
 setCardList(cardList.map(c => {
  if (c.id === card.id){
    return {...c, order:currentCard.order}
  }
  if (c.id === currentCard.id){
    return {...c, order: card.order}
  }
  return c 
 }));
 e.target.style.background = 'white'
}

const sortFunc = (a,b) => {
  if (a.order > b.order) {
    return 1;
  }
  if (a.order < b.order) {
    return -1;
  }
  return 0;
};


  return (
    <div className="card-container">
      {cardList.sort(sortFunc).map(card =>
      <div
      key={card.id}
      onDragStart={(e) => dragStartHandler(e, card)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e,card)} 
      draggable='true'
      className='card'>
         <div>{card.text ? card.text : ''}</div>
        </div>
        )}
    </div>
  );
}

export default App;
