import React from 'react';
import './App.css';


function filterAlpha(event) {
  console.log(event)
  console.log(event.data)
  if (/[^a-zA-Z]/.test(event.data)) {
    event.preventDefault();
  }
}

class Hints extends React.Component {
  render() {
    return (
      <div id="letters">
        <input name="goed" placeholder='Goede letters' onBeforeInput={filterAlpha}></input>
        <input name="fout" placeholder='Foute letters' onBeforeInput={filterAlpha}></input>
        <input name="letter1" maxLength={1} onBeforeInput={filterAlpha}/>
        <input name="letter2" maxLength={1} onBeforeInput={filterAlpha}/>
        <input name="letter3" maxLength={1} onBeforeInput={filterAlpha}/>
        <input name="letter4" maxLength={1} onBeforeInput={filterAlpha}/>
        <input name="letter5" maxLength={1} onBeforeInput={filterAlpha}/>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <Hints/>
    </div>
  );
}

export default App;
