import { useState } from "react";
import TerminalOutput from "../TerminalOutput";
import { makeCharacter } from "../../library/generation/characterMaker";
import { makeBat } from "../../library/generation/enemyMaker";
import makeAllEnemies from "../../library/generation/makeAllEnemies";

export default function BattleSimulator(props) {
  const [character, updateCharacter] = useState(makeCharacter());
  const [floor, setFloor] = useState(0);
  const allEnemies = makeAllEnemies();
  const [enemies, setEnemies] = useState(allEnemies[floor]);

  return (
    <div id="root" className="root">
      <div id="terminal" className="terminal">
        <TerminalOutput
          character={character}
          updateCharacter={updateCharacter}
          enemies={enemies}
          allEnemies={allEnemies}
          updateEnemies={setEnemies}
          floor={floor}
          updateFloor={setFloor}
        />
      </div>
    </div>
  );
}
