import { Character } from "../classes";
import * as Attacks from "./attackMaker/attacks";
import * as Items from "./itemMaker/itemsMaker";
import * as Accessories from "./accessoryMaker/accessorMaker";
import * as EnemyAttacks from "./enemyAttackMaker";

export function makeCharacter(
  name = "Faust",
  health = 20,
  maxHealth = 20,
  emojiName = "wizard",
  effects = [],
  mana = 9,
  maxMana = 9,
  attacks = [
    Attacks.Fireball(),
    Attacks.Stupefy(),
    Attacks.Wither(),
    Attacks.Hex(),
    Attacks.CircularCurse(),
  ],
  items = [Items.SparklingHeart(), Items.Scissors(), Items.ExpeditedAnathema()],
  accessories = [],
  coins = 10
) {
  return new Character(
    name,
    health,
    maxHealth,
    attacks,
    emojiName,
    effects,
    mana,
    maxMana,
    420,
    false,
    coins,
    items,
    accessories
  );
}

export function makeBat() {
  const name = "Bat";
  const health = 4;
  const attacks = [EnemyAttacks.Scratch()];
  const emojiName = "bat";
  return new Character(name, health, health, attacks, emojiName, [], 0, 0);
}

export function makeOgre() {
  const name = "Ogre";
  const health = 25;
  const attacks = [EnemyAttacks.Gouge(), EnemyAttacks.OgreSlam()];
  const emojiName = "japanese_ogre";
  return new Character(name, health, health, attacks, emojiName, [], 0, 0);
}

export function makeWolf() {
  const name = "Wolf";
  const health = 15;
  const attacks = [EnemyAttacks.Gouge(), EnemyAttacks.HowlingBite()];
  const emojiName = "wolf";
  return new Character(name, health, health, attacks, emojiName, [], 0, 0);
}

export function makeGoblin() {
  const name = "Goblin";
  const health = 24;
  const attacks = [EnemyAttacks.GoblinsTrick(), EnemyAttacks.DrainingStab()];
  const emojiName = "japanese_goblin";
  return new Character(name, health, health, attacks, emojiName, [], 0, 0);
}
