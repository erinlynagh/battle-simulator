import { RenderHealth, RenderEffects } from "./RenderElements";

export default function RenderCompanion({ index, companion }) {
  return (
    <div key={index} className="flex flex-col justify-center text-center">
      <p className="mt-2 text-7xl">{companion.emoji}</p>
      <h3>{companion.name}</h3>
      {RenderHealth(companion.health, companion.maxHealth)}

      {companion.effects.length > 0 && RenderEffects(companion)}
    </div>
  );
}
