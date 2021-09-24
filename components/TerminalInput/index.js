import React, { useState } from "react";
import { AttackEnemy, AttackPlayerFromStun } from "../../library/battle/attack";
import dynamic from "next/dynamic";
const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

function TerminalInput(props) {
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
  // for rendering
  const [showAttacks, setShowAttacks] = useState(true);
  const [showTargets, setShowTargets] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [selectedAttackId, setSelectedAttackId] = useState("");
  const [selectedTargetId, setSelectedTargetId] = useState("");
  // more useful data
  const [selectedAttack, setSelectedAttack] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");

  function handleSubmit(event) {
    AttackEnemy(
      character,
      updateCharacter,
      selectedAttack,
      selectedTarget,
      enemies,
      updateEnemies,
      allEnemies,
      floor,
      updateFloor,
      reset,
      setEnemyAttacks,
      handleAttackModal
    );
    event.preventDefault();
  }

  function reset() {
    // setShowAttacks(false);
    // setShowItems(false);
    setSelectedAttackId("");
    setSelectedAttack(false);
    setSelectedTarget("");
    setSelectedTargetId("");
    setShowTargets(false);
    setShowSubmit(false);
  }

  function handleButtonClick() {
    setShowAttacks(!showAttacks);
  }

  function handleAttackButtonClick(event) {
    setSelectedAttackId(parseInt(event.target.value));
    if (parseInt(event.target.value) === selectedAttackId) {
      reset();
    } else {
      setSelectedAttack(event.target.name);
      setShowTargets(true);
    }
  }

  function handleTargetButtonClick(event) {
    setSelectedTargetId(parseInt(event.target.value));
    setSelectedTarget(event.target.name);
    setShowSubmit(true);
  }

  if (character.hasEffect("Stun")) {
    return (
      <div className="flex flex-row justify-evenly flex-wrap text-center">
        <button
          className="mt-1 bg-red-700 rounded px-4 py-2 hover:text-red-700 hover:bg-gray-300"
          onClick={handleSubmit}
        >
          You are Stunned
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row justify-evenly flex-wrap w-screen">
        <button
          type="button"
          value="attack"
          className="bg-green-900 m-2 py-2 px-4 rounded"
          onClick={handleButtonClick}
        >
          {showAttacks ? "Use an Item" : "Attack"}
        </button>
        {showAttacks && (
          <div className="flex justify-evenly flex-row w-screen flex-wrap ">
            {character.attacks.map((attack, index) => {
              return (
                <span
                  data-tip={attack.getTooltip()}
                  key={index}
                  className="self-center m-2 w-5/12"
                >
                  <button
                    type="button"
                    className={
                      selectedAttackId === index
                        ? "bg-blue-900 py-2 px-4 rounded w-full h-full"
                        : "bg-gray-900 hover:text-blue-900 hover:bg-gray-300 py-2 px-4 rounded w-full h-full"
                    }
                    value={index}
                    name={attack.name}
                    onClick={handleAttackButtonClick}
                  >
                    {attack.name.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")} (
                    {attack.casts})
                    <ReactTooltip />
                  </button>
                </span>
              );
            })}
          </div>
        )}
        {showTargets && (
          <div className="flex justify-around flex-row w-screen">
            {Array.isArray(enemies) &&
              enemies.map((enemy, index) => {
                return (
                  <button
                    type="button"
                    className={
                      selectedTargetId === index
                        ? "bg-pink-600 text-gray-300 m-2 py-2 px-4 rounded"
                        : "bg-gray-900 hover:text-pink-600 hover:bg-gray-300 m-2 py-2 px-4 rounded"
                    }
                    value={index}
                    name={enemy.id}
                    key={index}
                    onClick={handleTargetButtonClick}
                  >
                    {enemy.name}
                  </button>
                );
              })}
          </div>
        )}
        {showSubmit ? (
          <div className="flex justify-evenly">
            <button
              type="submit"
              className="bg-red-900 py-2 px-4 rounded hover:bg-gray-400 hover:text-red-900"
              onClick={handleSubmit}
            >
              {showAttacks ? "Attack" : "Use Item"}
            </button>
          </div>
        ) : (
          <>
            {!showTargets && (
              <div className="flex justify-center items-end">
                <button
                  type="submit"
                  className="bg-yellow-600 py-2 px-4 rounded hover:bg-gray-300 hover:text-yellow-600"
                  value="end turn"
                  onClick={handleSubmit}
                >
                  End Turn
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

export default TerminalInput;
