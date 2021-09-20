import React, { useEffect, useState } from "react";
import RenderEnemies from "./ui/RenderEnemies";
import RenderCharacter from "./ui/RenderCharacter";
import TerminalInput from "../TerminalInput";

function TerminalOutput(props) {
  const {
    character,
    updateCharacter,
    enemies,
    updateEnemies,
    allEnemies,
    floor,
    updateFloor,
  } = props;

  const welcomeMessage = `❯ ${character.name}, Welcome to the Dungeon`;

  return (
    <div id="terminal-output" style={{ height: "100%" }}>
      <RenderEnemies enemies={enemies} />
      <RenderCharacter character={character} />
      <div
        style={{
          flex: "1",
          backgroundColor: "#012456",
          color: "#A2A9B4",
          height: "100%",
        }}
      >
        <TerminalInput
          character={character}
          updateCharacter={updateCharacter}
          enemies={enemies}
          updateEnemies={updateEnemies}
          allEnemies={allEnemies}
          floor={floor}
          updateFloor={updateFloor}
        />
      </div>
    </div>
  );
}

export default TerminalOutput;
