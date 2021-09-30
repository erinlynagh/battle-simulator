const emoji = require("emoji-dictionary");

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getAttackTooltip(attack) {
  var tooltipString = "";
  if (attack.power > 0) {
    tooltipString = `Deals ${attack.power} damage`;
  }
  if (attack.effect.name !== "None" && attack.power > 0) {
    tooltipString += ", ";
  }
  if (attack.effect.duration === 1) {
    tooltipString += attack.effect.description
      .replace("BLANK", attack.effect.duration)
      .replace("turns", "turn");
  } else if (attack.effect.duration > 1) {
    tooltipString += attack.effect.description.replace(
      "BLANK",
      attack.effect.duration
    );
  }
  return tooltipString;
}

export function setAttackMessage(attack, damage = attack.power) {
  var string = "";
  if (damage > 0) {
    string = `Deals ${damage} damage. `;
  }
  if (attack.effect.name !== "None") {
    string += `It applies a ${attack.effect.displayName}`;
  }
  attack.attackMessage = string;
}

export class Attack {
  constructor(name, power, effect, castsRemaining = 2) {
    this.name = name;
    this.power = power;
    this.effect = effect;
    this.casts = castsRemaining;
    this.attackMessage = setAttackMessage(this);
    this.id = uuidv4();
    this.displayName = name.match(/[A-Z][a-z]+|[0-9]+/g).join(" ");
  }
}

export class EnemyAttack extends Attack {
  constructor(name, power, effect, chance, priority) {
    super(name, power, effect);
    this.chance = chance;
    this.priority = priority;
  }
}

export function characterHasEffect(character, effect) {
  return character.effects.findIndex(({ name }) => name === effect) > -1;
}

export class Character {
  constructor(
    name,
    health,
    maxHealth,
    attacks,
    emojiName,
    effects = [],
    mana,
    maxMana,
    id = uuidv4(),
    animate = "None",
    coins = 10,
    items,
    accessories
  ) {
    this.id = id;
    this.name = name;
    this.health = health;
    this.maxHealth = maxHealth;
    this.effects = effects;
    this.attacks = attacks;
    this.items = items;
    this.emojiName = emojiName;
    this.emoji = emoji.getUnicode(emojiName);
    this.mana = mana;
    this.maxMana = maxMana;
    this.coins = coins;
    this.animate = animate;
    this.items = items;
    this.accessories = accessories;
  }

  getEffectDuration(effect) {
    if (characterHasEffect(this, effect)) {
      let index = this.effects.findIndex(({ name }) => name === effect);
      return this.effects[index].duration;
    }
  }

  refreshMana() {
    this.mana = this.maxMana;
  }
}

export function getEffectToolTip(effect) {
  console.log(effect);
  if (effect.duration === 1) {
    return effect.description
      .replace("BLANK", effect.duration)
      .replace("turns", "turn");
  }
  return effect.description.replace("BLANK", effect.duration);
}

export class Effect {
  constructor(name, duration, description) {
    this.name = name;
    this.displayName = name.match(/[A-Z][a-z]+|[0-9]+/g).join(" ");
    this.duration = duration;
    this.description = description;
  }
}

export class Item {
  constructor(name, description, emojiName) {
    this.name = name;
    this.displayName = name.match(/[A-Z][a-z]+|[0-9]+/g).join(" ");
    this.description = description;
    this.emojiName = emojiName;
    this.emoji = emoji.getUnicode(emojiName);
  }
}

export class Accessory {
  constructor(name, description, emojiName) {
    this.name = name;
    this.displayName = name.match(/[A-Z][a-z]+|[0-9]+/g).join(" ");
    this.description = description;
    this.emojiName = emojiName;
    this.emoji = emoji.getUnicode(emojiName);
  }
}
