import { useEffect, useState } from "react";
import { StyleSheet, css } from "aphrodite";

import { makeCharacter } from "../../library/generation/characterMaker";
import makeAllEnemies from "../../library/generation/makeAllEnemies";

import fullscreen from "../../library/browser/fullscreen";

import * as Modals from "../Modals/index";
import * as RenderElements from "../RenderElements/index";

export default function Root() {
  //modal states
  const [showAttackModal, setShowAttackModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [showBattleModal, setShowBattleModal] = useState(false);
  const [alternateModal, setAlternateModal] = useState(0);

  function handleAttackModal() {
    if (showAttackModal) {
      setShowAttackModal(false);
    } else {
      setAlternateModal(0);
      setShowAttackModal(true);
    }
  }

  function handleShopModal() {
    if (showShopModal) {
      setShowShopModal(false);
    } else {
      setAlternateModal(1);
      setShowShopModal(true);
    }
  }

  const HandleModalFunctions = [handleAttackModal, handleShopModal];
  function handleBattleModal() {
    let setPreviousModal = HandleModalFunctions[alternateModal];
    if (showBattleModal) {
      setPreviousModal();
      setShowBattleModal(false);
    } else {
      setPreviousModal();
      setShowBattleModal(true);
    }
  }

  //global game states
  const allEnemies = makeAllEnemies();
  const [floor, setFloor] = useState(0);
  const [character, updateCharacter] = useState(makeCharacter());
  const [enemies, setEnemies] = useState(allEnemies[floor]);

  //per-battle game states
  const [enemyAttacks, setEnemyAttacks] = useState([]);
  const [currentAttackIndex, setCurrentAttackIndex] = useState(-1);
  const [targetedEnemyIndex, setTargetedEnemyIndex] = useState(-1);

  function getEnemyIndex(enemy) {
    return enemies.findIndex((x) => x.id === enemy.id);
  }

  function getEnemy(enemy) {
    return enemies.find((x) => x.id === enemy.id);
  }

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.code === "KeyF") {
        fullscreen();
      }
    });
    setAlternateModal(setShowAttackModal());
  }, []);

  return (
    <>
      <div className="flex flex-col pt-3 h-full">
        <RenderElements.RenderEnemies
          enemies={enemies}
          targetedEnemyIndex={targetedEnemyIndex}
          setTargetedEnemyIndex={setTargetedEnemyIndex}
        />
        <div className="flex justify-center">
          <p> ^^^^ Select an Enemy Target ^^^^</p>
        </div>
        <RenderElements.RenderMoveLog
          enemyAttacks={enemyAttacks}
          enemies={enemies}
        />

        <RenderElements.RenderCharacter character={character} />

        {targetedEnemyIndex >= 0 && (
          <button
            className="flex self-center px-2 py-2 m-2 rounded bg-green-700 hover:bg-gray-300 hover:text-green-700"
            onClick={() => handleAttackModal()}
          >
            {currentAttackIndex === -1
              ? "Select Spell"
              : "Cast " + character.attacks[currentAttackIndex].displayName}
          </button>
        )}
        {targetedEnemyIndex < 0 && (
          <>
            <button
              className="flex self-center px-2 py-2 m-2 rounded bg-red-700 hover:bg-gray-300 hover:text-red-700"
              onClick={() => handleAttackModal()}
            >
              End Turn
            </button>
          </>
        )}
      </div>

      <Modals.ShopModal
        showShopModal={showShopModal}
        handleShopModal={handleShopModal}
        character={character}
        updateCharacter={updateCharacter}
        showBattleModal={showBattleModal}
        handleBattleModal={handleBattleModal}
      />

      <Modals.BattleModal
        showBattleModal={showBattleModal}
        handleBattleModal={handleBattleModal}
        alternateModal={alternateModal}
      />

      <Modals.AttackModal
        character={character}
        currentAttackIndex={currentAttackIndex}
        setCurrentAttackIndex={setCurrentAttackIndex}
        showAttackModal={showAttackModal}
        handleAttackModal={handleAttackModal}
        showBattleModal={showBattleModal}
        handleBattleModal={handleBattleModal}
      />
    </>
  );
}
