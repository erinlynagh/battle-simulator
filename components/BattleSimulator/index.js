import { useState } from "react";
import TerminalOutput from "../TerminalOutput";
import { makeCharacter } from "../../library/generation/characterMaker";
import makeAllEnemies from "../../library/generation/makeAllEnemies";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";

export default function BattleSimulator(props) {
  const [character, updateCharacter] = useState(makeCharacter());
  const [floor, setFloor] = useState(0);
  const allEnemies = makeAllEnemies();
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
      <Modal isOpen={showAttackModal} contentLabel="Get a new attack">
        <button onClick={() => handleAttackModal()}>Close Modal</button>
      </Modal>
    </div>
  );
}
