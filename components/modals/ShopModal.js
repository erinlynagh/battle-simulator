import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import * as Attacks from "../../library/generation/attackMaker/attacks";
import * as TierOne from "../../library/generation/attackMaker/TierThree";
import * as TierTwo from "../../library/generation/attackMaker/TierTwo";
import * as TierThree from "../../library/generation/attackMaker/TierOne";
import { makeNewCharacter, makeNewAttack } from "../../library/copyClasses";
import dynamic from "next/dynamic";
import random from "random";
const emoji = require("emoji-dictionary");
const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

Modal.setAppElement("#root");

const generateButtonClass = "py-2 px-4 rounded mx-2 md:w-1/2";
const generateButtonEnabled = generateButtonClass + " bg-green-700";
const generateButtonDisabled = generateButtonClass + " bg-gray-600";

export default function ShopModal({
  showShopModal,
  handleShopModal,
  character,
  updateCharacter,
  showBattleModal,
  handleBattleModal,
}) {
  const TierOneAttacksArray = Object.keys(TierOne);
  const TierTwoAttacksArray = Object.keys(TierTwo);
  const TierThreeAttacksArray = Object.keys(TierThree);
  const [showSelectCards, setShowSelectCards] = useState(false);
  const [randomAttacks, setRandomAttacks] = useState([]);

  function handleClick() {
    setShowSelectCards(false);
    handleShopModal();
  }

  // shop state variables
  const [selectedTier, setSelectedTier] = useState(0);
  const [selectedArray, setSelectedArray] = useState(TierOneAttacksArray);
  const [numberOfCards, setNumberOfCards] = useState(3);
  const [cost, setCost] = useState(0);
  const [shopButtonClassName, setShopButtonClassName] = useState(
    generateButtonEnabled
  );

  // help state variables
  const [showHelp, setShowHelp] = useState(false);
  function handleShowHelp() {
    setShowHelp(!showHelp);
  }

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

  function selectAttack(attack) {
    getThreeRandomAttacks();
    let newCharacter = makeNewCharacter(character);
    let attackIndex = getCharacterAttackIndex(character, attack);
    newCharacter.coins -= cost;
    if (attackIndex > -1) {
      newCharacter.attacks[attackIndex].casts += attack.casts;
    } else {
      newCharacter.attacks.push(attack);
    }
    updateCharacter(newCharacter);
    handleShopModal();
    setShowSelectCards(false);
    setSelectedTier(0);
    setSelectedArray(TierOneAttacksArray);
    setNumberOfCards(3);
    setCost(0);
    setShopButtonClassName(generateButtonEnabled);
  }

  function getCharacterAttackIndex(character, attack) {
    return character.attacks.findIndex(({ name }) => name === attack.name);
  }
  function getAttackIndex(attacks, attack) {
    return attacks.findIndex(({ name }) => name === attack);
  }

  const bottomDivClassName = "absolute bottom-4";
  const xDisplacement = 4;
  const bottomRightClassName = bottomDivClassName + " right-" + xDisplacement;
  const bottomLeftClassName = bottomDivClassName + " left-" + xDisplacement;

  return (
    <Modal
      isOpen={showShopModal}
      contentLabel="Pick your new spell!"
      style={{
        content: {
          background: "black",
          height: "100%",
          inset: "0",
          border: "0",
        },
        overlay: { background: "#323232" },
      }}
    >
      <div className="flex flex-col h-full">
        <div className="mb-2">
          {!showHelp && !showSelectCards && Shop()}
          {!showHelp && showSelectCards && SelectCards()}
          {showHelp && ShowHelp()}
        </div>
        <div className="flex mt-auto justify-evenly">
          <button
            className="text-gray-300 flex-1 py-2 px-4 rounded bg-blue-700 mx-3"
            onClick={() => handleShowHelp()}
          >
            {showHelp ? "X" : "?"}
          </button>
          <button
            className="text-gray-300 flex-1 py-2 px-4 rounded bg-green-600 mx-3"
            onClick={() => handleBattleModal()}
          >
            {showBattleModal ? "X" : emoji.getUnicode("eyes")}
          </button>
          <button
            className="text-gray-300 flex-1 py-2 px-4 rounded bg-red-600 mx-3"
            onClick={() => handleClick()}
          >
            Skip
          </button>
        </div>
      </div>
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
        setShopButtonClassName(generateButtonDisabled);
      } else {
        setShopButtonClassName(generateButtonEnabled);
      }
    }

    function decreaseTier() {
      var newTier = selectedTier;
      var newNumberOfCards = numberOfCards;
      if (selectedTier > 0) {
        newTier -= 1;
        setSelectedTier(newTier);
        setSelectedArray(TierArrays[newTier]);
        newNumberOfCards = ValidateNumberOfCards(newTier, newNumberOfCards);
      }
      updateCost(newTier, newNumberOfCards);
    }
    function increaseTier() {
      var newTier = selectedTier;
      var newNumberOfCards = numberOfCards;
      if (selectedTier < TierArrays.length - 1) {
        newTier += 1;
        setSelectedTier(newTier);
        setSelectedArray(TierArrays[newTier]);
        newNumberOfCards = ValidateNumberOfCards(newTier, newNumberOfCards);
      }
      updateCost(newTier, newNumberOfCards);
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
      var newNumberOfCards = numberOfCards;
      if (numberOfCards < TierArrays[selectedTier].length) {
        newNumberOfCards += 1;
        setNumberOfCards(newNumberOfCards);
      }
      updateCost(selectedTier, newNumberOfCards);
    }
    function ValidateNumberOfCards(newTier, newNumberOfCards) {
      if (newNumberOfCards > TierArrays[newTier].length) {
        newNumberOfCards = TierArrays[newTier].length;
        setNumberOfCards(newNumberOfCards);
      }
      return newNumberOfCards;
    }
    return (
      <div className="text-center text-gray-300">
        <h1 className={"text-2xl"}>
          <span className="text-green-600">Buy</span> a new Spell
        </h1>
        <h2>
          You have <span className="text-yellow-400">${character.coins}</span>{" "}
          left to spend
        </h2>
        <h4 className="text-xs">You could win:</h4>
        <div className="block overflow-auto h-96 lg:w-1/2 border-yellow-200 border-2 mx-auto mb-3">
          {Array.isArray(TierArrays[selectedTier]) &&
            TierArrays[selectedTier].map((attackName, index) => {
              var attack = Attacks[[attackName]]();
              var className = `bg-gray-900 text-center m-2 hover:bg-gray-800`;
              return (
                <div className={className} key={index}>
                  <h4 className="text-red-400 mt-2">{attack.displayName}</h4>
                  <p>{attack.getTooltip()}</p>
                  <p className="mt-auto">Casts: {attack.casts}</p>
                </div>
              );
            })}
        </div>
        <div className="flex flex-row justify-evenly text-center mb-5">
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
        <div className="flex flex-col items-center">
          <button
            className={shopButtonClassName}
            onClick={() => getThreeRandomAttacks()}
            disabled={character.coins < cost}
          >
            Pay ${cost} for {numberOfCards} cards
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
                      <b className="text-red-400">{attack.displayName}</b>
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

  function ShowHelp() {
    return (
      <div className="text-gray-300 ">
        <h1 className="text-center text-2xl text-green-700">Help</h1>
        <p>
          Every time that you kill an enemy, you are brought to the shop, you
          can spend the <span className="underline text-yellow-400">coins</span>{" "}
          you earn by winning battles to obtain{" "}
          <span className="underline text-red-700">one</span> new spell each
          time you come.
          <br />
          <br />
          Select the power level and the amount of cards you want to buy using
          the buttons at the bottom, and you can pick{" "}
          <span className="underline text-red-700">one</span> of the spells that
          are shown.
        </p>
      </div>
    );
  }
}
