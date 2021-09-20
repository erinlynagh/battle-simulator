import * as AttackData from "../generation/attackMaker";
import { Effect, Character } from "../generation/classes";
import Heap from "heap";

export function AttackEnemy(
  character,
  updateCharacter,
  attack,
  target,
  enemies,
  updateEnemies,
  allEnemies,
  floor,
  updateFloor,
  reset,
  mana
) {
  let newEnemies = enemies.slice();
  const enemy = newEnemies.find(({ id }) => id === target);
  const enemyIndex = newEnemies.findIndex(({ id }) => id === target);
  attack = AttackData[[attack]];
  const effectIndex = enemy.getEffectIndex(attack.effect.name);
  if (effectIndex === -1) {
    enemy.effects.push(
      new Effect(
        attack.effect.name,
        attack.effect.duration,
        attack.effect.description
      )
    );
  } else {
    enemy.effects[effectIndex].duration += attack.effect.duration - 1;
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
  } else if (character.mana === 0) {
    attackPlayer(character, updateCharacter, enemies);
  }
  updateEnemies(newEnemies);
}

function attackPlayer(character, updateCharacter, enemies) {
  console.log(enemies);
  var newCharacter = new Character(
    character.name,
    character.health,
    character.maxHealth,
    character.attacks,
    character.emojiName,
    character.effects
  );
  var heap = new Heap(function (a, b) {
    return b.priority - a.priority;
  });
  enemies.forEach(function (enemy, enemyIndex) {
    if (enemy.health <= 0 || enemy.hasEffect("Stun")) {
      return;
    } else {
      enemy.attacks.forEach(function (attack, attackIndex) {
        heap.push(attack);
      });
    }
  });

  var attacked = false;
  while (heap.nodes.length > 0) {
    let attack = heap.pop();
    console.log(attack);
    var chance = Math.random();
    console.log(chance);
    if (!attacked && chance <= attack.chance) {
      console.log("attacked!");
      attacked = true;
      newCharacter.health -= attack.power;
      const effectIndex = character.getEffectIndex(attack.effect.name);
      if (effectIndex === -1) {
        newCharacter.effects.push(
          new Effect(
            attack.effect.name,
            attack.effect.duration,
            attack.effect.description
          )
        );
      } else {
        newCharacter.effects[effectIndex].duration += attack.effect.duration;
      }
    }
    if (newCharacter.health <= 0) {
      alert("you lose");
      window.location.reload();
    }
    updateCharacter(newCharacter);
  }
}
