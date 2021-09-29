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
  const description = "Spells in shops have 1 extra cast";
  let accessory = new Accessory(
    "Investment",
    description,
    "chart_with_upwards_trend"
  );
  return accessory;
}

export function PortableDoctor() {
  const description = "Heal 4 health at the end of every other turn";
  let accessory = new Accessory(
    "PortableDoctor",
    description,
    "woman_health_worker"
  );
  return accessory;
}
