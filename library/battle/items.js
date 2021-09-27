import * as StateHelpers from "../copyClasses";

export default function UseItem(
  item,
  index,
  character,
  updateCharacter,
  enemies,
  setEnemies
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
      let newEnemies = StateHelpers.makeNewEnemies(enemies);
      newEnemies.forEach((enemy) => {
        enemy.health -= 5; //oh god killing enemies doesn't work, the amount of state variables needed for this is... not good
      });
      setEnemies(newEnemies);
      break;
  }

  updateCharacter(newCharacter);
}
