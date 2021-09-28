import { useState } from "react";
import Modal from "react-modal";

import CardsList from "./Spellbook Elements/SpellbookSpells";

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
}) {
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
        <div className="mb-2 mx-2">
          {CardsList(
            character,
            currentAttackIndex,
            setCurrentAttackIndex,
            handleSpellbookModal
          )}
        </div>

        <div className="flex mt-auto justify-evenly  flex-col lg:flex-row-reverse">
          <button
            className="text-gray-300 flex-1 py-2 px-4 rounded bg-green-600 m-3 hover:text-green-600 hover:bg-gray-300"
            onClick={() => handleBattleModal(handleSpellbookModal)}
          >
            {showBattleModal ? "X" : emoji.getUnicode("eyes")}
          </button>
        </div>
      </div>
    </Modal>
  );
}
