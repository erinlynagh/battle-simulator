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
  const [showAttacks, setShowAttacks] = useState(false);
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
    setShowTargets(false);
    setSelectedAttackId("");
    setSelectedAttack(false);
    setSelectedTarget("");
    setSelectedTargetId("");
    setShowSubmit(false);
  }

  function handleButtonClick() {
    setShowAttacks(!showAttacks);
  }

  function handleAttackButtonClick(event) {
    setSelectedAttackId(parseInt(event.target.value));
    setSelectedAttack(event.target.name);
    if (Array.isArray(enemies)) {
      setShowTargets(true);
    } else {
      setSelectedTarget(enemies);
      setShowSubmit(true);
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
          className="mt-1 bg-red-700"
          onClick={() =>
            AttackPlayerFromStun(
              character,
              enemies,
              setEnemyAttacks,
              updateCharacter,
              updateEnemies,
              floor,
              allEnemies,
              updateFloor,
              reset
            )
          }
        >
          You are Stunned
        </button>
      </div>
    );
  } else {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-evenly flex-wrap">
            <div className="flex flex-row justify-evenly flex-wrap w-screen">
              <button
                type="button"
                value="attack"
                className="bg-green-900 mb-2 py-2 px-4 rounded"
                onClick={handleButtonClick}
              >
                {showAttacks ? "Use an Item" : "Attack"}
              </button>
              {showAttacks && (
                <div className="flex justify-evenly flex-row w-screen">
                  {character.attacks.map((attack, index) => {
                    return (
                      <span
                        data-tip={attack.getTooltip()}
                        key={index}
                        className="w-full self-center m-2 h-full"
                      >
                        <button
                          type="button"
                          className={
                            selectedAttackId === index
                              ? "bg-blue-900 py-2 px-4 rounded h-full w-full"
                              : "bg-gray-900 hover:text-blue-900 hover:bg-gray-300 py-2 px-4 rounded h-full w-full"
                          }
                          value={index}
                          name={attack.name}
                          onClick={handleAttackButtonClick}
                        >
                          {attack.name.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")} (
                          {attack.casts} casts remain)
                          <ReactTooltip />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
              {showTargets && (
                <div className="flex justify-evenly flex-row w-screen">
                  {Array.isArray(enemies) &&
                    enemies.map((enemy, index) => {
                      return (
                        <button
                          type="button"
                          className={
                            selectedTargetId === index
                              ? "bg-pink-600 text-gray-300 m-2 py-2 px-4 rounded w-full"
                              : "bg-gray-900 hover:text-pink-600 hover:bg-gray-300 m-2 py-2 px-4 rounded w-full"
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
              {showSubmit && (
                <div className="flex justify-evenly">
                  <button
                    type="submit"
                    className="bg-red-900 py-2 px-4 rounded hover:bg-red-700"
                    onClick={handleSubmit}
                  >
                    {showAttacks ? "Attack" : "Use Item"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default TerminalInput;
