import Modal from "react-modal";
const emoji = require("emoji-dictionary");

Modal.setAppElement("#root");

export default function AttackModal({
  showAttackModal,
  handleAttackModal,
  character,
  showBattleModal,
  handleBattleModal,
}) {
  return (
    <Modal
      isOpen={showAttackModal}
      contentLabel="Pick your new spell!"
      style={{
        content: { background: "#0c0c0c" },
        overlay: { background: "#323232" },
      }}
    >
      <div className="flex flex-col h-full">
        <div className="mb-2">{SelectCards()}</div>
        <div className="flex mt-auto justify-evenly">
          <button
            className="text-gray-300 flex-1 py-2 px-4 rounded bg-green-600 mx-3"
            onClick={() => handleBattleModal(handleAttackModal)}
          >
            {showBattleModal ? "X" : emoji.getUnicode("eyes")}
          </button>
          <button
            className="text-gray-300 flex-1 py-2 px-4 rounded bg-red-600 mx-3"
            onClick={() => handleAttackModal()}
          >
            Exit
          </button>
        </div>
      </div>
    </Modal>
  );

  function SelectCards() {
    return (
      <div className="flex flex-col items-center text-gray-300 text-center">
        <div className="flex">
          <p>Select a New Attack</p>
        </div>
        <div className="text-center flex flex-col flex-wrap">
          {character.attacks.map((attack, index) => {
            var className = `bg-gray-900 m-1 grid-row-1 col-${index} hover:bg-gray-800`;
            return (
              <div className={className} key={index}>
                <div className="px-1 py-2 flex flex-col h-full">
                  <h4 className="text-red-400">
                    {attack.name.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}
                  </h4>
                  <p>{attack.getTooltip()}</p>
                  <p className="mt-auto mb-1">Casts: {attack.casts}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
