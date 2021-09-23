import * as EnemyMaker from "../../library/generation/characterMaker";
export default function makeAllEnemies() {
  return [
    [EnemyMaker.makeWolf(), EnemyMaker.makeWolf(), EnemyMaker.makeBat()],
    [EnemyMaker.makeBat(), EnemyMaker.makeBat()],
    [EnemyMaker.makeGoblin()],
    [EnemyMaker.makeBat(), EnemyMaker.makeOgre()],
    [EnemyMaker.makeOgre(), EnemyMaker.makeWolf()],
    [EnemyMaker.makeBat(), EnemyMaker.makeBat()],
    [EnemyMaker.makeGoblin(), EnemyMaker.makeBat()],
    [EnemyMaker.makeWolf(), EnemyMaker.makeGoblin()],
    [EnemyMaker.makeOgre(), EnemyMaker.makeOgre()],
    [EnemyMaker.makeGoblin(), EnemyMaker.makeWolf(), EnemyMaker.makeBat()],
  ];
}
