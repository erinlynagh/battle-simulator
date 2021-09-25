export default function RenderCharacterAttacks({
  character,
  currentAttackIndex,
  setCurrentAttackIndex,
}) {
  return (
    <div className="flex flex-row justify-center flex-wrap mt-3">
      <button
        onClick={decreaseIndex}
        className="px-2 rounded bg-red-700 mx-2 hover:bg-gray-300 hover:text-red-700"
      >
        &lt;
      </button>
      {RenderAttack(character.attacks[currentAttackIndex])}
      <button
        onClick={increaseIndex}
        className="px-2 rounded bg-red-700 mx-2 hover:bg-gray-300 hover:text-red-700"
      >
        &gt;
      </button>
    </div>
  );

  function decreaseIndex() {
    var newAttackIndex = currentAttackIndex;
    if (currentAttackIndex > 0) {
      newAttackIndex -= 1;
    } else {
      newAttackIndex = character.attacks.length - 1;
    }
    setCurrentAttackIndex(newAttackIndex);
  }

  function increaseIndex() {
    var newAttackIndex = currentAttackIndex;
    if (currentAttackIndex < character.attacks.length - 1) {
      newAttackIndex += 1;
    } else {
      newAttackIndex = 0;
    }
    setCurrentAttackIndex(newAttackIndex);
  }
}

function RenderAttack(attack) {
  const sharedClassName =
    "w-full justify-center flex text-center border-l-2 border-r-2 mx-2";
  return (
    <div className="flex flex-col items-center w-1/3">
      <p className={"text-yellow-300 border-t-2 underline " + sharedClassName}>
        {attack.name}
      </p>
      <p className={"border-b-2 " + sharedClassName}>{attack.getTooltip()}</p>
    </div>
  );
}
