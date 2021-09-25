import Modal from "react-modal";
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
        <div className="mb-2">{CardsList()}</div>
        <div className="flex mt-auto justify-evenly flex-col lg:flex-row-reverse">
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

  function CardsList() {
    return (
      <div className="flex flex-col items-center text-gray-300 text-center">
        <div className="flex mb-2">
          <p>Spellbook</p>
        </div>
        <div className="block overflow-auto lg:w-1/2 border-gray-700 border-2 mx-auto mb-3">
          {character.attacks.map((attack, index) => {
            return Card(attack, index);
          })}
        </div>
      </div>
    );
  }

  function Card(attack, index) {
    const selectedClass =
      currentAttackIndex === index ? "border-2 border-green-600" : "";
    return (
      <div
        className={
          `border-2 border-gray-900 bg-gray-900 m-1 grid-row-1 hover:bg-gray-800 col-${index} ` +
          selectedClass
        }
        key={index}
        onClick={() => HandleAttackIndex(index)}
      >
        <div className={"px-1 py-2 flex flex-col h-full"}>
          <h4 className="text-red-400">{attack.displayName}</h4>
          <p>{attack.getTooltip()}</p>
          <p className="mt-auto mb-1">Casts: {attack.casts}</p>
        </div>
      </div>
    );
  }

  function HandleAttackIndex(index) {
    if (currentAttackIndex === index) {
      setCurrentAttackIndex(-1);
    } else {
      setCurrentAttackIndex(index);
    }
    handleSpellbookModal();
  }
}
