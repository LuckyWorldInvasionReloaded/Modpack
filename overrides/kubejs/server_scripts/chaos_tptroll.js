// ============================================================================
//  chaos_tptroll.js  -  Chaos Lucky Block, luck -3 "10 random teleports" troll
// ----------------------------------------------------------------------------
//  Trigger: scoreboard tag "lwi_tptroll" (set by the Chaos LB -3 drop).
//  Effect: 9 rapid RANDOM teleports, each within 100 blocks of where you broke the
//  block (enough chaos that you lose all sense of place), then "ok i stop" held for
//  ~10 s, then a final 10th teleport + "oops".
//    Testing: /tag <you> add lwi_tptroll
// ============================================================================

const TP_TAG = "lwi_tptroll";
const TP_RADIUS = 100;   // max jump distance from the break point
const TP_MIN = 18;       // min jump distance so each TP clearly moves you
const TP_GAP = 12;       // ticks between the 9 rapid TPs (~0.6 s)

function rc(server, s) { try { server.runCommandSilent(s); } catch (e) {} }

// One random teleport to the surface, somewhere within [TP_MIN, TP_RADIUS] of (ox, oz).
function randTp(server, username, ox, oz) {
  let ang, dist, tx, tz;
  ang = Math.random() * Math.PI * 2;
  dist = TP_MIN + Math.random() * (TP_RADIUS - TP_MIN);
  tx = Math.floor(ox + Math.cos(ang) * dist);
  tz = Math.floor(oz + Math.sin(ang) * dist);
  rc(server, "spreadplayers " + tx + " " + tz + " 0 1 false " + username); // lands on the surface
  rc(server, "playsound minecraft:entity.enderman.teleport master " + username);
}

function scheduleTp(server, username, ox, oz, ticks) {
  server.scheduleInTicks(ticks, cb => { randTp(server, username, ox, oz); });
}

function startTpTroll(server, p) {
  let username, ox, oz, i;
  username = p.username;
  ox = Math.floor(p.x);
  oz = Math.floor(p.z);
  rc(server, "tag " + username + " remove " + TP_TAG); // consume the tag at once (no re-trigger)
  // 9 rapid teleports at ticks 0, 12, 24, ... 96
  for (i = 0; i < 9; i++) {
    scheduleTp(server, username, ox, oz, i * TP_GAP);
  }
  // just after the 9th (~6 s in): "ok i stop", held ~10 s
  server.scheduleInTicks(9 * TP_GAP + 14, cb => {
    rc(server, "title " + username + " times 10 220 20");
    rc(server, "title " + username + " title {\"text\":\"ok i stop\"}");
  });
  // ~10 s pause, then the final 10th teleport + "oops"
  server.scheduleInTicks(9 * TP_GAP + 14 + 200, cb => {
    randTp(server, username, ox, oz);
    rc(server, "title " + username + " times 10 70 20");
    rc(server, "title " + username + " title {\"text\":\"oops\"}");
  });
}

ServerEvents.tick(event => {
  let server;
  server = event.server;
  try {
    server.players.forEach(p => {
      if (p.tags.contains(TP_TAG)) {
        startTpTroll(server, p);
      }
    });
  } catch (e) {}
});

console.info("[chaos_tptroll] ready (tag '" + TP_TAG + "' triggers the 10-teleport troll)");
