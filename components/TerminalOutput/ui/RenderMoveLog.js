import React from "react";
import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

function RenderMoveLog({ enemyAttacks, enemies }) {
  console.log(enemyAttacks);
  console.log(enemies);
  let className = "text-red-700";
  if (Array.isArray(enemyAttacks) && enemyAttacks.length > 0) {
    className += "mb-1";
  }
  return (
    <div id="enemy-moves" className={className}>
      {enemyAttacks.map((attack, index) => {
        var enemy = enemies.find(({ id }) => id === attack.id);
        if (enemy === undefined) {
          return;
        }
        return (
          <React.Fragment key={index}>
            <span data-tip={tooltip()} className="block text-center">
              {attack.attackMessage
                ? "> " + enemy.name + " attacks with " + attack.attackMessage
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
