import * as AttackData from "../generation/attackMaker";
import { Effect } from "../generation/classes";

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
    enemy.effects.forEach(function (effect, effectIndex) {
      if (effect.duration > 1) {
        newEnemies[enemyIndex].effects[effectIndex].duration -= 1;
      } else {
        newEnemies[enemyIndex].effects.splice(effectIndex, 1);
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
    floor = floor + 1;
    if (floor >= allEnemies.length) {
      alert("you win!");
      window.location.reload();
    } else {
      alert("battle won, to the next one!");
      reset();
      updateFloor(floor);
    }
    newEnemies = allEnemies[floor];
  }
  updateEnemies(newEnemies);
}

export function attackPlayer(character, attack) {
  console.log(character);
  console.log(attack);
}
