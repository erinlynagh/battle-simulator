import { useState } from "react";
import Modal from "react-modal";

import CardsList from "./Spellbook Elements/SpellbookSpells";
import ItemsList from "./Spellbook Elements/SpellbookItems";

const emoji = require("emoji-dictionary");
Modal.setAppElement("#root");

export default function SpellbookModal({
  showAttackModal,
  handleSpellbookModal,
  character,
  showBattleModal,
  handleBattleModal,
  currentAttackIndex,
  setCurrentAttackIndex,
  updateCharacter,
  enemies,
  setEnemies,
  handleShopModal,
  reset,
  nextFloor,
}) {
  const [showSpells, setShowSpells] = useState(true);
  const [currentItemIndex, setItemIndex] = useState(0);

  return (
    <Modal
      isOpen={showAttackModal}
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
        {character.items.length > 0 && (
          <button
            className="text-green-600 rounded border-green-600 border-2 px-2 py-2 self-center w-full lg:w-1/2 md:w-3/4 mx-4 mb-2 hover:bg-green-600 hover:text-black"
            onClick={() => HandleShowSpells()}
          >
            View {showSpells ? "Items" : "Spells"}
          </button>
        )}

        {showSpells && (
          <div className="mb-2 mx-2">
            {CardsList(
              character,
              currentAttackIndex,
              setCurrentAttackIndex,
              handleSpellbookModal
            )}
          </div>
        )}
        {(!showSpells && character.items.length) > 0 && (
          <div className="flex mb-2 mx-2 h-3/4 justify-center">
            {ItemsListWrapper()}
          </div>
        )}

        <div className="flex mt-auto justify-evenly  flex-col lg:flex-row-reverse">
          <button
            className="text-gray-300 flex-1 py-2 px-4 rounded bg-green-600 m-3"
            onClick={() => handleBattleModal(handleSpellbookModal)}
          >
            {showBattleModal ? "X" : emoji.getUnicode("eyes")}
          </button>
        </div>
      </div>
    </Modal>
  );

  function HandleShowSpells() {
    if (showSpells) {
      setShowSpells(false);
    } else {
      setShowSpells(true);
    }
  }

  function ItemsListWrapper() {
    return ItemsList(
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
    );
  }
}
