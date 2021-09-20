import * as AttackData from "../generation/attackMaker";

function isTarget(enemy, targetID) {
  return enemy.id === targetID;
}

export function Attack(attack, target, enemies, updateEnemies) {
  const newEnemies = enemies.slice();
  const enemy = enemies.find(({ id }) => id === target);
  const enemyIndex = newEnemies.findIndex(({ id }) => id === target);
  attack = AttackData[[attack]];
  enemy.health -= attack.power;
  enemy.effect += attack.effect;
  newEnemies[enemyIndex] = enemy;
  updateEnemies(newEnemies);
}
