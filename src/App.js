//import { render } from "@testing-library/react";
import React, {useEffect, useState} from "react";
import "./styles.css";

const Key = props => {
  const [keyColor, setKeyColor] = useState(props.isWhite === true ? "white" : "black");
  const originalColor = props.isWhite === true ? "white" : "black";

  //toggles color between purple and original color    
  function toggleColor() {
    setKeyColor(keyColor === originalColor ? "purple" : originalColor);
    props.handleKeyClick(props.id, keyColor);

  }
  
  //creates a black/white key with the ability to change colors on click
  if(props.isWhite)
  {
    return(
      <p style= {{backgroundColor: keyColor}}
      onClick={toggleColor} 
      className = "white-key"></p>
    );
  }
  else
  {
    return(
      <p style= {{backgroundColor: keyColor}}
      onClick={toggleColor}
      className = "black-key"></p>
    );
  }
}




 


const Octave = props => {
  const keys = [true,false,true,false,true,true,false,true,false,true,false,true];


  //removes or adds key from list of clicked keys

  function handleKeyClick(id, keyColor) {
    props.handleKeyClickApp(id, keyColor);
  }
  
  
  //creates 12 keys of a piano with unique ids
  //i is the element, index is the counter 
  return(
    <>
    {keys.map((i,index) => {
      return <Key isWhite = {i} 
      handleKeyClick={handleKeyClick}
      key={index} 
      id={(props.id * 12) + index}/>
    })}
    </>
  );
}

const App = () => {
  const [currentChord, setCurrentChord] = useState("");
  const [pressedKeys, setPressedKeys] = useState([]);   //const [state/hook, helper function]
  var tempChord = "";

  function handleKeyClickApp(id, keyColor) {

    function compareNumbers(a,b) {
      return a - b;
    }
    var newKeys;

    if(keyColor !== "purple"){
      newKeys = pressedKeys.concat(id);
      newKeys.sort(compareNumbers);
    } else {
      newKeys = pressedKeys.filter(k => k !== id);
    }
    setPressedKeys(newKeys);
  }

  useEffect(() => {
    handleChord(chord());
  }, [pressedKeys]);

  function chord(){
    if(pressedKeys.length === 3)
    {
      if((pressedKeys[0] + 4 === pressedKeys[1]) && (pressedKeys[1] + 3 === pressedKeys[2]))
      {
        //chord is major
        return chordType();
      }
      else if((pressedKeys[0] + 3 === pressedKeys[1]) && (pressedKeys[1] + 4 === pressedKeys[2]))
      {
        //chord is minor 
        return chordType() + "m";
      }
    }
    else if(pressedKeys.length === 4)
    {
      if((pressedKeys[0] + 4 === pressedKeys[1]) && (pressedKeys[1] + 3 === pressedKeys[2]) && (pressedKeys[2] + 3 === pressedKeys[3]))
      {
        //chord is 7
        return chordType() + "7";
      }
      else if((pressedKeys[0] + 4 === pressedKeys[1]) && (pressedKeys[1] + 3 === pressedKeys[2]) && (pressedKeys[2] + 4 === pressedKeys[3]))
      {
        //chord is major 7
        return chordType() + "maj7";
      }
      else if((pressedKeys[0] + 3 === pressedKeys[1]) && (pressedKeys[1] + 4 === pressedKeys[2]) && (pressedKeys[2] + 3 === pressedKeys[3]))
      {
        //chord is minor 7
        return chordType() + "m7";
      }
    }
    else 
      return "";
  }

  function chordType(){
    switch(pressedKeys[0])
    {
      case 0: 
        return "C";
      case 1:
        return "C#";
      case 2:
        return "D";
      case 3: 
        return "D#";
      case 4:
        return "E";
      case 5:
        return "F";
      case 6:
        return "F#";
      case 7:
        return "G";
      case 8:
        return "G#";
      case 9:
        return "A";
      case 10:
        return "A#";
      case 11:
        return "B";
      // default: 
      //   return "";
    }
  }


  // var testChord;
  function handleChord(childChord) {
    setCurrentChord(childChord);
  }


  return(
    <>
    
    <div className="keyboard">
      <Octave id ={0} handleKeyClickApp={handleKeyClickApp}/>
      <Octave id={1} handleKeyClickApp={handleKeyClickApp}/>
    </div>
    <h1>{currentChord}</h1>
    </>
  );

}

export default App;
