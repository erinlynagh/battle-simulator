import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import * as Attacks from "../../library/generation/attackMaker";
import {
  makeNewCharacter,
  makeNewAttack,
} from "../../library/generation/createNewStateObjects";
import dynamic from "next/dynamic";
import random from "random";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

Modal.setAppElement("#root");

export default function GetNewAttackModal({
  showAttackModal,
  handleAttackModal,
  character,
  updateCharacter,
}) {
  const AttacksArray = Object.keys(Attacks);
  const endIndex = AttacksArray.length - 1;
  const [randomAttacks, setRandomAttacks] = useState([]);

  function getThreeRandomAttacks() {
    setRandomAttacks([]);
    let randAttacks = [];
    while (randAttacks.length < 3) {
      let newAttack = AttacksArray[random.int(0, endIndex)];
      if (getAttackIndex(randAttacks, newAttack) === -1) {
        newAttack = Attacks[[newAttack]]();
        randAttacks.push(makeNewAttack(newAttack));
      }
    }
    setRandomAttacks(randAttacks);
  }

  function handleClick() {
    handleAttackModal();
  }

  function selectAttack(attack) {
    let newCharacter = makeNewCharacter(character);
    let attackIndex = getCharacterAttackIndex(character, attack);
    if (attackIndex > -1) {
      newCharacter.attacks[attackIndex].casts += attack.casts;
    } else {
      newCharacter.attacks.push(attack);
    }
    updateCharacter(newCharacter);
    getThreeRandomAttacks();
    handleAttackModal();
  }

  function getCharacterAttackIndex(character, attack) {
    return character.attacks.findIndex(({ name }) => name === attack.name);
  }
  function getAttackIndex(attacks, attack) {
    return attacks.findIndex(({ name }) => name === attack);
  }

  useEffect(() => {
    getThreeRandomAttacks();
  }, []);

  return (
    <Modal
      isOpen={showAttackModal}
      contentLabel="Get a new attack"
      style={{
        content: { background: "#0c0c0c" },
        overlay: { background: "#323232" },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#0c0c0c",
        }}
      >
        <div style={{ display: "flex" }}>
          <p>Select a New Attack</p>
        </div>
        <div className="grid cards-container">
          {Array.isArray(randomAttacks) &&
            randomAttacks.map((attack, index) => {
              return (
                <div
                  className="card"
                  key={index}
                  style={{
                    margin: "1em",
                    gridColumn: index,
                    gridRow: 1,
                  }}
                >
                  <div
                    className="container"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <h4 style={{ marginBottom: "0px" }}>
                      <b>
                        {attack.name.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}
                      </b>
                    </h4>
                    <p data-tip={attack.effect.getTooltip()}>
                      {attack.getTooltip()}
                    </p>
                    <p style={{ marginTop: "auto", marginBottom: "0.3vh" }}>
                      Casts: {attack.casts}
                    </p>
                    <ReactTooltip html={true} />
                    <button
                      type="button"
                      className="btn"
                      value={attack.name}
                      style={{ marginTop: "0px", marginBottom: "0.3vh" }}
                      onClick={() => selectAttack(attack)}
                    >
                      Select
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div style={{ display: "flex", alignItems: "end", marginTop: "2vh" }}>
          <button className="btn" onClick={() => getThreeRandomAttacks()}>
            ReRoll
          </button>
          <button className="btn" onClick={() => handleClick()}>
            Skip
          </button>
        </div>
      </div>
    </Modal>
  );
}

function xorShift(seed) {
  seed ^= seed << 13;
  seed ^= seed >> 17;
  seed ^= seed << 5;
  return seed < 0 ? ~seed + 1 : seed; //2's complement of the negative result to make all numbers positive.
}
