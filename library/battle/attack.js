import * as AttackData from "../generation/attackMaker";

function isTarget(enemy, targetID) {
  return enemy.id === targetID;
}

export function Attack(
  attack,
  target,
  enemies,
  updateEnemies,
  allEnemies,
  floor,
  updateFloor,
  setSelectedTarget,
  setSelectedTargetId,
  setShowSubmit
) {
  let newEnemies = enemies.slice();
  const enemy = enemies.find(({ id }) => id === target);
  const enemyIndex = newEnemies.findIndex(({ id }) => id === target);
  attack = AttackData[[attack]];
  enemy.health -= attack.power;
  enemy.effect += attack.effect;
  if (enemy.health <= 0) {
    newEnemies.splice(enemyIndex, 1);
    setSelectedTarget("");
    setSelectedTargetId("");
    setShowSubmit(false);
  } else {
    newEnemies[enemyIndex] = enemy;
  }
  if (newEnemies.length === 0) {
    alert("battle won");
    floor = floor + 1;
    updateFloor(floor);
    newEnemies = allEnemies[floor];
  }
  updateEnemies(newEnemies);
}
