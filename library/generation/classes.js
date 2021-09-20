const emoji = require("emoji-dictionary");

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export class Attack {
  constructor(name, power, effect, castsRemaining = 2) {
    this.name = name;
    this.power = power;
    this.effect = effect;
    this.casts = castsRemaining;
  }
  getTooltip() {
    let tooltipString = "";
    if (((this.effect.description === "") == this.effect.duration) < 2) {
      tooltipString += `Deals ${this.power} damage`;
    }
    if (this.effect.duration === 2) {
      tooltipString +=
        `, and then ` +
        this.effect.description
          .replace("BLANK", this.effect.duration - 1)
          .replace("turns", "turn");
    } else if (this.effect.duration > 2) {
      tooltipString +=
        `, and then ` +
        this.effect.description.replace("BLANK", this.effect.duration - 1);
    }
    return tooltipString;
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
  constructor(
    name,
    health,
    maxHealth,
    attacks,
    emojiName,
    effects = [],
    mana = 2,
    maxMana = 2
  ) {
    this.id = uuidv4();
    this.effects = effects;
    this.name = name;
    this.health = health;
    this.maxHealth = maxHealth;
    this.attacks = attacks;
    this.emojiName = emojiName;
    this.emoji = emoji.getUnicode(emojiName);
    this.mana = mana;
    this.maxMana = maxMana;
  }
  hasEffect(effect) {
    return this.effects.findIndex(({ name }) => name === effect) > -1;
  }
  getEffectIndex(effect) {
    return this.effects.findIndex(({ name }) => name === effect);
  }
}

export class Enemy extends Character {
  constructor(name, health, attacks, emojiName) {
    super(name, health, health, attacks, emojiName);
  }
}

export class Effect {
  constructor(name, duration, description) {
    this.name = name;
    this.duration = duration;
    this.description = description;
  }

  getTooltip() {
    if (this.duration === 1) {
      return this.description
        .replace("BLANK", this.duration)
        .replace("turns", "turn");
    }
    return this.description.replace("BLANK", this.duration);
  }
}
