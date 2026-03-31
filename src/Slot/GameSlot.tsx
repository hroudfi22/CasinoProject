import { useEffect, useState } from 'react';
import Imgs from "../Imgs.tsx";
import { GambaMachine } from './GambaMachine.tsx';
import { user } from "../User.tsx";


function GameSlot() {

  const { GetMoney, UpdateMoney} = user();
  const [Money, setMoney] = useState<number>(0);

  const getRandom = () => {
    return Imgs[Math.floor(Math.random() * Imgs.length)];
  };

  const [IsRolling, setIsRolling] = useState([false, false, false]);
  const [Counting, setCounting] = useState(false);
  const [Slot, setSlot] = useState<string[][]>([[],[],[]]);

  

  const RandomizeSlot = () => {
    const slot1 = Array.from({length: 3}, () => getRandom());
    const slot2 = Array.from({length: 3}, () => getRandom());
    const slot3 = Array.from({length: 3}, () => getRandom());
    setSlot([slot1, slot2, slot3]);
  };

  const addRandom = (slot : number) => {
    const slotRandom = Array.from({length: 97}, () => getRandom());
    setSlot(prev => {
      const copy = prev.map(arr => [...arr]);
      copy[slot] = [...copy[slot], ...slotRandom];
      return copy;
    });
  }

  const Roll = () => {
    if (IsRolling.some(v => v)) {
      console.log("The slots are spinning!");
      return;
    } else if (Counting) {
      console.log("Counting score");
      return;
    } else {
      console.log("Let's gooooooo");
    }


    // Get the slots ready 
    addRandom(0);
    addRandom(1);
    addRandom(2);
    startSlot(0);
    startSlot(1);
    startSlot(2);

    // Start Animation
    setIsRolling([true , true, true]);
    setCounting(true);

    // Animation Stop
    setTimeout(() => {
      setIsRolling([false, true, true]); 
      finalSlot(0);
    }, 3000);
    setTimeout(() => {
      setIsRolling([false, false, true]);
      finalSlot(1);
    }, 3400);
    setTimeout(() => {
      setIsRolling([false , false, false]);
      finalSlot(2);
    }, 3800);
  }

  const CheckWin = (slot : string[][]) => {
    let points : number = 0;

    // Horizontal
    for (let x = 0; x < 3; x++) {
      if (slot[x][0] === slot[x][1] && slot[x][1] === slot[x][2]) {
        points += 15
      } else if (slot[x][0] == slot[x][1] || slot[x][1] == slot[x][2]) {
        points += 5;
      }
    }
    
    // Vertical
    for (let y = 0; y < 3; y++) {
      if (slot[0][y] === slot[1][y] && slot[1][y] === slot[2][y]) {
        points += 15
      } else if (slot[0][y] == slot[1][y] || slot[1][y] == slot[2][y]) {
        points += 5;
      }
    }
    
    // Diagonal 1
    if (slot[0][0] === slot[1][1] && slot[1][1] === slot[2][2]) {
      points += 15;
    } else if (slot[0][0] == slot[1][1] || slot[1][1] == slot[2][2]) {
      points += 5;
    }

    // Diagonal 2
    if (slot[0][2] === slot[1][1] && slot[1][1] === slot[2][0]) {
      points += 15;
    } else if (slot[0][2] == slot[1][1] || slot[1][1] == slot[2][0]) {
      points += 5;
    }
    if (slot.flat().every(v => v === slot[0][0])) {
      points += 100;
    }
 
    UpdateMoney(Money+points);
    setMoney(Money+points);
    setCounting(false);
    console.log("You won "+points+" points.");
  }

  const startSlot = (slot : number) => {
    // Change last 3 elements with first 3
    setSlot(prev => {
      const copy = prev.map(arr => [...arr]);
      copy[slot][0] = prev[slot][97];
      copy[slot][1] = prev[slot][98];
      copy[slot][2] = prev[slot][99];
      copy[slot][99] = prev[slot][2];
      copy[slot][98] = prev[slot][1];
      copy[slot][97] = prev[slot][0];
      return copy;
    });
  }

  const finalSlot = (slot : number) => {
    // Deletes unnecessary
    setSlot(prev => {
      const copy = prev.map(arr => [...arr]);
      copy[slot] = copy[slot].slice(0, 3);
      if (slot === 2) {
        CheckWin(copy);
      }
      return copy;
    });
  }

  const renderSlot = (slot : string[]) => {
    return slot.map((emoji : string, idx : number) => (
      <img key={String(idx)} src={emoji} className="SlotEmoji"/>
    ))
  }

  useEffect(() => {
    // When website is open
    RandomizeSlot();
    GetMoney(setMoney);
  }, []);


  return (
    <>
      <link rel="stylesheet" href="/src/Slot/GameSlot.css"/>
      <div id="main-content">
        <GambaMachine
          IsRolling ={IsRolling}
          Slot={Slot}
          renderSlot={renderSlot}
          Roll={Roll}
        />
        <br/>
        <h2>Points: {Money}</h2>
      </div>
    </>
  );
}

export default GameSlot;