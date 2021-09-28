import Modal from "react-modal";

import ItemsList from "./Inventory Elements/Items";

const emoji = require("emoji-dictionary");
Modal.setAppElement("#root");

export default function SpellbookModal({
  showInventoryModal,
  handleInventoryModal,
  character,
  showBattleModal,
  handleBattleModal,
  updateCharacter,
  enemies,
  setEnemies,
  handleShopModal,
  reset,
  nextFloor,
}) {
  return (
    <Modal
      isOpen={showInventoryModal}
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
        <div className="flex flex-row justify-evenly">
          {character.items.length > 0 && (
            <div className="mb-2 mx-2">{ItemsListWrapper()}</div>
          )}
          {character.items.length > 0 && (
            <div className="mb-2 mx-2">{ItemsListWrapper()}</div>
          )}
        </div>

        <div className="flex mt-auto justify-evenly flex-col lg:flex-row-reverse">
          <button
            className="text-gray-300 flex-1 py-2 px-4 rounded bg-green-600 m-3 hover:bg-gray-300 hover:text-green-600"
            onClick={() => handleBattleModal(handleInventoryModal)}
          >
            {showBattleModal ? "X" : emoji.getUnicode("eyes")}
          </button>
          <button
            className="text-gray-300 flex-1 py-2 px-4 rounded bg-red-600 m-3 hover:text-red-600 hover:bg-gray-300"
            onClick={() => handleInventoryModal()}
          >
            Close Inventory
          </button>
        </div>
      </div>
    </Modal>
  );

  function ItemsListWrapper() {
    return ItemsList(
      character,
      updateCharacter,
      enemies,
      setEnemies,
      handleShopModal,
      reset,
      nextFloor,
      handleInventoryModal
    );
  }
}
