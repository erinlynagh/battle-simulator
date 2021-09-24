import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import * as Attacks from "../../library/generation/attackMaker/attacks";
import * as TierOne from "../../library/generation/attackMaker/TierThree";
import * as TierTwo from "../../library/generation/attackMaker/TierTwo";
import * as TierThree from "../../library/generation/attackMaker/TierOne";
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
  const TierOneAttacksArray = Object.keys(TierOne);
  const TierTwoAttacksArray = Object.keys(TierTwo);
  const TierThreeAttacksArray = Object.keys(TierThree);
  const [showSelectCards, setShowSelectCards] = useState(false);
  const [randomAttacks, setRandomAttacks] = useState([]);

  // shop state variables
  const [selectedTier, setSelectedTier] = useState(0);
  const [selectedArray, setSelectedArray] = useState(TierOneAttacksArray);
  const [numberOfCards, setNumberOfCards] = useState(3);
  const [cost, setCost] = useState(0);
  const [shopButtonClassName, setShopButtonClassName] = useState(
    "py-2 px-4 rounded mx-2 w-1/3 bg-blue-700"
  );

  function getThreeRandomAttacks() {
    const endIndex = selectedArray.length - 1;
    setShowSelectCards(true);
    setRandomAttacks([]);
    let randAttacks = [];
    while (randAttacks.length < numberOfCards) {
      // this broken, we need more cards
      let newAttack = selectedArray[random.int(0, endIndex)];
      if (getAttackIndex(randAttacks, newAttack) === -1) {
        newAttack = Attacks[[newAttack]]();
        randAttacks.push(makeNewAttack(newAttack));
      }
    }
    setRandomAttacks(randAttacks);
  }

  function handleClick() {
    setShowSelectCards(false);
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

  return (
    <Modal
      isOpen={showAttackModal}
      contentLabel="Get a new attack"
      style={{
        content: { background: "#0c0c0c" },
        overlay: { background: "#323232" },
      }}
    >
      {!showSelectCards && Shop()}
      {showSelectCards && SelectCards()}
      <button
        className="py-2 px-4 rounded bg-blue-600 mx-2 text-gray-300 self-center"
        onClick={() => handleClick()}
      >
        Skip
      </button>
    </Modal>
  );

  function Shop() {
    var TierArrays = [
      TierOneAttacksArray,
      TierTwoAttacksArray,
      TierThreeAttacksArray,
    ];

    function updateCost(tier, number) {
      var newCost = (tier + 1) * number - 3;
      setCost(newCost);
      if (newCost > character.coins) {
        setShopButtonClassName("py-2 px-4 rounded mx-2 w-1/3 bg-gray-600");
      } else {
        setShopButtonClassName("py-2 px-4 rounded mx-2 w-1/3 bg-blue-700");
      }
    }

    function decreaseTier() {
      var newTier = selectedTier;
      if (selectedTier > 0) {
        newTier -= 1;
        setSelectedTier(newTier);
        setSelectedArray(TierArrays[newTier]);
      }
      updateCost(newTier, numberOfCards);
    }
    function increaseTier() {
      var newTier = selectedTier;
      if (selectedTier < TierArrays.length - 1) {
        newTier += 1;
        setSelectedTier(newTier);
        setSelectedArray(TierArrays[newTier]);
      }
      updateCost(newTier, numberOfCards);
    }
    function decreaseCards() {
      var newNumberOfCards = numberOfCards;
      if (numberOfCards > 3) {
        newNumberOfCards -= 1;
        setNumberOfCards(numberOfCards - 1);
      }
      updateCost(selectedTier, newNumberOfCards);
    }
    function increaseCards() {
      var newNumberOfCards = numberOfCards + 1;
      if (numberOfCards < TierArrays[selectedTier].length) {
        setNumberOfCards(newNumberOfCards);
      }
      updateCost(selectedTier, newNumberOfCards);
    }
    return (
      <div className="text-center text-gray-300">
        <h1 className={"text-2xl"}>Buy New Attacks</h1>
        <div className="flex flex-row justify-around text-center">
          <div>
            <p>Power Level:</p>
            <button
              className="bg-blue-700 px-2 py-1 rounded"
              onClick={() => decreaseTier()}
            >
              &lt;
            </button>
            <span> {selectedTier} </span>
            <button
              className="bg-blue-700 px-2 py-1 rounded"
              onClick={() => increaseTier()}
            >
              &gt;
            </button>
          </div>
          <div>
            <p>Number of Cards:</p>
            <button
              className="bg-blue-700 px-2 py-1 rounded"
              onClick={() => decreaseCards()}
            >
              &lt;
            </button>
            <span> {numberOfCards} </span>
            <button
              className="bg-blue-700 px-2 py-1 rounded"
              onClick={() => increaseCards()}
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-2/3 overflow-auto">
          {Array.isArray(TierArrays[selectedTier]) &&
            TierArrays[selectedTier].map((attackName, index) => {
              var attack = Attacks[[attackName]]();
              var className = `bg-gray-900 text-center m-2 row-${
                1 + Math.floor(index / 3)
              }  hover:bg-gray-800`;
              return (
                <div className={className} key={index}>
                  <h4 className="text-red-400 mt-2">
                    {attack.name.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}
                  </h4>
                  <p>{attack.getTooltip()}</p>
                  <p className="mt-auto">Casts: {attack.casts}</p>
                </div>
              );
            })}
        </div>
        <div className="flex flex-col items-center mt-2">
          You have {character.coins} to spend
          <button
            className={shopButtonClassName}
            onClick={() => getThreeRandomAttacks()}
            disabled={character.coins < cost}
          >
            Pay {cost} to Generate {numberOfCards} cards
          </button>
        </div>
      </div>
    );
  }

  function SelectCards() {
    return (
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
        </div>
      </div>
    );
  }
}
