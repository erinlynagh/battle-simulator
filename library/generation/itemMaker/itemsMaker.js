import { Item } from "../../classes";

export function SparklingHeart() {
  const description = "Increases max health by 5, then increases health by 5";
  let item = new Item("Healing Heart", description, "sparkling_heart");
  return item;
}

export function Scissors() {
  const description = "Deals 5 damage to all enemies";
  let item = new Item("Scissors", description, "scissors");
  return item;
}

export function FaultyPlug() {
  const description = "Applies 1 Stun to all enemies";
  let item = new Item("FaultyPlug", description, "electric_plug");
  return item;
}

export function ReallyShinyDust() {
  const description = "Applies 1 Reflect to the User";
  let item = new Item("ReallyShinyDust", description, "sparkles");
  return item;
}