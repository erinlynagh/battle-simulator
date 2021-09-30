import * as StateHelpers from "../../copyClasses";
import * as EffectMaker from "../effectMaker";
import random from "random";
import { characterHasEffect as hasEffect } from "../../classes";

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(random.float() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export default function UseItem(
  item,
  index,
  character,
  updateCharacter,
  enemies,
  setEnemies,
  handleShopModal,
  reset,
  nextFloor
) {
  let newCharacter = StateHelpers.makeNewCharacter(character);
  newCharacter.items.splice(index, 1);
  let effect = "";
  switch (item.name) {
    case "SparklingHeart":
      newCharacter.maxHealth += 5;
      newCharacter.health += 5;
      break;
    case "Scissors":
      let damage = 5;
      DamageEnemies(
        enemies,
        handleShopModal,
        nextFloor,
        reset,
        setEnemies,
        damage
      );
      break;
    case "FaultyPlug":
      effect = "Stun";
      ApplyEffectToEnemies(enemies, effect, setEnemies);
      break;
    case "ReallyShinyDust":
      effect = "Reflect";
      character.effects.push(EffectMaker[[effect]](1));
      break;
    case "Battery":
      newCharacter.mana += 1;
      break;
    case "Apple":
      let healingAmount = 10;
      if (newCharacter.health + healingAmount >= newCharacter.maxHealth) {
        newCharacter.health = newCharacter.maxHealth;
      } else {
        newCharacter.health += healingAmount;
      }
      break;
    case "ExpeditedAnathema":
      let randomEnemies = enemies.slice();
      let newEnemies = StateHelpers.makeNewEnemies(enemies);
      let flag = false;
      shuffleArray(randomEnemies);
      randomEnemies.forEach((enemy) => {
        if (hasEffect(enemy, "Curse") && !flag) {
          let AfflictedEnemy = newEnemies.find((x) => x.id === enemy.id);

          AfflictedEnemy.effects[
            AfflictedEnemy.effects.findIndex((x) => x.name === "Curse")
          ].duration *= 2;
          flag = true;
        }
        setEnemies(newEnemies);
      });
      break;
    default:
      throw new Error("Item not Found");
  }
  updateCharacter(newCharacter);
}

function ApplyEffectToEnemies(enemies, effect, setEnemies) {
  let newEnemies = StateHelpers.makeNewEnemies(enemies);
  newEnemies.forEach((enemy) => {
    enemy.effects.push(EffectMaker[[effect]](1));
  });
  setEnemies(newEnemies);
}

function DamageEnemies(
  enemies,
  handleShopModal,
  nextFloor,
  reset,
  setEnemies,
  damage
) {
  let info = CalculateEnemyDamage(enemies, damage);
  let newEnemies = info[0];
  let enemyKilled = info[1];
  if (newEnemies.length === 0) {
    handleShopModal();
    nextFloor();
  } else {
    if (enemyKilled) {
      handleShopModal();
      reset();
    }
    setEnemies(newEnemies);
  }
}

function CalculateEnemyDamage(enemies, damage) {
  let newEnemies = StateHelpers.makeNewEnemies(enemies);
  let flag = false;
  for (var i = 0; i < newEnemies.length; i++) {
    let enemy = newEnemies[i];
    enemy.health -= damage;
    if (enemy.health <= 0) {
      if (hasEffect(enemy, "Ouroboros")) {
        console.log("The circle continues");
      }
      newEnemies.splice(i, 1);
      i--;
      flag = true;
    }
  }
  return [newEnemies, flag];
}
