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
  let item = new Item("Faulty Plug", description, "electric_plug");
  return item;
}
