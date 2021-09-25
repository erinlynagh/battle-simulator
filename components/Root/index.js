import { useEffect, useState } from "react";
import { StyleSheet, css } from "aphrodite";
import { flash as animation } from "react-animations";

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

export default function Root() {
  //one-time states
  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);
  //modal states
  const [showSpellbookModal, setShowSpellbookModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [showBattleModal, setShowBattleModal] = useState(false);
  const [alternateModal, setAlternateModal] = useState(0);
  //global game states
  const allEnemies = makeAllEnemies();
  const [floor, setFloor] = useState(0);
  const [character, updateCharacter] = useState(makeCharacter());
  const [enemies, setEnemies] = useState(allEnemies[floor]);
  const [showSelectHelper, setShowSelectHelper] = useState(true);
  //per-battle game states
  const [enemyAttacks, setEnemyAttacks] = useState([]);
  const [currentAttackIndex, setCurrentAttackIndex] = useState(0);
  const [targetedEnemyIndex, setTargetedEnemyIndex] = useState(-1);

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

  const HandleModalFunctions = [handleSpellbookModal, handleShopModal];
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

  function updateFloor() {
    let newFloor = floor + 1;
    setFloor(newFloor);
  }

  function ResetRendering() {
    // save character, floor, enemies (and potentially allEnemies once it becomes random) to local storage, load on reload
    let myStorage = window.localStorage;
    setShowSpellbookModal(false);
    setShowBattleModal(false);
    setEnemyAttacks([]);
    setCurrentAttackIndex(-1);
    setTargetedEnemyIndex(-1);
  }

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.code === "KeyF") {
        fullscreen();
      }
    });
    setAlternateModal(setShowSpellbookModal());
    setIsDocumentLoaded(true);
    console.log("loading data...");
    const [newEnemiesString, newFloorString, newCharacterString] = [
      localStorage.getItem("enemies"),
      localStorage.getItem("floor"),
      localStorage.getItem("character"),
    ];
    console.log(newEnemiesString, newFloorString, newCharacterString);
    const newEnemies = JSON.parse(newEnemiesString);
    const newFloor = JSON.parse(newFloorString);
    const newCharacter = JSON.parse(newCharacterString);
    console.log(newEnemies, newFloor, newCharacter);
    if (newEnemies && newFloor && newCharacter) {
      setEnemies(newEnemies);
      setFloor(newFloor);
      updateCharacter(newCharacter);
    }
  }, []);

  useEffect(() => {
    console.log("setting data...");
    console.log(enemies);
    localStorage.setItem("floor", JSON.stringify(floor));
    localStorage.setItem("character", JSON.stringify(character));
    localStorage.setItem("enemies", JSON.stringify(enemies));
    if (enemies.length === 1) {
      setTargetedEnemyIndex(0);
    }
  }, [enemies]);

  const spellInfoClassName =
    "flex justify-center flex-row w-full md:w-1/2 lg:w-1/3 ";

  const spellInfoBorders =
    " border-l-2 border-r-2 bg-gray-900 border-gray-700z ";
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
        {targetedEnemyIndex > -1 &&
          !character.hasEffect("Stun") &&
          CastingSpellOptions()}
        {(targetedEnemyIndex < 0 && !showSelectHelper) ||
          (character.hasEffect("Stun") && (
            <button
              className="flex self-center px-2 py-2 m-2 rounded bg-red-700 hover:bg-gray-300 hover:text-red-700 lg:fixed lg:bottom-2 lg:right-3"
              onClick={() => CastSpellWrapper()}
            >
              End Turn
            </button>
          ))}
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
      <div className="flex justify-center items-center flex-col">
        <div
          className={
            spellInfoClassName +
            (currentAttackIndex > -1
              ? spellInfoBorders + "border-t-2 mt-2 pt-2"
              : " ")
          }
        >
          {RenderCasts(character, currentAttackIndex)}
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
            {currentAttackIndex > -1 ? "Change" : "Select"} Spell
          </button>
          {currentAttackIndex > -1 && (
            <button
              className="flex self-center px-2 py-2 m-2 rounded bg-red-700 hover:bg-gray-300 hover:text-red-700"
              onClick={() => CastSpellWrapper()}
            >
              {"Cast " + character.attacks[currentAttackIndex].displayName}
            </button>
          )}
        </div>
      </div>
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
      floor,
      updateFloor,
      ResetRendering,
      setEnemyAttacks,
      handleShopModal
    );
  }
}
