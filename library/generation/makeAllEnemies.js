import * as EnemyMaker from "../../library/generation/enemyMaker";
export default function makeAllEnemies() {
  return [
    [EnemyMaker.makeBat(), EnemyMaker.makeBat()],
    [EnemyMaker.makeBat(), EnemyMaker.makeOgre()],
    [EnemyMaker.makeOgre(), EnemyMaker.makeWolf()],
  ];
}
