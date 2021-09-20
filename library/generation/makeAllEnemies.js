import * as EnemyMaker from "../../library/generation/enemyMaker";
export default function makeAllEnemies() {
  return [
    [EnemyMaker.makeBat(), EnemyMaker.makeBat()],
    [EnemyMaker.makeBat(), EnemyMaker.makeOrge()],
  ];
}
