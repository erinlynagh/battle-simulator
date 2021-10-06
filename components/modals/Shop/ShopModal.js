import React, { useState } from "react";
import Modal from "react-modal";
import * as ShopHelpers from "./ShopHelpers";
import * as Attacks from "../../../library/generation/attackMaker/attacks";
import * as Items from "../../../library/generation/itemMaker/itemsMaker";
import * as Accessories from "../../../library/generation/accessoryMaker/accessorMaker";
import * as TierOne from "../../../library/generation/attackMaker/TierThree";
import * as TierTwo from "../../../library/generation/attackMaker/TierTwo";
import * as TierThree from "../../../library/generation/attackMaker/TierOne";
import {
  makeNewCharacter,
  makeNewAttack,
  makeNewItem,
  MakeNewAccessory,
} from "../../../library/copyClasses";
import { getAttackTooltip } from "../../../library/classes";
import dynamic from "next/dynamic";
import random from "random";
import ApplyAccessories from "../../../library/generation/accessoryMaker/applyAccessories";
const emoji = require("emoji-dictionary");
const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

Modal.setAppElement("#root");

export default function ShopModal({
  showShopModal,
  handleShopModal,
  character,
  updateCharacter,
  showBattleModal,
  handleBattleModal,
}) {
  const numberOfObjects = 3;
  const TierOneAttacksArray = ToObjectArray(Object.keys(TierOne), Attacks);
  const TierTwoAttacksArray = ToObjectArray(Object.keys(TierTwo), Attacks);
  const TierThreeAttacksArray = ToObjectArray(Object.keys(TierThree), Attacks);
  let AccessoriesArray = ToObjectArray(Object.keys(Accessories), Accessories);

  AccessoriesArray = AccessoriesArray.filter(({ name }) => {
    return !character.accessories.some((x) => x.name === name); //remove items that the player has from the pool
  });

  const ItemsArray = ToObjectArray(Object.keys(Items), Items);
  const [showSelectObjects, setShowSelectObjects] = useState(false);
  const [randomObjects, setRandomObjects] = useState([]);
  const TierArrays = [
    TierOneAttacksArray,
    TierTwoAttacksArray,
    TierThreeAttacksArray,
    ItemsArray,
    AccessoriesArray,
  ];

  function handleClick() {
    setShowSelectObjects(false);
    handleShopModal();
  }

  // shop state variables
  const [selectedTier, setSelectedTier] = useState(0);
  const [selectedObjectArray, setSelectedObjectArray] =
    useState(TierOneAttacksArray);
  const [cost, setCost] = useState(0);
  const [shopButtonClassName, setShopButtonClassName] = useState(
    ShopHelpers.generateButtonEnabled
  );

  // help state variables
  const [showHelp, setShowHelp] = useState(false);
  function handleShowHelp() {
    setShowHelp(!showHelp);
  }

  function getThreeRandomAttacks() {
    const endIndex = selectedObjectArray.length - 1;
    setShowSelectObjects(true);
    setRandomObjects([]);
    let randAttacks = getRandomAttacks(
      numberOfObjects,
      selectedObjectArray,
      endIndex,
      selectedTier
    );
    setRandomObjects(randAttacks);
  }

  function selectAttack(objectToAdd) {
    getThreeRandomAttacks();
    AddObjectToCharacterWrapper(objectToAdd);
    handleShopModal();
    setShowSelectObjects(false);
    setSelectedTier(0);
    setSelectedObjectArray(TierOneAttacksArray);
    setCost(0);
    setShopButtonClassName(ShopHelpers.generateButtonEnabled);
  }

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
          {!showHelp && !showSelectObjects && Shop()}
          {!showHelp && showSelectObjects && SelectCards()}
          {showHelp && ShowHelp()}
        </div>
        <Footer />
      </div>
    </Modal>
  );

  function Footer() {
    return (
      <div className="flex mt-auto justify-evenly">
        <button
          className="text-gray-300 flex-1 py-2 px-4 rounded bg-blue-700 mx-3 hover:text-blue-700 hover:bg-gray-300"
          onClick={() => handleShowHelp()}
        >
          {showHelp ? "X" : "?"}
        </button>
        <button
          className="text-gray-300 flex-1 py-2 px-4 rounded bg-green-600 mx-3 hover:text-green-600 hover:bg-gray-300"
          onClick={() => handleBattleModal()}
        >
          {showBattleModal ? "X" : emoji.getUnicode("eyes")}
        </button>
        <button
          className="text-gray-300 flex-1 py-2 px-4 rounded bg-red-600 mx-3 hover:text-red-600 hover:bg-gray-300"
          onClick={() => handleClick()}
        >
          Skip
        </button>
      </div>
    );
  }

  function Shop() {
    function isSelectingSpell() {
      return selectedTier < 3;
    }

    function isSelectingAccessory() {
      return selectedTier === 4;
    }

    function OptionButtonClassName(id) {
      if (id === 0 && isSelectingSpell()) {
        return " bg-blue-600 border-gray-600";
      } else if (id === 1 && !isSelectingSpell()) {
        return " bg-blue-600 border-gray-600";
      } else {
        return " bg-black text-blue-600 hover:bg-blue-600 hover:text-gray-300";
      }
    }

    return (
      <div className="text-center text-gray-300">
        <h1 className={"text-2xl"}>
          Win a new {isSelectingSpell() ? "Spell" : "Trinket"}
        </h1>
        <h2>
          You have <span className="text-yellow-400">${character.coins}</span>{" "}
          left to spend
        </h2>
        <h4 className="text-xs">You could win:</h4>
        <div className="block overflow-auto h-96 lg:w-1/2 border-yellow-200 border-2 mx-auto mb-3">
          {Array.isArray(TierArrays[selectedTier]) &&
            TierArrays[selectedTier].map((object, index) => {
              if (selectedTier < 3) {
                if (
                  character.accessories.findIndex(
                    ({ name }) => name === "Investment"
                  ) > -1
                ) {
                  object.casts += 1;
                }
              }
              var className = `bg-gray-900 text-center m-2`;
              return (
                <div className={className} key={index}>
                  <h4 className="text-red-400 mt-2">{object.displayName}</h4>
                  <p>
                    {selectedTier < 3
                      ? getAttackTooltip(object)
                      : object.description}
                  </p>
                  {selectedTier < 3 ? (
                    <p className="mt-auto">Casts: {object.casts}</p>
                  ) : (
                    <p className="text-3xl">{object.emoji}</p>
                  )}
                </div>
              );
            })}
        </div>
        <div className="flex flex-col text-center mb-5  mx-auto lg:w-1/2">
          <div className="flex flex-row justify-center">
            <div
              className={
                "flex mx-3 rounded px-2 border-2 border-blue-600 " +
                OptionButtonClassName(0)
              }
              onClick={() => setTier(0)}
            >
              Spells
            </div>
            <div
              className={
                "flex mx-3 rounded px-2 border-2 border-blue-600 " +
                OptionButtonClassName(1)
              }
              onClick={() => setTier(3)}
            >
              Other
            </div>
          </div>
          {isSelectingSpell() && (
            <div className="flex flex-row w-full justify-center items-center mt-2">
              {ShopHelpers.SpellTierButtons(selectedTier, setTier, [
                "Weak",
                "Average",
                "Strong",
              ])}
            </div>
          )}
          {!isSelectingSpell() && (
            <div className="flex flex-row w-full justify-center items-center mt-2">
              {ShopHelpers.SpellTierButtons(selectedTier, setTier, [
                "Items",
                "Accessories",
                // "Companions",
              ])}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center">
          <button
            className={shopButtonClassName}
            onClick={() => getThreeRandomAttacks()}
            disabled={character.coins < cost}
          >
            Pay ${cost} to choose from {numberOfObjects}{" "}
            {selectedTier < 3 ? "Spells" : "Items"}
          </button>
        </div>
      </div>
    );
  }

  function SelectCards() {
    return (
      <div className="flex flex-col items-center text-gray-300 text-center">
        <div className="flex">
          <p>Select a New {selectedTier < 3 ? "Attack" : "Item"}</p>
        </div>
        <div className="text-center flex flex-col flex-wrap">
          {Array.isArray(randomObjects) &&
            randomObjects.map((attack, index) => {
              if (
                character.accessories.findIndex(
                  ({ name }) => name === "Investment"
                ) > -1 &&
                !attack.invested
              ) {
                attack.invested = true;
                attack.casts += 1;
              }
              var className = `bg-gray-900 m-1 grid-row-1 col-${index} hover:bg-gray-800`;
              return (
                <div className={className} key={index}>
                  <div className="px-1 py-2 flex flex-col h-full">
                    <h4>
                      <b className="text-red-400">{attack.displayName}</b>
                    </h4>
                    <p>
                      {selectedTier < 3
                        ? getAttackTooltip(attack)
                        : attack.description}
                    </p>
                    {selectedTier < 3 ? (
                      <p className="mt-auto">Casts: {attack.casts}</p>
                    ) : (
                      <p className="text-3xl">{attack.emoji}</p>
                    )}
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

  function AddObjectToCharacterWrapper(attack) {
    AddObjectToCharacter(
      character,
      cost,
      selectedTier,
      attack,
      updateCharacter
    );
  }

  function HandleGenerateButtonClass(newCost) {
    if (character.coins < newCost) {
      setShopButtonClassName(ShopHelpers.generateButtonDisabled);
    } else {
      setShopButtonClassName(ShopHelpers.generateButtonEnabled);
    }
  }

  function setTier(newTier) {
    let newNumberOfObjects = numberOfObjects;
    setSelectedTier(newTier);
    setSelectedObjectArray(TierArrays[newTier]);
    newNumberOfObjects = ValidateNumberOfCards(newTier, newNumberOfObjects);
    updateCost(newTier, newNumberOfObjects);
  }

  function ValidateNumberOfCards(newTier, newNumberOfObjects) {
    if (newNumberOfObjects > TierArrays[newTier].length) {
      newNumberOfObjects = TierArrays[newTier].length;
    }
    return newNumberOfObjects;
  }

  function updateCost(tier, number) {
    var newCost = (tier + 1) * number - 3;
    if (tier > 2) {
      newCost = tier * 4;
    }
    setCost(newCost);
    HandleGenerateButtonClass(newCost);
  }
}

function AddObjectToCharacter(
  character,
  cost,
  selectedTier,
  attack,
  updateCharacter
) {
  let newCharacter = makeNewCharacter(character);
  newCharacter.coins -= cost;
  if (selectedTier < 3) {
    let attackIndex = getCharacterAttackIndex(character, attack);
    if (attackIndex > -1) {
      if (
        character.accessories.findIndex(({ name }) => name === "Investment") >
        -1
      ) {
        attack.casts += 1;
      }
      newCharacter.attacks[attackIndex].casts += attack.casts;
    } else {
      newCharacter.attacks.push(attack);
    }
  } else if (selectedTier === 3) {
    newCharacter.items.push(attack);
  } else if (selectedTier === 4) {
    newCharacter.accessories.push(attack);
  }
  updateCharacter(newCharacter);
}

function getRandomAttacks(
  numberOfObjects,
  selectedArray,
  endIndex,
  selectedTier
) {
  let randAttacks = [];
  let placeHolderNumber =
    numberOfObjects < selectedArray.length
      ? numberOfObjects
      : selectedArray.length;
  while (randAttacks.length < placeHolderNumber) {
    let newAttack = selectedArray[random.int(0, endIndex)];
    if (getAttackIndex(randAttacks, newAttack) === -1) {
      if (selectedTier < 3) {
        randAttacks.push(makeNewAttack(newAttack));
      } else if (selectedTier === 3) {
        randAttacks.push(makeNewItem(newAttack));
      } else if (selectedTier === 4) {
        randAttacks.push(MakeNewAccessory(newAttack));
      }
    }
  }
  return randAttacks;
}

function getCharacterAttackIndex(character, attack) {
  return character.attacks.findIndex(({ name }) => name === attack.name);
}

function getAttackIndex(attacks, attack) {
  return attacks.findIndex(({ name }) => name === attack.name);
}

function ToObjectArray(array, library) {
  let newArray = [];
  for (var i = 0; i < array.length; i++) {
    newArray.push(library[[array[i]]]());
  }
  return newArray;
}
