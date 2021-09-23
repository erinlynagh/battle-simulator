import * as AttackData from "../generation/attackMaker";
import Heap from "heap";
import * as AttackHelpers from "./attackHelpers";
import * as StateHelpers from "../generation/createNewStateObjects";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function killEnemy(enemies, enemyIndex, handleAttackModal, reset) {
  enemies.splice(enemyIndex, 1);
  handleAttackModal();
  reset();
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
    killEnemy(newEnemies, enemyIndex, handleAttackModal, reset);
  }

  if (newEnemies.length === 0) {
    setEnemyAttacks([]);
    newEnemies = nextFloor(
      floor,
      allEnemies,
      character,
      newEnemies,
      setEnemyAttacks,
      updateCharacter,
      updateFloor,
      reset
    );
    updateEnemies(newEnemies);
    return;
  } else if (character.mana === 1) {
    setEnemyAttacks([]);
    sleep(500).then(() => {
      AttackPlayer(
        newCharacter,
        newEnemies,
        setEnemyAttacks,
        handleAttackModal,
        reset
      );
      if (newEnemies.length === 0) {
        setEnemyAttacks([]);
        newEnemies = nextFloor(
          floor,
          allEnemies,
          character,
          newEnemies,
          setEnemyAttacks,
          updateCharacter,
          updateFloor,
          reset
        );
        updateEnemies(newEnemies);
        return;
      }
      updateCharacter(newCharacter);
      updateEnemies(newEnemies);
      return;
    });
  } else {
    updateCharacter(newCharacter);
    updateEnemies(newEnemies);
  }

  return;
}
function AttackPlayer(
  character,
  enemies,
  setEnemyAttacks,
  handleAttackModal,
  reset
) {
  var enemyAttacks = [];
  var reflecting = false;
  if (character.hasEffect("Reflect")) {
    reflecting = true;
  }
  AttackHelpers.reduceCharacterEffectDurations(character);
  console.log(enemies);
  character.refreshMana();

  var heap = new Heap(function (a, b) {
    return b.priority - a.priority;
  });

  enemies.forEach(function (enemy, enemyIndex) {
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
          if (reflecting) {
            AttackHelpers.Attack(enemy, attack, enemy);
            if (enemy.health <= 0) {
              enemyAttacks.push(enemy.name + " accidentally rekt themselves");
              killEnemy(enemies, enemyIndex, handleAttackModal, reset);
            } else {
              enemyAttacks.push(
                enemy.name + " attacks themselves with " + attack.name
              );
            }
          } else {
            AttackHelpers.Attack(enemy, attack, character);
            attack.id = enemy.id;
            enemyAttacks.push(attack);
          }
        }
        if (character.health <= 0) {
          alert("you lose");
          window.location.reload();
        }
      }
    }
  });
  setEnemyAttacks(enemyAttacks);
  AttackHelpers.reduceEnemiesEffectDurations(enemies);
}

export function AttackPlayerFromStun(
  character,
  enemies,
  setEnemyAttacks,
  updateCharacter,
  updateEnemies,
  floor,
  allEnemies,
  updateFloor,
  reset
) {
  console.log("hello");
  setEnemyAttacks([]);
  let newEnemies = StateHelpers.makeNewEnemies(enemies);
  let newCharacter = StateHelpers.makeNewCharacter(character);
  AttackPlayer(newCharacter, newEnemies, setEnemyAttacks);
  updateCharacter(newCharacter);
  updateEnemies(newEnemies);
  if (newEnemies.length === 0) {
    setEnemyAttacks([]);
    newEnemies = nextFloor(
      floor,
      allEnemies,
      character,
      newEnemies,
      setEnemyAttacks,
      updateCharacter,
      updateFloor,
      reset
    );
    updateEnemies(newEnemies);
    return;
  }
}

function nextFloor(
  floor,
  allEnemies,
  character,
  enemies,
  setEnemyAttacks,
  updateCharacter,
  updateFloor,
  reset
) {
  floor = floor + 1;
  if (floor >= allEnemies.length) {
    reset();
  } else {
    var newCharacter = StateHelpers.makeNewCharacter(character);
    newCharacter.effects = [];
    newCharacter.mana = newCharacter.maxMana;
    setEnemyAttacks([]);
    updateCharacter(newCharacter);
    updateFloor(floor);
    reset();
  }
  enemies = allEnemies[floor];
  return enemies;
}
