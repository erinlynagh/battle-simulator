import React from "react";
import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

function RenderMoveLog({ enemyAttacks, enemies }) {
  console.log(enemyAttacks);
  console.log(enemies);
  let style = { color: "#c50f1f" };
  if (Array.isArray(enemyAttacks) && enemyAttacks.length > 0) {
    style = { color: "#c50f1f", marginBottom: "1vh" };
  }
  return (
    <div id="enemy-moves" style={style}>
      {enemyAttacks.map((attack, index) => {
        return (
          <React.Fragment key={index}>
            <span
              data-tip={tooltip()}
              style={{ display: "block", textAlign: "center" }}
            >
              {attack.attckMessage
                ? "> " +
                  enemies[index].name +
                  " attacks with " +
                  attack.attackMessage
                : attack}
              <ReactTooltip html={true} />
            </span>
          </React.Fragment>
        );

        function tooltip() {
          if (attack?.effect?.getTooltip) {
            return attack.effect.getTooltip();
          } else {
            return "";
          }
        }
      })}
    </div>
  );
}

export default RenderMoveLog;
