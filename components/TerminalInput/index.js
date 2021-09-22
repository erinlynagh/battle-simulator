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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          textAlign: "center",
        }}
      >
        <button
          className="btn btn-submit"
          style={{
            marginTop: "1.33em",
            backgroundColor: "#C50F1F",
            borderColor: "#C50F1F",
          }}
          onClick={() =>
            AttackPlayerFromStun(
              character,
              enemies,
              setEnemyAttacks,
              updateCharacter,
              updateEnemies
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <button
                type="button"
                className={"btn form-btn top-btn"}
                style={{
                  marginBottom: "1.33em",
                }}
                value="attack"
                onClick={handleButtonClick}
              >
                {showAttacks ? "Use an Item" : "Attack"}
              </button>
              {showAttacks && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  {character.attacks.map((attack, index) => {
                    return (
                      <span data-tip={attack.getTooltip()} key={index}>
                        <button
                          type="button"
                          className={
                            selectedAttackId === index
                              ? "btn form-btn selected"
                              : "btn form-btn"
                          }
                          style={{ marginBottom: "1.33em" }}
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  {Array.isArray(enemies) &&
                    enemies.map((enemy, index) => {
                      return (
                        <button
                          type="button"
                          className={
                            selectedTargetId === index
                              ? "btn form-btn selected"
                              : "btn form-btn"
                          }
                          style={{ marginBottom: "1.33em" }}
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
                <button
                  type="submit"
                  className="btn form-btn btn-submit"
                  style={{
                    marginBottom: "1.33em",
                    backgroundColor: "#C50F1F",
                    borderColor: "#C50F1F",
                  }}
                  onClick={handleSubmit}
                >
                  {showAttacks ? "Attack" : "Use Item"}
                </button>
              )}
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default TerminalInput;
