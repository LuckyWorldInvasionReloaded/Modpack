// =============================================================================
// Day-based floor for the Game Stages of Majrusz's Progressive Difficulty.
//   Forces Expert on day EXPERT_DAY, Master on day MASTER_DAY, with no downgrade
//   (reads the current stage via the Majrusz API -> never steps back down).
//   The native Nether->Expert / Dragon->Master triggers stay active.
//   SETTING: change EXPERT_DAY / MASTER_DAY below, then /reload.
// =============================================================================

const EXPERT_DAY = 20;
const MASTER_DAY = 30;
const ORDER = { normal: 0, expert: 1, master: 2 };

let GSHelper = null;
try {
  GSHelper = Java.loadClass("com.majruszsdifficulty.gamestage.GameStageHelper");
} catch (e) {
  console.warn("[auto_gamestage] Java.loadClass failed: " + e);
}

let tick = 0;

ServerEvents.tick((event) => {
  if (++tick % 40 !== 0) return; // ~2 s

  let day = -999;
  try {
    day = Math.floor(Number(event.server.overworld().getDayTime()) / 24000);
  } catch (e) {
    console.warn("[auto_gamestage] getDayTime failed: " + e);
  }

  let stage = "?";
  try {
    if (GSHelper) stage = "" + GSHelper.getGlobalGameStage().getId();
  } catch (e) {
    stage = "ERR:" + e;
  }

  if (!GSHelper || day < 0) return;
  const cur = stage in ORDER ? ORDER[stage] : 0;
  if (cur >= ORDER.master) return;

  let target = -1;
  let name = "";
  if (day >= MASTER_DAY) {
    target = ORDER.master;
    name = "master";
  } else if (day >= EXPERT_DAY) {
    target = ORDER.expert;
    name = "expert";
  }

  if (target > cur) {
    event.server.runCommandSilent("gamestage " + name);
    console.info("[auto_gamestage] -> stage " + name.toUpperCase() + " forced on day " + day);
  }
});

console.info("[auto_gamestage] active (Expert D" + EXPERT_DAY + ", Master D" + MASTER_DAY + ")");
