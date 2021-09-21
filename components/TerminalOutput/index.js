import React, { useEffect, useState } from "react";
import RenderEnemies from "./ui/RenderEnemies";
import RenderCharacter from "./ui/RenderCharacter";
import TerminalInput from "../TerminalInput";
import RenderMoveLog from "./ui/RenderMoveLog";

function TerminalOutput(props) {
  const {
    character,
    updateCharacter,
    enemies,
    updateEnemies,
    allEnemies,
    floor,
    updateFloor,
    enemyAttacks,
    setEnemyAttacks,
    handleAttackModal,
  } = props;

  const welcomeMessage = `❯ ${character.name}, Welcome to the Dungeon`;

  return (
    <div id="terminal-output" style={{ height: "100%" }}>
      <RenderEnemies enemies={enemies} />
      <RenderMoveLog enemyAttacks={enemyAttacks} enemies={enemies} />
      <RenderCharacter character={character} />
      <div
        style={{
          flex: "1",
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
          enemyAttacks={enemyAttacks}
          setEnemyAttacks={setEnemyAttacks}
          handleAttackModal={handleAttackModal}
        />
      </div>
    </div>
  );
}

export default TerminalOutput;
