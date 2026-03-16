//import { useEffect, useState } from 'react';
import roulettePNG from "../../img/RouletteGame.png"
import { RouletteMachine } from './RouletteMachine.tsx';
//import { user } from "../User.tsx";


function GameRoulette() {

  //const {GetMoney, UpdateMoney} = user();
  //const [Money, setMoney] = useState(0);

  return (
    <>
      <div>
        <RouletteMachine 
        roulettePNG={roulettePNG}
        />
      </div>
    </>
  )

}

export default GameRoulette;