import React, { useState, useEffect } from "react";
import Modal from "react-modal";
const emoji = require("emoji-dictionary");

Modal.setAppElement("#root");

export default function BattleModal({
  showBattleModal,
  handleBattleModal,
  alternateModal,
}) {
  return (
    <Modal
      isOpen={showBattleModal}
      contentLabel="Pick your new spell!"
      style={{
        content: {
          background: "transparent !important",
          border: "0px",
          inset: "0",
        },
        overlay: {
          background: "transparent !important",
          backgroundColor: "rgba(255, 255, 255, 0)",
        },
      }}
    >
      <div className="flex h-full justify-center content-end">
        <button
          className="flex-1 py-2 px-4 rounded bg-green-600 mx-2 text-gray-300 mt-auto"
          onClick={() => handleBattleModal(alternateModal)}
        >
          {showBattleModal ? "X" : emoji.getUnicode("eyes")}
        </button>
      </div>
    </Modal>
  );
}
