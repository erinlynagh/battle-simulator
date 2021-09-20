import * as AttackData from "../generation/attackMaker";
import { Effect } from "../generation/classes";

function isTarget(enemy, targetID) {
  return enemy.id === targetID;
}

export function AttackEnemy(
  attack,
  target,
  enemies,
  updateEnemies,
  allEnemies,
  floor,
  updateFloor,
  reset
) {
  let newEnemies = enemies.slice();
  const enemy = newEnemies.find(({ id }) => id === target);
  const enemyIndex = newEnemies.findIndex(({ id }) => id === target);
  attack = AttackData[[attack]];
  const effectIndex = enemy.effects.findIndex(
    ({ name }) => name === attack.effect.name
  );
  console.log(effectIndex);
  if (effectIndex === -1) {
    enemy.effects.push(
      new Effect(
        attack.effect.name,
        attack.effect.duration,
        attack.effect.description
      )
    );
  } else {
    enemy.effects[effectIndex].duration += attack.effect.duration;
  }
  enemies.forEach(function (enemy, enemyIndex) {
    console.log(enemy);
    console.log(enemy.effects);
    enemy.effects.forEach(function (effect, effectIndex) {
      console.log(effect);
      if (effect.duration > 1) {
        newEnemies[enemyIndex].effects[effectIndex].duration -= 1;
      }
    });
  });
  enemy.health -= attack.power;
  if (enemy.health <= 0) {
    newEnemies.splice(enemyIndex, 1);
    reset();
  } else {
    newEnemies[enemyIndex] = enemy;
  }
  if (newEnemies.length === 0) {
    alert("battle won");
    reset();
    floor = floor + 1;
    updateFloor(floor);
    if (floor >= allEnemies.length) {
      alert("you win!");
      window.location.reload();
    }
    newEnemies = allEnemies[floor];
  }
  updateEnemies(newEnemies);
}
