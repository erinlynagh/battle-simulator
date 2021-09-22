import * as AttackData from "../generation/attackMaker";
import Heap from "heap";
import * as AttackHelpers from "./attackHelpers";
import * as StateHelpers from "../generation/createNewStateObjects";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
  setEnemyAttacks,
  handleAttackModal
) {
  attack = AttackData[[attack]]();

  let newEnemies = StateHelpers.makeNewEnemies(enemies);
  let newCharacter = StateHelpers.makeNewCharacter(character);
  const enemy = newEnemies.find(({ id }) => id === target);
  const enemyIndex = newEnemies.findIndex(({ id }) => id === target);

  AttackHelpers.Attack(newCharacter, attack, enemy, reset);
  newEnemies[enemyIndex] = enemy;
  updateEnemies(newEnemies);

  if (enemy.health <= 0) {
    newEnemies.splice(enemyIndex, 1);
    handleAttackModal();
    reset();
  }

  if (newEnemies.length === 0) {
    newEnemies = nextFloor();
    updateEnemies(newEnemies);
    return;
  } else if (character.mana === 1) {
    setEnemyAttacks([]);
    sleep(500).then(() => {
      AttackPlayer(newCharacter, newEnemies, setEnemyAttacks);
      updateCharacter(newCharacter);
      updateEnemies(newEnemies);
      return;
    });
  } else {
    updateCharacter(newCharacter);
    updateEnemies(newEnemies);
  }

  return;

  function nextFloor() {
    floor = floor + 1;
    if (floor >= allEnemies.length) {
      alert("You win!");
      window.location.reload();
      reset();
    } else {
      var newCharacter = StateHelpers.makeNewCharacter(character);
      newCharacter.mana = newCharacter.maxMana;
      updateCharacter(newCharacter);
      updateFloor(floor);
      reset();
    }
    newEnemies = allEnemies[floor];
    return newEnemies;
  }
}

function AttackPlayer(character, enemies, setEnemyAttacks) {
  setEnemyAttacks([]);
  var enemyAttacks = [];
  character.refreshMana();

  var heap = new Heap(function (a, b) {
    return b.priority - a.priority;
  });

  enemies.forEach(function (enemy) {
    var attacked = false;
    if (enemy.health <= 0 || enemy.hasEffect("Stun")) {
      enemy.animate = "shake";
      return;
    } else {
      enemy.attacks.forEach(function (attack) {
        heap.push(attack);
      });
      while (heap.nodes.length > 0) {
        let attack = heap.pop();
        if (!attacked && Math.random() <= attack.chance) {
          attacked = true;
          enemy.animate = "wobble";
          enemyAttacks.push(attack);
          if (character.hasEffect("Reflect")) {
            AttackHelpers.Attack(enemy, attack, enemy);
          } else {
            AttackHelpers.Attack(enemy, attack, character);
          }
          setEnemyAttacks(enemyAttacks);
        }
        if (character.health <= 0) {
          alert("you lose");
          window.location.reload();
        }
      }
    }
  });
  AttackHelpers.reduceCharacterEffectDurations(character);
  AttackHelpers.reduceEnemiesEffectDurations(enemies);
}

export function AttackPlayerFromStun(
  character,
  enemies,
  setEnemyAttacks,
  updateCharacter,
  updateEnemies
) {
  let newEnemies = StateHelpers.makeNewEnemies(enemies);
  let newCharacter = StateHelpers.makeNewCharacter(character);
  AttackHelpers.reduceEnemiesEffectDurations(newEnemies);
  AttackHelpers.reduceCharacterEffectDurations(newCharacter);
  var enemyAttacks = [];
  character.refreshMana();

  var heap = new Heap(function (a, b) {
    return b.priority - a.priority;
  });

  newEnemies.forEach(function (enemy) {
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
          AttackHelpers.Attack(enemy, attack, character);
          setEnemyAttacks(enemyAttacks);
        }
        if (character.health <= 0) {
          alert("you lose");
          window.location.reload();
        }
      }
    }
  });
  updateCharacter(newCharacter);
  updateEnemies(newEnemies);
}
