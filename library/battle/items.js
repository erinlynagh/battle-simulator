import * as StateHelpers from "../copyClasses";
import * as EffectMaker from "../generation/effectMaker";

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
  console.log(item);
  console;
  let newCharacter = StateHelpers.makeNewCharacter(character);
  newCharacter.items.splice(index, 1);
  let effect = "";
  switch (item.name) {
    case "Healing Heart":
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
    case "Faulty Plug":
      effect = "Stun";
      ApplyEffectToEnemies(enemies, effect, setEnemies);
      break;
    case "Really Shiny Dust":
      effect = "Reflect";
      character.effects.push(EffectMaker[[effect]](1));
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
      newEnemies.splice(i, 1);
      i--;
      flag = true;
    }
  }
  return [newEnemies, flag];
}
