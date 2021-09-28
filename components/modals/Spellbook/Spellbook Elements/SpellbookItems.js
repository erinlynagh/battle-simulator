import UseItem from "../../../../library/battle/items";

export default function ItemsList(
  character,
  updateCharacter,
  enemies,
  setEnemies,
  setShowSpells,
  handleShopModal,
  reset,
  nextFloor,
  handleSpellbookModal
) {
  return (
    <div className="flex flex-col items-center text-gray-300 text-center">
      <div className="flex mb-2">
        <p>Spells</p>
      </div>
      <div className="block overflow-auto border-gray-700 border-2 mx-auto mb-3">
        {character.items.map((item, index) => {
          return Item(item, index);
        })}
      </div>
    </div>
  );

  function Item(item, index) {
    return (
      <div
        className={`border-2 border-gray-900 bg-gray-900 m-1 grid-row-1 hover:bg-gray-800`}
        key={index}
        onClick={() => UseItemWrapper(item, index)}
      >
        <div className={"px-1 py-2 flex flex-col h-full"}>
          <h4 className="text-red-400">
            {item.emoji + " - " + item.displayName}
          </h4>
          <p>{item.description}</p>
        </div>
      </div>
    );
  }

  function UseItemWrapper(item, index) {
    UseItem(
      item,
      index,
      character,
      updateCharacter,
      enemies,
      setEnemies,
      handleShopModal,
      reset,
      nextFloor
    );
    setShowSpells(true);
    handleSpellbookModal();
  }
}
