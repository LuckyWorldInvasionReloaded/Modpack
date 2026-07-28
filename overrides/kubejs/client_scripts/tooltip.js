const LANG_KEY_HULK_HAMMER = "toolkit.mutantsbuff.upgraded_hulk_hammer";

/**
 * Item tooltip tweaks.
 */
ItemEvents.tooltip((event) => {
  event.addAdvanced(
    "mutantsbuff:upgraded_hulk_hammer",
    (item, advanced, text) => {
      text.remove(1);
      text.add(1, Text.gray(Text.translate(LANG_KEY_HULK_HAMMER)));
    }
  );

  // Cheesecake à la merde (Yummy Lucky Block): the doubt is part of the dish.
  event.add("kubejs:cheesecake_a_la_merde", [
    Text.gray("YUMMY (or is it?)").italic(true),
  ]);
});
