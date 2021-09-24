import { useEffect, useState } from "react";
import TerminalOutput from "../TerminalOutput";
import { makeCharacter } from "../../library/generation/characterMaker";
import makeAllEnemies from "../../library/generation/makeAllEnemies";
import ShopModal from "../modals/ShopModal";
import BattleModal from "../modals/BattleModal";

export default function BattleSimulator(props) {
  const allEnemies = makeAllEnemies();

  const [character, updateCharacter] = useState(makeCharacter());
  const [floor, setFloor] = useState(0);
  const [enemies, setEnemies] = useState(allEnemies[floor]);
  const [enemyAttacks, setEnemyAttacks] = useState([]);
  const [showAttackModal, setShowAttackModal] = useState(false);
  const [showBattleModal, setShowBattleModal] = useState(false);

  function handleAttackModal() {
    if (showAttackModal) {
      setShowAttackModal(false);
    } else {
      setShowAttackModal(true);
    }
  }

  function handleBattleModal() {
    if (showBattleModal) {
      setShowAttackModal(true);
      setShowBattleModal(false);
    } else {
      setShowAttackModal(false);
      setShowBattleModal(true);
    }
  }

  useEffect(() => {
    if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (elem.requestFullscreen) {
      document.documentElement.RequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  });
  return (
    <>
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

      <ShopModal
        showAttackModal={showAttackModal}
        handleAttackModal={handleAttackModal}
        character={character}
        updateCharacter={updateCharacter}
        showBattleModal={showBattleModal}
        handleBattleModal={handleBattleModal}
      />

      <BattleModal
        showBattleModal={showBattleModal}
        handleBattleModal={handleBattleModal}
      />
    </>
  );
}
