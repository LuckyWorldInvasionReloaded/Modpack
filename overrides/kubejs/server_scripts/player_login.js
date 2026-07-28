const LANG_KEY_LWI = "lucky_world_invasion.title";
const LANG_KEY_LOGIN_MSG_0 = "lucky_world_invasion.login.message.0";
const LANG_KEY_LOGIN_MSG_1 = "lucky_world_invasion.login.message.1";

/**
 * Login greeting and hints.
 */
PlayerEvents.loggedIn((event) => {
  const { player } = event;
  player.tell(
    Text.translate(`%s[%s]%s`, [
      Text.translate(LANG_KEY_LOGIN_MSG_0),
      Text.yellow(Text.translate(LANG_KEY_LWI)),
      Text.translate(LANG_KEY_LOGIN_MSG_1),
    ])
  );
});
