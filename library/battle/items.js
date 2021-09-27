import { killEnemy } from "./attackHelpers";
import * as StateHelpers from "../copyClasses";

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
  console.log(item, index, character, updateCharacter);
  let newCharacter = StateHelpers.makeNewCharacter(character);
  newCharacter.items.splice(index, 1);
  switch (item.name) {
    case "Healing Heart":
      newCharacter.maxHealth += 5;
      newCharacter.health += 5;
      break;
    case "Scissors":
      let info = CalculateEnemyDamage(enemies, 5);
      let newEnemies = info[0];
      let enemyKilled = info[1];
      if (newEnemies.length === 0) {
        nextFloor();
      } else if (enemyKilled) {
        handleShopModal();
        reset();
      }
      setEnemies(newEnemies);
      break;
  }

  updateCharacter(newCharacter);
}

function CalculateEnemyDamage(enemies, damage) {
  let newEnemies = StateHelpers.makeNewEnemies(enemies);
  let flag = false;
  for (var i = 0; i < newEnemies.length; i++) {
    let enemy = newEnemies[i];
    console.log(enemy);
    enemy.health -= damage;
    if (enemy.health <= 0) {
      newEnemies.splice(i, 1);
      i--;
      console.log("dies");
      flag = true;
    }
  }
  return [newEnemies, flag];
}
