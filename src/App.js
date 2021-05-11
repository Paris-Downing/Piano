//import { render } from "@testing-library/react";
import React, {useEffect, useState} from "react";
import "./styles.css";

//creates a single key that is black or white, with the ability to turn purple on click
const Key = props => {
  const [keyColor, setKeyColor] = useState(props.isWhite === true ? "white" : "black");
  const originalColor = props.isWhite === true ? "white" : "black";
  var keyName = props.octaveKeyLabel(props.id);
  // const [audio] = useState(new Audio("../assets/mp3 Notes/C0.mp3"));
  
  // useEffect(() => {
  //   audio.addEventListener('ended', () => setPlaying(false));
  //   return () => {
  //     audio.removeEventListener('ended', () => setPlaying(false));
  //   };
  // }, []);

  // console.log("keyName: " + props.id + keyName);
  // console.log(audio);

  //toggles color between purple and original color    
  function toggleColor() {
    setKeyColor(keyColor === originalColor ? "purple" : originalColor);
    const audioEl = document.getElementsByClassName("audio-element")[0];
    console.log(audioEl);
    audioEl.play()
    // audio.play();
    props.handleKeyClick(props.id, keyColor);
  }


  // useEffect(() => {
  //   console.log("keyName: " + keyName)
  // }, [keyName]);
  
  //creates a black/white key with a name the ability to change colors on click
  if(props.isWhite)
  {
    return(
      <div  style= {{backgroundColor: keyColor}} className="white-key" onClick={toggleColor}>
        <span>{keyName}</span>
      </div>
    );
  }
  else
  {
    return(
      <div style= {{backgroundColor: keyColor}} className="black-key" onClick={toggleColor}>
          <span>.</span>
      </div>
    );
  }
}




 



//creates 12 keys with certain settings of black and white
const Octave = props => {
  const keys = [true,false,true,false,true,true,false,true,false,true,false,true];

  //lets child (Key) and parent (App) access vars id and keyColor
  function handleKeyClick(id, keyColor) {
    // console.log(props.keyLabel(id));
    props.handleKeyClickApp(id, keyColor);  //how to pass props to a parent
  }

  // function handleKeyLabel(i) {
  //   props.keyLabel(i);
  // }
  
  //creates 12 keys of a piano with unique ids
  return(
    <>
    {keys.map((i,index) => {               //i is the element, index is the counter 
      return (
      <Key isWhite = {i} 
      handleKeyClick={handleKeyClick}     //how to pass a function to a child
      key={index}      
      octaveKeyLabel = {props.keyLabel}                       
      id={(props.id * 12) + index}/>)
    })}
    </>
  );
}








//analyzes chords, controls page format
const App = () => {
  const [currentChord, setCurrentChord] = useState("");
  const [pressedKeys, setPressedKeys] = useState([]);   //const [state/hook, helper function]
  //var whiteKeys = ["C", "D", "E", "F", "G", "A", "B"];

  //given a clicked key, adds or removes it from list of clicked keys 
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

  //???every time a key is clicked, analyze the notes in pressedKeys(?)
  useEffect(() => {
    handleChord(chord());
  }, [pressedKeys]);

  //keeps track of the types of chords (major, minor, 7th, etc)
  function chord(){
    if(pressedKeys.length === 2)
    {
      if(pressedKeys[0] + 1 === pressedKeys[1])
      {
        //minor 2nd
        return chordType(pressedKeys[0]) + "m2";
      }
      else if(pressedKeys[0] + 2 === pressedKeys[1])
      {
        //major 2nd
        return chordType(pressedKeys[0]) + "2";
      } 
      else if(pressedKeys[0] + 3 === pressedKeys[1])
      {
        //minor 3nd
        return chordType(pressedKeys[0]) + "m3";
      }
      else if(pressedKeys[0] + 4 === pressedKeys[1])
      {
        //major 3nd
        return chordType(pressedKeys[0]) + "3";
      } 
      else if(pressedKeys[0] + 5 === pressedKeys[1])
      {
        //fourth
        return chordType(pressedKeys[0]) + "4";
      } 
      else if(pressedKeys[0] + 6 === pressedKeys[1])
      {
        //tritone
        return chordType(pressedKeys[0]) + "TT";
      }
      else if(pressedKeys[0] + 7 === pressedKeys[1])
      {
        //fifth
        return chordType(pressedKeys[0]) + "5";
      }
      else if(pressedKeys[0] + 8 === pressedKeys[1])
      {
        //minor 6th
        return chordType(pressedKeys[0]) + "m6";
      }
      else if(pressedKeys[0] + 9 === pressedKeys[1])
      {
        //major 6th
        return chordType(pressedKeys[0]) + "6";
      }
      else if(pressedKeys[0] + 10 === pressedKeys[1])
      {
        //minor 7th
        return chordType(pressedKeys[0]) + "m7";
      }
      else if(pressedKeys[0] + 11 === pressedKeys[1])
      {
        //major 7th
        return chordType(pressedKeys[0]) + "7";
      }
    }
    else if(pressedKeys.length === 3)
    {
      if((pressedKeys[0] + 4 === pressedKeys[1]) && (pressedKeys[1] + 3 === pressedKeys[2]))
      {
        //chord is major
        return chordType(pressedKeys[0]);
      }
      else if((pressedKeys[0] + 3 === pressedKeys[1]) && (pressedKeys[1] + 4 === pressedKeys[2]))
      {
        //chord is minor 
        return chordType(pressedKeys[0]) + "m";
      }
      else if((pressedKeys[0] + 6 === pressedKeys[1]) && (pressedKeys[1] + 2 === pressedKeys[2]))
      {
        //chord is a seventh
        return chordType(pressedKeys[2]) + "7/" + chordType(pressedKeys[0]);
      }
      else if((pressedKeys[0] + 5 === pressedKeys[1]) && (pressedKeys[1] + 4 === pressedKeys[2]))
      {
        //Major second inversion
        return chordType(pressedKeys[1]) + "/" + chordType(pressedKeys[0]);
      }
      else if((pressedKeys[0] + 4 === pressedKeys[1]) && (pressedKeys[1] + 5 === pressedKeys[2]))
      {
        //minor 6th/major 6th
        return chordType(pressedKeys[2]) + "m6/" + chordType(pressedKeys[0]) + "6";
      }
      else if((pressedKeys[0] + 3 === pressedKeys[1]) && (pressedKeys[1] + 3 === pressedKeys[2]))
      {
        //diminished
        return chordType(pressedKeys[0]) + "dim";
      }
      else if((pressedKeys[0] + 2 === pressedKeys[1]) && (pressedKeys[1] + 5 === pressedKeys[2]))
      {
        //sustained 2
        return chordType(pressedKeys[0]) + "sus2"; 
      }
      else if((pressedKeys[0] + 5 === pressedKeys[1]) && (pressedKeys[1] + 2 === pressedKeys[2]))
      {
        //sustained 4
        return chordType(pressedKeys[0]) + "sus4";
      }
      else if((pressedKeys[0] + 4 === pressedKeys[1]) && (pressedKeys[1] + 4 === pressedKeys[2]))
      {
        //augmented
        return chordType(pressedKeys[0]) + "aug";
      }
    }
    else if(pressedKeys.length === 4)
    {
      if((pressedKeys[0] + 4 === pressedKeys[1]) && (pressedKeys[1] + 3 === pressedKeys[2]) && (pressedKeys[2] + 3 === pressedKeys[3]))
      {
        //chord is 7
        return chordType(pressedKeys[0]) + "7";
      }
      else if((pressedKeys[0] + 4 === pressedKeys[1]) && (pressedKeys[1] + 3 === pressedKeys[2]) && (pressedKeys[2] + 4 === pressedKeys[3]))
      {
        //chord is major 7
        return chordType(pressedKeys[0]) + "maj7";
      }
      else if((pressedKeys[0] + 3 === pressedKeys[1]) && (pressedKeys[1] + 4 === pressedKeys[2]) && (pressedKeys[2] + 3 === pressedKeys[3]))
      {
        //chord is minor 7
        return chordType(pressedKeys[0]) + "m7";
      }
      else if((pressedKeys[0] + 4 === pressedKeys[1]) && (pressedKeys[1] + 3 === pressedKeys[2]) && (pressedKeys[2] + 2 === pressedKeys[3]))
      {
        //major 6th
        return chordType(pressedKeys[0]) + "6";
      }
      else if((pressedKeys[0] + 3 === pressedKeys[1]) && (pressedKeys[1] + 4 === pressedKeys[2]) && (pressedKeys[2] + 2 === pressedKeys[3]))
      {
        //minor 6th
        return chordType(pressedKeys[0]) + "m6";
      }
      else if((pressedKeys[0] + 2 === pressedKeys[1]) && (pressedKeys[1] + 2 === pressedKeys[2]) && (pressedKeys[2] + 3 === pressedKeys[3]))
      {
        //added 2nd
        return chordType(pressedKeys[0]) + "add2";
      }
      else if((pressedKeys[0] + 4 === pressedKeys[1]) && (pressedKeys[1] + 3 === pressedKeys[2]) && (pressedKeys[2] + 7 === pressedKeys[3]))
      {
        //added 9th
        return chordType(pressedKeys[0]) + "add9";
      }
    }
    else 
      return "";
  }

  //given a key, returns the key name
  function chordType(i){
    switch(i % 12)
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
    }
  }

  //???allows current chord to change????
  function handleChord(childChord) {
    setCurrentChord(childChord);
  }

  //prints out two octaves and the current chord that is clicked 
  return(
    <>
    <div className="keyboard">
      <Octave id ={0} keyLabel={chordType} handleKeyClickApp={handleKeyClickApp}/>
      <Octave id={1} keyLabel={chordType} handleKeyClickApp={handleKeyClickApp}/>
    </div>
    <h1></h1>

    <audio className="audio-element">
          <source src="file:///C:/Users/downi/Documents/Visual Studio 2019/Piano/assets/mp3Notes/a3.mp3"></source>
        </audio>
        
    <form>
      <div className="form-group">
        <label >Enter a chord</label>
        <input style={{height: "200px"}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={currentChord}></input>
        <small id="emailHelp" className="form-text text-muted">Help?</small>
      </div>
      <button type="submit" className="btn btn-primary">Display Chord</button>
    </form>
    </>
  );

}

export default App;
