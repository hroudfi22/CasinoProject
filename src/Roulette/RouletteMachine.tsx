//import { useState } from "react";

type RouletteMachineProps = {
  roulettePNG: string;
}

export const RouletteMachine = ({
  roulettePNG,
}: RouletteMachineProps) => {

  return (
    <>
        <img src={roulettePNG} width="750px"/>
    </>
  );
}