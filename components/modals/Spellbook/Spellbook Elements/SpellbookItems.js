import { useState } from "react";
import UseItem from "../../../../library/battle/items";

export default function ItemsList(
  currentItemIndex,
  setItemIndex,
  character,
  updateCharacter,
  enemies,
  setEnemies,
  handleSpellbookModal,
  setShowSpells,
  handleShopModal,
  reset,
  nextFloor
) {
  console.log(handleSpellbookModal);
  console.log(enemies);
  return (
    <div className="flex flex-col text-gray-300 text-center h-full w-full lg:w-3/4">
      <p>Items</p>
      <div
        className="flex items-center border-gray-700 border-2 mx-auto mb-3 h-full w-full bg-gray-900 hover:bg-gray-800 hover:border-green-600"
        onClick={() => UseItemWrapper()} //need to have some kind of confirmations
      >
        {Item(character.items[currentItemIndex], currentItemIndex)}
      </div>
      {character.items.length > 1 && (
        <div className="flex mb-2 justify-evenly w-full h-100">
          <p
            className="rounded border-2 border-blue-600 text-blue-600 px-1 flex-1 mr-1 ml-3 hover:bg-blue-600 hover:text-black "
            onClick={() => decreaseSpellIndex()}
          >
            &lt; {character.items[getDecreasedIndex()].name}
          </p>
          <p
            className="rounded border-2 border-blue-600 text-blue-600 px-1 flex-1 ml-1 mr-3 hover:bg-blue-600 hover:text-black "
            onClick={() => increaseSpellIndex()}
          >
            {character.items[getIncreasedIndex()].name} &gt;
          </p>
        </div>
      )}
    </div>
  );
  function Item(item, index) {
    return (
      <div className="w-full" key={index}>
        <div className={"px-1 py-2 flex flex-col h-full"}>
          <h4 className="text-red-400 my-2">{item.name}</h4>
          <h4 className="text-red-400 text-7xl">{item.emoji}</h4>
          <p>{item.description}</p>
          {/* <p className="mt-auto mb-1">Casts: {attack.casts}</p> */}
        </div>
      </div>
    );
  }
  function decreaseSpellIndex() {
    setItemIndex(getDecreasedIndex());
  }

  function getDecreasedIndex() {
    let newIndex = currentItemIndex;
    if (newIndex === 0) {
      newIndex = character.items.length - 1;
    } else {
      newIndex -= 1;
    }
    return newIndex;
  }

  function increaseSpellIndex() {
    setItemIndex(getIncreasedIndex());
  }

  function getIncreasedIndex() {
    let newIndex = currentItemIndex;
    if (newIndex === character.items.length - 1) {
      newIndex = 0;
    } else {
      newIndex += 1;
    }
    return newIndex;
  }

  function UseItemWrapper() {
    UseItem(
      character.items[currentItemIndex],
      currentItemIndex,
      character,
      updateCharacter,
      enemies,
      setEnemies,
      handleShopModal,
      reset,
      nextFloor
    );
    setItemIndex(0);
    setShowSpells(true);
    handleSpellbookModal();
  }
}
