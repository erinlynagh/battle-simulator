import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import * as Attacks from "../../library/generation/attackMaker/attacks";
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
  console.log(Attacks);
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
    getThreeRandomAttacks();
    let newCharacter = makeNewCharacter(character);
    let attackIndex = getCharacterAttackIndex(character, attack);
    if (attackIndex > -1) {
      newCharacter.attacks[attackIndex].casts += attack.casts;
    } else {
      newCharacter.attacks.push(attack);
    }
    updateCharacter(newCharacter);
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
      <div className="flex flex-col items-center text-gray-300 text-center">
        <div className="flex">
          <p>Select a New Attack</p>
        </div>
        <div className="text-center flex flex-col flex-wrap">
          {Array.isArray(randomAttacks) &&
            randomAttacks.map((attack, index) => {
              var className = `bg-gray-900 m-1 grid-row-1 col-${index} hover:bg-gray-800`;
              return (
                <div className={className} key={index}>
                  <div className="px-1 py-2 flex flex-col h-full">
                    <h4>
                      <b className="text-red-400">
                        {attack.name.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}
                      </b>
                    </h4>
                    <p>{attack.getTooltip()}</p>
                    <p className="mt-auto mb-1">Casts: {attack.casts}</p>
                    <ReactTooltip html={true} />
                    <button
                      type="button"
                      className="py-2 rounded bg-green-600 w-4/12 self-center"
                      value={attack.name}
                      onClick={() => selectAttack(attack)}
                    >
                      Select
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex items-end mt-2">
          <button
            className="py-2 px-4 rounded bg-blue-600 mx-2"
            onClick={() => getThreeRandomAttacks()}
          >
            ReRoll
          </button>
          <button
            className="py-2 px-4 rounded bg-blue-600 mx-2"
            onClick={() => handleClick()}
          >
            Skip
          </button>
        </div>
      </div>
    </Modal>
  );
}
