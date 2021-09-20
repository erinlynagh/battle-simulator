export function RenderHealth(health, maxHealth) {
  let style = { color: "#13A10E", marginTop: "-1em" };
  if (health / maxHealth <= 0.5) {
    style = { color: "#C19C00", marginTop: "-1em" };
  }
  if (health / maxHealth <= 0.25) {
    style = { color: "#C50F1F", marginTop: "-1em" };
  }
  return (
    <h4 style={style}>
      Health: {health}/{maxHealth}
    </h4>
  );
}
