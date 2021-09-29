import { Accessory } from "../../classes";

export function NazarAmulet() {
  const description = "All damage increased by 1";
  let accessory = new Accessory("NazarAmulet", description, "nazar_amulet");
  return accessory;
}

export function Biohazard() {
  const description = "Increase Hex applied by spells by 1";
  let accessory = new Accessory("Biohazard", description, "biohazard");
  return accessory;
}

export function Investment() {
  const description = "Increase the casts for all spells by 1";
  let accessory = new Accessory(
    "Investment",
    description,
    "chart_with_upwards_trend"
  );
  return accessory;
}
