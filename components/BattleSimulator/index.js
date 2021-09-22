import { useState } from "react";
import TerminalOutput from "../TerminalOutput";
import { makeCharacter } from "../../library/generation/characterMaker";
import makeAllEnemies from "../../library/generation/makeAllEnemies";
import GetNewAttackModal from "../modals/GetNewAttackModal";
import { MersenneTwister19937 } from "random-js";

export default function BattleSimulator(props) {
  const engine = MersenneTwister19937.autoSeed();
  const allEnemies = makeAllEnemies();

  const [character, updateCharacter] = useState(makeCharacter());
  const [floor, setFloor] = useState(0);
  const [enemies, setEnemies] = useState(allEnemies[floor]);
  const [enemyAttacks, setEnemyAttacks] = useState([]);
  const [showAttackModal, setShowAttackModal] = useState(false);

  function handleAttackModal() {
    if (showAttackModal) {
      setShowAttackModal(false);
    } else {
      setShowAttackModal(true);
    }
  }

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
          enemyAttacks={enemyAttacks}
          setEnemyAttacks={setEnemyAttacks}
          handleAttackModal={handleAttackModal}
        />
      </div>
      <GetNewAttackModal
        showAttackModal={showAttackModal}
        handleAttackModal={handleAttackModal}
        character={character}
        updateCharacter={updateCharacter}
        engine={engine}
      />
    </div>
  );
}
