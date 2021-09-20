import { useState } from "react";
import TerminalOutput from "../TerminalOutput";
import { makeCharacter } from "../../library/generation/characterMaker";
import { makeBat } from "../../library/generation/enemyMaker";

export default function BattleSimulator(props) {
  const [character, updateCharacter] = useState(makeCharacter());
  const [enemies, updateEnemies] = useState([makeBat(), makeBat()]);
  const [history, setHistory] = useState([]);

  return (
    <div id="root" className="root">
      <div id="terminal" className="terminal">
        <TerminalOutput
          history={history}
          updateHistory={setHistory}
          character={character}
          updateCharacter={updateCharacter}
          enemies={enemies}
          updateEnemies={updateEnemies}
        />
      </div>
    </div>
  );
}
