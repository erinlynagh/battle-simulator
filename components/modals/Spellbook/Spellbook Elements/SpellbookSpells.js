import { getAttackTooltip } from "../../../../library/classes";

export default function CardsList(
  character,
  currentAttackIndex,
  setCurrentAttackIndex,
  handleSpellbookModal
) {
  return (
    <div className="flex flex-col items-center text-gray-300 text-center">
      <div className="flex mb-2">
        <p>Spells</p>
      </div>
      <div className="block overflow-auto border-gray-700 border-2 mx-auto mb-3">
        {character.attacks.map((attack, index) => {
          return Card(attack, index);
        })}
      </div>
    </div>
  );
  function Card(attack, index) {
    const selectedClass =
      currentAttackIndex === index ? "border-2 border-green-600" : "";
    return (
      <div
        className={
          `border-2 border-gray-900 bg-gray-900 m-1 grid-row-1 hover:bg-gray-800` +
          selectedClass
        }
        key={index}
        onClick={() => HandleAttackIndex(index)}
      >
        <div className={"px-1 py-2 flex flex-col h-full"}>
          <h4 className="text-red-400">{attack.displayName}</h4>
          <p>{getAttackTooltip(attack)}</p>
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
