import { Attack } from "../../classes";

export function newAttack(name, damage, effect, casts) {
  let attack = new Attack(name, damage, effect, casts);
  return attack;
}

module.exports = {
  ...require("./TierThree"),
  ...require("./TierTwo"),
  ...require("./TierOne"),
};
