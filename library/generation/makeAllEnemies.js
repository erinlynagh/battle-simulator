import * as EnemyMaker from "../../library/generation/characterMaker";
export default function makeAllEnemies() {
  return [
    [EnemyMaker.makeBat(), EnemyMaker.makeBat()],
    [EnemyMaker.makeBat(), EnemyMaker.makeOgre()],
    [EnemyMaker.makeOgre(), EnemyMaker.makeWolf()],
  ];
}
