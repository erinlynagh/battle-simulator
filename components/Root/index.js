import { useEffect, useState } from "react";
import { makeCharacter } from "../../library/generation/characterMaker";
import makeAllEnemies from "../../library/generation/makeAllEnemies";
import fullscreen from "../../library/browser/fullscreen";

import * as Modals from "../Modals/index";
import * as RenderElements from "../RenderElements/index";

export default function Root(props) {
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
    document.addEventListener("keyup", (e) => {
      if (e.code === "KeyF") {
        fullscreen();
      }
    });
  }, []);

  return (
    <>
      <div className="pt-3 h-full">
        <RenderElements.RenderEnemies enemies={enemies} />
        <RenderElements.RenderMoveLog
          enemyAttacks={enemyAttacks}
          enemies={enemies}
        />

        <RenderElements.RenderCharacter character={character} />
        <RenderElements.RenderCharacterAttacks character={character} />
      </div>

      <Modals.ShopModal
        showAttackModal={showAttackModal}
        handleAttackModal={handleAttackModal}
        character={character}
        updateCharacter={updateCharacter}
        showBattleModal={showBattleModal}
        handleBattleModal={handleBattleModal}
      />

      <Modals.BattleModal
        showBattleModal={showBattleModal}
        handleBattleModal={handleBattleModal}
      />
    </>
  );
}
