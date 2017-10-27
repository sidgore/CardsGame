import React, { Component } from 'react';
import Card from 'components/Card';

var shuffle = require('shuffle-array');


function initialCards() {
  return [
    { value: 2, matched: false, flipped: false },
    { value: 4, matched: false, flipped: false },
    { value: 1, matched: false, flipped: false },
    { value: 1, matched: false, flipped: false },
    { value: 3, matched: false, flipped: false },
    { value: 4, matched: false, flipped: false },
    { value: 2, matched: false, flipped: false },
    { value: 3, matched: false, flipped: false },
    { value: 6, matched: false, flipped: false },
    { value: 8, matched: false, flipped: false },
    { value: 7, matched: false, flipped: false },
    { value: 7, matched: false, flipped: false },
    { value: 5, matched: false, flipped: false },
    { value: 8, matched: false, flipped: false },
    { value: 6, matched: false, flipped: false },
    { value: 5, matched: false, flipped: false },
    { value: 10, matched: false, flipped: false },
    { value: 9, matched: false, flipped: false },
    { value: 11, matched: false, flipped: false },
    { value: 9, matched: false, flipped: false },
    { value: 12, matched: false, flipped: false },
    { value: 11, matched: false, flipped: false },
    { value: 12, matched: false, flipped: false },
    { value: 10, matched: false, flipped: false },

    { value: 14, matched: false, flipped: false },
    { value: 16, matched: false, flipped: false },
    { value: 13, matched: false, flipped: false },
    { value: 15, matched: false, flipped: false },
    { value: 13, matched: false, flipped: false },
    { value: 16, matched: false, flipped: false },
    { value: 14, matched: false, flipped: false },
    { value: 15, matched: false, flipped: false },

    { value: 18, matched: false, flipped: false },
    { value: 17, matched: false, flipped: false },
    { value: 18, matched: false, flipped: false },
    { value: 17, matched: false, flipped: false }


  ];
}

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.renderCards = this.renderCards.bind(this);
    this.checkMatch = this.checkMatch.bind(this);
    this.reset = this.reset.bind(this);

    this.state = {
      cards: initialCards(),
      lastCard: null,
      locked: false,
      matches: 0,
      rounds: 0
    };
  }

  checkMatch(value, id) {
    if (this.state.locked) {
      return;
    }
    var rnds = this.state.rounds + 0.5;

    var cards = this.state.cards;
    cards[id].flipped = true;

    this.setState({ cards, locked: true, rounds: rnds });
    if (this.state.lastCard) {
      if (value === this.state.lastCard.value) {
        var matches = this.state.matches;
        cards[id].matched = true;
        cards[this.state.lastCard.id].matched = true;
        this.setState({ cards, lastCard: null, locked: false, matches: matches + 1 });
      } else {
        setTimeout(() => {
          cards[id].flipped = false;
          cards[this.state.lastCard.id].flipped = false;
          this.setState({ cards, lastCard: null, locked: false });
        }, 1000);
      }
    } else {
      this.setState({
        lastCard: { id, value },
        locked: false
      });
    }
  }

  renderCards(cards) {
    return cards.map((card, index) => {
      return (
        <Card
          key={index}
          value={card.value}
          id={index}
          matched={card.matched}
          flipped={card.flipped}
          checkMatch={this.checkMatch} />
      );
    });
  }

  reset() {
    var cards1 = initialCards();
    cards1 = shuffle(cards1);

    this.setState({
      cards: cards1,
      lastCard: null,
      locked: false,
      matches: 0
    });
  }

  render() {
    var btnText = 'Reset';
    var disp = "";
    var disp_msg = "";
    var total_rnds;
    var extra_msg = "";
    if (this.state.matches === this.state.cards.length / 2) {
      disp = 'You Win! Play Again?';
      disp_msg = "Total Attempts : ";
      btnText = "Play Again";
      total_rnds = this.state.rounds;
      if (total_rnds <= 18) {
        extra_msg = "You are Just Perfect....";
      }
      else if (total_rnds < 25) {
        extra_msg = "you are amazing but still can improve.";
      }
      else if (total_rnds < 35) {
        extra_msg = "you cracked it but your mind was somewhere else.";
      }
      else {
        extra_msg = "You are a loser. Better luck next time.";
      }
    }
    return (
      <div className="Game">
        <div className="heading">
          <h2>  Welcome to the Game of Cards</h2>
        </div>
        <div className="count">
          <h3>Attempts:</h3>{Math.floor(this.state.rounds)}
        </div>
        <hr />
        {this.renderCards(this.state.cards)}
        <div className="display_tex">
          <h3>{disp}</h3>
          <div>
            <h3>{disp_msg}{total_rnds}</h3>
            <h3>{extra_msg}</h3>
          </div>
        </div>
        <div>
          <button className="resButton" onClick={this.reset}>{btnText}</button>
        </div>

      </div>
    );
  }
}
