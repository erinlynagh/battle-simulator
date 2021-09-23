import * as AttackData from "../generation/attackMaker";
import * as AttackHelpers from "./attackHelpers";
import * as StateHelpers from "../generation/createNewStateObjects";
import Heap from "heap";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function killEnemy(enemies, enemyIndex, handleAttackModal, reset) {
  enemies.splice(enemyIndex, 1);
  handleAttackModal();
  reset();
}

const BinaryHeap = new Heap(function (a, b) {
  return b.priority - a.priority;
});

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
  // loads attack data from library
  attack = AttackData[[attack]]();

  // create copy of state objects to transform then reassign to state
  let newEnemies = StateHelpers.makeNewEnemies(enemies);
  let newCharacter = StateHelpers.makeNewCharacter(character);
  const enemy = newEnemies.find(({ id }) => id === target);
  const enemyIndex = newEnemies.findIndex(({ id }) => id === target);

  // attack the enemy
  AttackHelpers.Attack(newCharacter, attack, enemy, reset);
  // update the screen
  newEnemies[enemyIndex] = enemy;
  updateEnemies(newEnemies);

  // if the enemy dies remove it from the screen
  if (enemy.health <= 0) {
    killEnemy(newEnemies, enemyIndex, handleAttackModal, reset);
  }

  // if there are no more enemies
  if (newEnemies.length === 0) {
    goToNextFloor(); //update the enemies on the screen
    return;
  } else if (character.mana === 1) {
    //end of your turn
    setEnemyAttacks([]); // reset the attack log
    sleep(500).then(() => {
      //this allows the player to see some information, like the effect of the attack that they did
      AttackPlayerWrapper(); // calculate the enemies attack
      if (newEnemies.length === 0) {
        // because of the reflecting attack, enemies can lose on their turn, so we need to cover this
        goToNextFloor();
        return;
      }
      updateCharacter(newCharacter); // update the screen
      updateEnemies(newEnemies);
      return;
    });
  } else {
    updateCharacter(newCharacter); // update the screen
    updateEnemies(newEnemies);
  }

  return; // done

  // wrappers to reduce the disgusting appearance of having to manage so many variables
  function AttackPlayerWrapper() {
    AttackPlayer(
      newCharacter,
      newEnemies,
      setEnemyAttacks,
      handleAttackModal,
      reset
    );
  }

  function goToNextFloor() {
    newEnemies = nextFloor(
      floor,
      allEnemies,
      character,
      newEnemies,
      setEnemyAttacks,
      updateCharacter,
      updateFloor,
      reset
    ); //get the enemies for the next floor and prepare the screen
    updateEnemies(newEnemies);
  }
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

  enemies.forEach(function (enemy, enemyIndex) {
    var attacked = false;

    if (enemy.health <= 0 || enemy.hasEffect("Stun")) {
      enemy.animate = "shake";
      return;
    }

    enemy.attacks.forEach(function (attack) {
      BinaryHeap.push(attack);
    });

    while (BinaryHeap.nodes.length > 0) {
      let attack = BinaryHeap.pop();
      if (!attacked && Math.random() <= attack.chance) {
        attacked = true;
        enemy.animate = "wobble";
        if (reflecting) {
          reflectAttack(enemy, attack, enemyIndex);
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
  });
  setEnemyAttacks(enemyAttacks);
  AttackHelpers.reduceEnemiesEffectDurations(enemies);

  function reflectAttack(enemy, attack, enemyIndex) {
    AttackHelpers.Attack(enemy, attack, enemy);
    let spoofAttack = new StateHelpers.spoofAttack(enemy.name);
    spoofAttack.id = enemy.id;
    if (enemy.health <= 0) {
      spoofAttack.attackMessage = attack.name + " and kills themselves!";
      killEnemy(enemies, enemyIndex, handleAttackModal, reset);
    } else {
      spoofAttack.attackMessage =
        attack.name + " and deals damage to themselves!";
      enemyAttacks.push(spoofAttack);
    }
  }
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
