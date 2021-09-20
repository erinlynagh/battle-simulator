const emoji = require("emoji-dictionary");

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export class Attack {
  constructor(name, power, effect) {
    this.name = name;
    this.power = power;
    this.effect = effect;
  }
}

export class EnemyAttack extends Attack {
  constructor(name, power, effect, chance, priority) {
    super(name, power, effect);
    this.chance = chance;
    this.priority = priority;
  }
}

export class Character {
  constructor(name, health, attacks, emojiName) {
    this.id = uuidv4();
    this.effects = [];
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.attacks = attacks;
    this.emojiName = emojiName;
    this.emoji = emoji.getUnicode(emojiName);
  }
}

export class Enemy extends Character {
  constructor(name, health, attacks, emojiName, expGiven) {
    super(name, health, attacks, emojiName);
    this.expGiven = expGiven;
  }
}

export class Effect {
  constructor(name, duration, description) {
    this.name = name;
    this.duration = duration;
    this.description = description;
  }
}
