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
    this.attackMessage = this.setAttackMessage();
    this.id = uuidv4();
    this.displayName = name.match(/[A-Z][a-z]+|[0-9]+/g).join(" ");
  }
  getTooltip() {
    var tooltipString = "";
    if (this.power > 0) {
      tooltipString = `Deals ${this.power} damage`;
    }
    if (this.effect.name !== "None" && this.power > 0) {
      tooltipString += ", ";
    }
    if (this.effect.duration === 1) {
      tooltipString += this.effect.description
        .replace("BLANK", this.effect.duration)
        .replace("turns", "turn");
    } else if (this.effect.duration > 1) {
      tooltipString += this.effect.description.replace(
        "BLANK",
        this.effect.duration
      );
    }
    return tooltipString;
  }

  setAttackMessage(damage = this.power) {
    var string = "";
    if (damage > 0) {
      string = `Deals ${damage} damage. `;
    }
    if (this.effect.name !== "None") {
      string += `It applies a ${this.effect.name}`;
    }
    this.attackMessage = string;
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
    mana,
    maxMana,
    id = uuidv4(),
    animate = "None",
    coins = 10
  ) {
    this.effects = effects;
    this.name = name;
    this.health = health;
    this.maxHealth = maxHealth;
    this.attacks = attacks;
    this.emojiName = emojiName;
    this.emoji = emoji.getUnicode(emojiName);
    this.mana = mana;
    this.maxMana = maxMana;
    this.id = id;
    this.animate = animate;
    this.coins = coins;
  }
  hasEffect(effect) {
    return this.effects.findIndex(({ name }) => name === effect) > -1;
  }

  getEffectDuration(effect) {
    if (this.hasEffect(effect)) {
      let index = this.effects.findIndex(({ name }) => name === effect);
      return this.effects[index].duration;
    }
  }

  refreshMana() {
    this.mana = this.maxMana;
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
