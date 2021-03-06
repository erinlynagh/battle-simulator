import { useEffect, useState } from "react";
import { StyleSheet, css } from "aphrodite";
import { flash as animation } from "react-animations";

import * as StateHelpers from "../../library/copyClasses";

const animationDuration = 1.5;
const animations = StyleSheet.create({
  animate: {
    animationName: animation,
    animationDuration: animationDuration + "s",
  },
});

import * as Modals from "../modals/index";
import * as RenderElements from "../RenderElements/index";

import fullscreen from "../../library/browser/fullscreen";
import { makeCharacter } from "../../library/generation/characterMaker";
import makeAllEnemies from "../../library/generation/makeAllEnemies";
import { CastSpell } from "../../library/battle/attack";
import { RenderCasts } from "../RenderElements/RenderElements";
import { characterHasEffect } from "../../library/classes";
import ApplyAccessories from "../../library/generation/accessoryMaker/applyAccessories";

export default function Root() {
  //one-time states
  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);
  //modal states
  const [showSpellbookModal, setShowSpellbookModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [showBattleModal, setShowBattleModal] = useState(false);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [alternateModal, setAlternateModal] = useState(0);
  //global game states
  const allEnemies = makeAllEnemies();
  const [floor, setFloor] = useState(0);
  const [character, updateCharacter] = useState(makeCharacter());
  const [enemies, setEnemies] = useState(allEnemies[floor]);
  const [showSelectHelper, setShowSelectHelper] = useState(true);
  const [lost, setLost] = useState(false);
  const [won, setWon] = useState(false);
  //per-battle game states
  const [enemyAttacks, setEnemyAttacks] = useState([]);
  const [currentAttackIndex, setCurrentAttackIndex] = useState(0);
  const [targetedEnemyIndex, setTargetedEnemyIndex] = useState(0);

  function handleSpellbookModal() {
    if (showSpellbookModal) {
      setShowSpellbookModal(false);
    } else {
      setAlternateModal(0);
      setShowSpellbookModal(true);
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

  function handleInventoryModal() {
    if (showInventoryModal) {
      setShowInventoryModal(false);
    } else {
      setAlternateModal(2);
      setShowInventoryModal(true);
    }
  }

  const HandleModalFunctions = [
    handleSpellbookModal,
    handleShopModal,
    handleInventoryModal,
  ];
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

  function ResetRendering() {
    // save character, floor, enemies (and potentially allEnemies once it becomes random) to local storage, load on reload
    setShowSpellbookModal(false);
    setShowBattleModal(false);
    setEnemyAttacks([]);
    setCurrentAttackIndex(-1);
    setTargetedEnemyIndex(-1);
  }

  function ResetGame() {
    const allEnemies = makeAllEnemies();
    setShowSpellbookModal(false);
    setShowShopModal(false);
    setShowBattleModal(false);
    setAlternateModal(0);
    setFloor(0);
    updateCharacter(makeCharacter());
    setEnemies(allEnemies[0]);
    setShowSelectHelper(true);
    setLost(false);
    setWon(false);
    setEnemyAttacks([]);
    setCurrentAttackIndex(0);
    setTargetedEnemyIndex(-1);
  }

  function nextFloor() {
    let newFloor = floor + 1;
    if (newFloor >= allEnemies.length) {
      console.log("you win!");
      setWon(true);
      ResetRendering();
    } else {
      var newCharacter = StateHelpers.makeNewCharacter(character);
      newCharacter.effects = [];
      newCharacter.coins += floor % 7;
      newCharacter.mana = newCharacter.maxMana;
      updateCharacter(newCharacter);
      setFloor(newFloor);
      setEnemies(allEnemies[newFloor]);
      ResetRendering();
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.code === "KeyF") {
        fullscreen();
      }
    });
    setAlternateModal(setShowSpellbookModal());
    setIsDocumentLoaded(true);
    const [newEnemiesString, newFloorString, newCharacterString] = [
      localStorage.getItem("enemies"),
      localStorage.getItem("floor"),
      localStorage.getItem("character"),
    ];
    const newEnemies = JSON.parse(newEnemiesString);
    const newFloor = JSON.parse(newFloorString);
    const newCharacter = JSON.parse(newCharacterString);
    if (newEnemies || newCharacter || newFloor) {
      console.log("Save Loaded!");
      setEnemies(newEnemies);
      setFloor(newFloor);
      updateCharacter(newCharacter);
      setShowSelectHelper(false);
    }
  }, []);

  useEffect(() => {
    if (enemies.length === 1) {
      setTargetedEnemyIndex(0);
    }
  }, [enemies]);

  useEffect(() => {
    if (character.health <= 0) {
      setLost(true);
      console.log("Clearing Save");
      localStorage.clear();
      return;
    } else {
      localStorage.setItem("floor", JSON.stringify(floor));
      localStorage.setItem("character", JSON.stringify(character));
      localStorage.setItem("enemies", JSON.stringify(enemies));
    }
  }, [enemies, character]);

  useEffect(() => {
    ApplyAccessories(character);
  }, [character]);

  const spellInfoClassName = "flex justify-center flex-row w-full";

  const spellInfoBorders =
    " border-l-2 border-r-2 bg-gray-900 border-gray-700z ";
  if (lost) {
    return (
      <div className="flex w-full h-full justify-center items-center flex-col">
        <h1 className="flex text-8xl text-center">You Lose</h1>
        <button
          className="flex rounded px-2 py-1 text-lg bg-gray-700 hover:text-gray-700 hover:bg-gray-300"
          onClick={() => ResetGame()}
        >
          Retry?
        </button>
      </div>
    );
  }

  if (won) {
    return (
      <div className="flex justify-center align-items-center flex-col h-full">
        <h1 className="text-3xl text-center">You Win!</h1>
        <RenderElements.RenderCharacter
          character={character}
          showBattleModal={showBattleModal}
        />
        <button
          className="rounded px-2 py-1 text-lg mt-3 bg-green-700 hover:text-green-700 hover:bg-gray-300 lg:w-1/2 self-center"
          onClick={() => ResetGame()}
        >
          Retry?
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col py-3 xs:h-auto sm:h-full">
        <RenderElements.RenderEnemies
          enemies={enemies}
          targetedEnemyIndex={targetedEnemyIndex}
          setTargetedEnemyIndex={setTargetedEnemyIndex}
          setShowSelectHelper={setShowSelectHelper}
        />
        {isDocumentLoaded && TargetingHelpers()}
        <RenderElements.RenderMoveLog
          enemyAttacks={enemyAttacks}
          enemies={enemies}
        />
        <RenderElements.RenderCharacter
          character={character}
          showBattleModal={showBattleModal}
        />
        <div className="flex flex-row justify-center items-center">
          {targetedEnemyIndex > -1 &&
            character.attacks.length > 0 &&
            character.mana > 0 &&
            !characterHasEffect(character, "Stun") &&
            CastingSpellOptions()}
        </div>
        {!showBattleModal && (
          <div className="flex flex-row justify-center">
            <button
              className="flex px-2 py-2 m-2 rounded bg-green-700 hover:bg-gray-300 hover:text-green-700"
              onClick={() => handleInventoryModal()}
            >
              Inventory
            </button>
            <button
              className="flex px-2 py-2 m-2 rounded bg-red-700 hover:bg-gray-300 hover:text-red-700"
              onClick={() => EndTurnWrapper()}
            >
              End Turn
            </button>
          </div>
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

      <Modals.InventoryModal
        character={character}
        currentAttackIndex={currentAttackIndex}
        setCurrentAttackIndex={setCurrentAttackIndex}
        showInventoryModal={showInventoryModal}
        handleInventoryModal={handleInventoryModal}
        showBattleModal={showBattleModal}
        handleBattleModal={handleBattleModal}
        updateCharacter={updateCharacter}
        enemies={enemies}
        setEnemies={setEnemies}
        handleShopModal={handleShopModal}
        reset={ResetRendering}
        nextFloor={nextFloor}
      />
      {/*  */}

      <Modals.SpellbookModal
        character={character}
        currentAttackIndex={currentAttackIndex}
        setCurrentAttackIndex={setCurrentAttackIndex}
        showAttackModal={showSpellbookModal}
        handleSpellbookModal={handleSpellbookModal}
        showBattleModal={showBattleModal}
        handleBattleModal={handleBattleModal}
      />
    </>
  );

  function TargetingHelpers() {
    return (
      <div className={"flex justify-around text-white"}>
        {enemies.map((enemy, index) => {
          return (
            <p
              key={index}
              className={
                css(animations.animate) +
                (showSelectHelper
                  ? " text-red-600 line-through"
                  : " line-through")
              }
            >
              ^^^
            </p>
          );
        })}
      </div>
    );
  }

  function CastingSpellOptions() {
    if (showBattleModal) {
      return;
    }
    return (
      <div className="flex justify-center items-center flex-col mx-2 ">
        <div
          className={
            spellInfoClassName +
            (currentAttackIndex > -1
              ? spellInfoBorders + "border-t-2 mt-2 pt-2"
              : " ")
          }
        >
          {character.mana > 0 && RenderCasts(character, currentAttackIndex)}
        </div>
        <div
          className={
            spellInfoClassName +
            (currentAttackIndex > -1 ? spellInfoBorders + "border-b-2" : " ")
          }
        >
          <button
            className="flex self-center px-2 py-2 m-2 rounded bg-green-700 hover:bg-gray-300 hover:text-green-700"
            onClick={() => {
              setCurrentAttackIndex(-1);
              handleSpellbookModal();
            }}
          >
            Select Spell
          </button>
          {currentAttackIndex > -1 && character.mana > 0 && (
            <button
              className="flex self-center px-2 py-2 m-2 rounded bg-blue-700 hover:bg-gray-300 hover:text-blue-700"
              onClick={() => CastSpellWrapper()}
            >
              {"Cast " + character.attacks[currentAttackIndex].displayName}
            </button>
          )}
        </div>
      </div>
    );
  }

  function EndTurnWrapper() {
    CastSpell(
      character,
      updateCharacter,
      enemies,
      setEnemies,
      allEnemies,
      -1,
      -1,
      ResetRendering,
      setEnemyAttacks,
      handleShopModal,
      setLost,
      nextFloor
    );
  }

  function CastSpellWrapper() {
    CastSpell(
      character,
      updateCharacter,
      enemies,
      setEnemies,
      allEnemies,
      currentAttackIndex,
      targetedEnemyIndex,
      ResetRendering,
      setEnemyAttacks,
      handleShopModal,
      setLost,
      nextFloor
    );
  }
}
