import { Item } from "../../classes";

export function SparklingHeart() {
  const description = "Increases max health by 5, then increases health by 5";
  let item = new Item("SparklingHeart", description, "sparkling_heart");
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

export function Battery() {
  const description = "Increases your mana by 1";
  let item = new Item("Battery", description, "battery");
  return item;
}

export function Apple() {
  const description = "Heal 10 health";
  let item = new Item("Apple", description, "apple");
  return item;
}

export function ExpeditedAnathema() {
  const description = "Double a random (cursed) enemies curse";
  let item = new Item("ExpeditedAnathema", description, "package");
  return item;
}
