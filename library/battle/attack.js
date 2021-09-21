import * as AttackData from "../generation/attackMaker";
import Heap from "heap";
import * as AttackHelpers from "./attackHelpers";
import * as StateHelpers from "../generation/createNewStateObjects";
function nextFloor(
  floor,
  allEnemies,
  character,
  updateCharacter,
  updateFloor,
  reset,
  newEnemies
) {
  floor = floor + 1;
  if (floor >= allEnemies.length) {
    reset();
  } else {
    var newCharacter = StateHelpers.makeNewCharacter(character);
    newCharacter.mana = newCharacter.maxMana;
    updateCharacter(newCharacter);
    alert("battle won, to the next one!");
    updateFloor(floor);
    reset();
  }
  newEnemies = allEnemies[floor];
  return newEnemies;
}

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
  setEnemyAttacks
) {
  setEnemyAttacks([]);
  attack = AttackData[[attack]];

  var { enemy, newEnemies, enemyIndex } = StateHelpers.makeNewEnemies(
    enemies,
    target
  );

  AttackHelpers.applyAttackEffect(enemy, attack);
  enemy.health -= AttackHelpers.getAttackDamage(attack, enemy, character);
  if (enemy.health <= 0) {
    newEnemies.splice(enemyIndex, 1);
    reset();
  } else {
    newEnemies[enemyIndex] = enemy;
  }

  if (newEnemies.length === 0) {
    newEnemies = nextFloor(
      floor,
      allEnemies,
      character,
      updateCharacter,
      updateFloor,
      reset,
      newEnemies
    );
  } else if (character.mana === 1) {
    var newCharacter = AttackHelpers.castSpell(
      newCharacter,
      character,
      attack,
      reset
    );
    newCharacter.refreshMana();
    updateCharacter(newCharacter);
    updateEnemies(newEnemies);
    AttackPlayer(character, updateCharacter, newEnemies, setEnemyAttacks);
  } else {
    var newCharacter = AttackHelpers.castSpell(
      newCharacter,
      character,
      attack,
      reset
    );
    newCharacter.mana -= 1;
    updateCharacter(newCharacter);
  }
  updateEnemies(newEnemies);
}

export function AttackPlayer(
  character,
  updateCharacter,
  enemies,
  setEnemyAttacks
) {
  var enemyAttacks = [];
  var newCharacter = StateHelpers.makeNewCharacter(character);
  AttackHelpers.reduceCharacterEffectDurations(newCharacter);
  newCharacter.refreshMana();
  var heap = new Heap(function (a, b) {
    return b.priority - a.priority;
  });
  enemies.forEach(function (enemy) {
    console.log(enemy);
    var attacked = false;
    if (enemy.health <= 0 || enemy.hasEffect("Stun")) {
      return;
    } else {
      enemy.attacks.forEach(function (attack) {
        heap.push(attack);
      });
      while (heap.nodes.length > 0) {
        let attack = heap.pop();
        if (!attacked && Math.random() <= attack.chance) {
          attacked = true;
          enemyAttacks.push(attack);
          AttackHelpers.applyAttackEffect(newCharacter, attack);
          newCharacter.health -= AttackHelpers.getAttackDamage(
            attack,
            character,
            enemy
          );
          setEnemyAttacks(enemyAttacks);
        }
        if (newCharacter.health <= 0) {
          alert("you lose");
          window.location.reload();
        }
      }
    }
  });
  AttackHelpers.reduceEnemiesEffectDurations(enemies);
  updateCharacter(newCharacter);
}
