import React from 'react';
import './App.css';
import {words} from "./words.js";


function filterAlpha(event) {
  if (/[^a-zA-Z]/.test(event.data) || event.data.length > 1) {
    event.preventDefault();
  }
}


class WoordleHulp extends React.Component {
  constructor(props) {
    super(props);

    this.onPlacedLetterChange = this.onPlacedLetterChange.bind(this);
    this.onGoodLettersChange = this.onGoodLettersChange.bind(this);
    this.onBadLettersChange = this.onBadLettersChange.bind(this);
    this.onPlacedLetterKeyDown = this.onPlacedLetterKeyDown.bind(this);

    this.state = {
      bad_letters: [],
      good_letters: [],
      placed_letters: ['', '', '', '', ''],
    };
  }

  onGoodLettersChange(event) {
    event.target.value = event.target.value.toUpperCase();
    this.setState({"good_letters": Array.from(event.target.value.toLowerCase())})
  }

  onBadLettersChange(event) {
    event.target.value = event.target.value.toUpperCase();
    this.setState({"bad_letters": Array.from(event.target.value.toLowerCase())})
  }

  onPlacedLetterChange(event) {
    event.target.value = event.target.value.toUpperCase();
    const placed_letters = this.state.placed_letters;
    placed_letters[event.target.dataset.id] = event.target.value.toLowerCase();
    this.setState({"placed_letters": placed_letters})

    if (event.target.value &&          // test if the field is filled, if not, it was cleared with back-space
        event.target.nextSibling) {    // if filled, move to the next field
      event.target.nextElementSibling.focus();
    }
  }

  handleFocus(event) {
    // select all text in the element when the element is selected so you can type over previous content
    event.target.select();
  }

  onPlacedLetterKeyDown(event) {
    // test for left and right arrows
    switch(event.key) {
      case "ArrowLeft":
        event.target.previousElementSibling?.focus();
        break;
      case "ArrowRight":
        event.target.nextElementSibling?.focus();
        break;
      // back-space on an empty field should go left
      case "Backspace":
        if (!event.target.value) {
          event.target.previousElementSibling?.focus();
        }
        break;
      // space on an empty field should go right
      case " ":
        if (!event.target.value) {
          event.target.nextElementSibling?.focus();
        }
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div id="woordle_hulp">
        <div id="letters">
          <label htmlFor="good">Goede letters:</label>
          <input name="good" className='letter_list' onBeforeInput={filterAlpha} onChange={this.onGoodLettersChange} autoFocus></input>
          <label htmlFor="bad">Foute letters:</label>
          <input name="bad" className='letter_list' onBeforeInput={filterAlpha} onChange={this.onBadLettersChange}></input>

          <label htmlFor="letter1">Gevonden letters:</label>
          <div id="placed_letters" >
            <input className="placed_letter" type="text" id="letter1" data-id="0" maxLength={1} onFocus={this.handleFocus} onKeyDown={this.onPlacedLetterKeyDown} onBeforeInput={filterAlpha} onChange={this.onPlacedLetterChange}/>
            <input className="placed_letter" type="text" id="letter2" data-id="1" maxLength={1} onFocus={this.handleFocus} onKeyDown={this.onPlacedLetterKeyDown} onBeforeInput={filterAlpha} onChange={this.onPlacedLetterChange}/>
            <input className="placed_letter" type="text" id="letter3" data-id="2" maxLength={1} onFocus={this.handleFocus} onKeyDown={this.onPlacedLetterKeyDown} onBeforeInput={filterAlpha} onChange={this.onPlacedLetterChange}/>
            <input className="placed_letter" type="text" id="letter4" data-id="3" maxLength={1} onFocus={this.handleFocus} onKeyDown={this.onPlacedLetterKeyDown} onBeforeInput={filterAlpha} onChange={this.onPlacedLetterChange}/>
            <input className="placed_letter" type="text" id="letter5" data-id="4" maxLength={1} onFocus={this.handleFocus} onKeyDown={this.onPlacedLetterKeyDown} onBeforeInput={filterAlpha} onChange={this.onPlacedLetterChange}/>
          </div>
        </div>

        <WordList filters={this.state}/>
      </div>
    )
  }
}


class WordList extends React.Component {

  areFiltersEmpty() {
    return !this.props.filters.bad_letters.length &&
           !this.props.filters.good_letters.length &&
           this.props.filters.placed_letters.every((letter) => letter === '');
  }

  filterWords() {
    const placed_letters = this.props.filters.placed_letters

    function matchesPlacedLetter(word, index) {
        return placed_letters[index] === '' || word.charAt(index) === placed_letters[index]
    }

    return words.filter((word) =>
        this.props.filters.good_letters.every((letter) => word.includes(letter)) &&
        !this.props.filters.bad_letters.some((letter)  => word.includes(letter)) &&
        matchesPlacedLetter(word, 0) &&
        matchesPlacedLetter(word, 1) &&
        matchesPlacedLetter(word, 2) &&
        matchesPlacedLetter(word, 3) &&
        matchesPlacedLetter(word, 4)
    )
  }

  render() {
    if (this.areFiltersEmpty()) {
        return (
          ""
        )
    }

    const filtered_words = this.filterWords().map((word) =>
      <li key={word}>{word}</li>
    )

    return (
      <div id="words">
      De volgende <b>{filtered_words.length}</b> woorden komen overeen met je criteria:<br/>
        <ul>
          {filtered_words}
        </ul>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <h1>Zoek <a href="https://woordle.nl/">Woordle</a> woorden:</h1>
      <WoordleHulp/>
    </div>
  );
}

export default App;
