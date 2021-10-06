import { Companion } from "../../classes";
import * as CompanionAttacks from "../attackMaker/companionAttackMaker";

export function Squid() {
  const name = "Squid";
  const health = 5;
  const attacks = [CompanionAttacks.SuctionCups(), CompanionAttacks.Squeeze()];
  const emojiName = "squid";
  return new Companion(name, health, health, attacks, emojiName, []);
}
