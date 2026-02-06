import { useState } from "react";

type GambaMachineProps = {
  Roll : Function;
  IsRolling: boolean[];
  Slot: string[][];
  renderSlot: Function;
  Money: number;
}

export const GambaMachine = ({
  Roll,
  IsRolling,
  Slot,
  renderSlot,
  Money
}: GambaMachineProps) => {

  const [leverValue, setLeverValue] = useState(0);
  const [LeverIsChanging, setLeverIsChanging] = useState(false);

  const ResetLever = () => {
    // Pulls the lever up
    if (leverValue > 0 && !LeverIsChanging) setLeverValue(v => v - 1);
    else if (leverValue < 0) setLeverValue(0);
  };

  const PullLever = (val : number) => {
    // Check if lever is being held and rolls
    setLeverValue(val);
    setLeverIsChanging(true);
    if (leverValue > 80) { Roll(); setLeverValue(0); }
  };



  setTimeout(() => ResetLever(), 2);


  // <div className="slotblockup" /> <div className="slotblockdown" />
  return (
    <>
        
        <p>Let's go gambling!</p>
        <div id="slot">
          <div className={`slot ${IsRolling[0] ? "Spinning" : ""}`} id="slot-1">
            <div className="slot-inner">{renderSlot(Slot[0])}</div>
          </div>
          <div className={`slot ${IsRolling[1] ? "Spinning2" : ""}`} id="slot-2">
            <div className="slot-inner">{renderSlot(Slot[1])}</div>
          </div>
          <div className={`slot ${IsRolling[2] ? "Spinning3" : ""}`} id="slot-3">
            <div className="slot-inner">{renderSlot(Slot[2])}</div>
          </div>
          <div id="lever">
            <input
              className="lever"
              type="range"
              min="0"
              max="100"
              value={leverValue}
              onChange={e => PullLever(Number(e.target.value))}
              onMouseUp={() => {setLeverIsChanging(false);}}
              disabled={IsRolling[0] || IsRolling [2]}/>
          </div>
        </div>
        
        <p>Points: {Money}</p>
    </>
  );
}