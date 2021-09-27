import { Character } from "../classes";
import * as Attacks from "./attackMaker/attacks";
import * as Items from "./itemMaker/itemsMaker";
import * as EnemyAttacks from "./enemyAttackMaker";

const defaultName = "Faust";
const startingHealth = 20;
const defaultEmoji = "wizard";
const defaultEffect = [];
const defaultMana = 2;
const defaultItems = [Items.SparklingHeart(), Items.Scissors()];

console.log(defaultItems);

export function makeCharacter(
  name = defaultName,
  health = startingHealth,
  maxHealth = 20,
  emojiName = defaultEmoji,
  effects = defaultEffect,
  mana = defaultMana,
  maxMana = defaultMana,
  items = defaultItems
) {
  return new Character(
    name,
    health,
    maxHealth,
    [Attacks.Fireball(), Attacks.Stupefy(), Attacks.Wither()],
    emojiName,
    effects,
    mana,
    maxMana,
    420,
    false,
    10,
    items
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
