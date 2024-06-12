import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';

const App = () => {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    // Fetch new deck on component mount
    const fetchDeck = async () => {
      const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
      const data = await res.json();
      setDeckId(data.deck_id);
    };
    fetchDeck();
  }, []);

  const drawCard = async () => {
    if (!deckId) return;

    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    const data = await res.json();
    
    if (data.success) {
      if (data.cards.length === 0) {
        setError('Error: no cards remaining!');
      } else {
        setCards([...cards, ...data.cards]);
      }
    } else {
      setError('Error: no cards remaining!');
    }
  };

  const shuffleDeck = async () => {
    if (!deckId) return;
    
    setIsShuffling(true);
    setError('');
    
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    const data = await res.json();
    
    if (data.success) {
      setCards([]);
    } else {
      setError('Error: unable to shuffle the deck!');
    }
    
    setIsShuffling(false);
  };

  return (
    <div className="App">
      <h1>Deck of Cards</h1>
      <button onClick={drawCard} disabled={isShuffling}>Draw Card</button>
      <button onClick={shuffleDeck} disabled={isShuffling}>Shuffle Deck</button>
      {error && <p className="error">{error}</p>}
      <div className="card-container">
        {cards.map(card => (
          <Card key={card.code} image={card.image} value={card.value} suit={card.suit} />
        ))}
      </div>
    </div>
  );
};

export default App;

