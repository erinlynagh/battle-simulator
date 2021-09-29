import { makeNewCharacter } from "../../copyClasses";
import * as Effects from "../effectMaker";
import * as Attacks from "../attackMaker/attacks";

export default function ApplyAccessories(character, updateCharacter) {
  let newCharacter = makeNewCharacter(character);
  if (!newCharacter.accessories) {
    return character;
  }
  newCharacter.accessories.forEach((accessory) => {
    ApplyAccessory(accessory, newCharacter);
  });
  return newCharacter;
}

function ApplyAccessory(accessory, character) {
  switch (accessory.name) {
    case "NazarAmulet":
      character.attacks.forEach((attack, index) => {
        let newAttack = copyDefaultAttack(attack);
        newAttack.casts = attack.casts;
        newAttack.power += 1;
        character.attacks[index] = newAttack;
      });
      break;
    case "Biohazard":
      character.attacks.forEach((attack, index) => {
        if (attack.effect.name === "Curse") {
          let newAttack = copyDefaultAttack(attack);
          newAttack.casts = attack.casts;
          newAttack.effect.duration += 1;
          character.attacks[index] = newAttack;
        }
      });
      break;
    case "PortableDoctor":
      let healingAmount = 2;
      character.effects.push(Effects.Heal(healingAmount));
      break;
    default:
      break;
  }
}

function copyDefaultAttack(attack) {
  return Attacks[[attack.name]]();
}
