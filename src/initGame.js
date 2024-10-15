import initKaplay from "./kaplayCtx";
import { isTextBoxVisibleAtom, store, textBoxContentAtom } from "./store";

export default function initGame() {
  const DIAGONAL_FACTOR = 1 / Math.sqrt(2);
  const k = initKaplay();

  k.loadSprite("background", "./background.png");
  k.loadSprite("characters", "./characters.png", {
    sliceY: 2,
    sliceX: 8,
    anims: {
      "down-idle": 0,
      "up-idle": 1,
      "right-idle": 2,
      "left-idle": 3,
      right: { from: 4, to: 5, loop: true },
      left: { from: 6, to: 7, loop: true },
      down: { from: 8, to: 9, loop: true },
      up: { from: 10, to: 11, loop: true },
      "npc-down": 12,
      "npc-up": 13,
      "npc-right": 14,
      "npc-left": 15,
    },
  });

  k.add([k.sprite("background"), k.pos(0, -70), k.scale(8)]);

  const player = k.add([
    k.sprite("characters", { anim: "down-idle" }),
    k.area(),
    k.body(),
    k.anchor("center"),
    k.pos(k.center()),
    k.scale(8),
    "player",
    {
      speed: 800,
      direction: k.vec2(0, 0),
    },
  ]);

  player.onUpdate(() => {
    player.direction.x = 0;
    player.direction.y = 0;

    if (k.isKeyDown("left")) player.direction.x = -1;
    if (k.isKeyDown("right")) player.direction.x = 1;
    if (k.isKeyDown("up")) player.direction.y = -1;
    if (k.isKeyDown("down")) player.direction.y = 1;

    if (
      player.direction.eq(k.vec2(-1, 0)) &&
      player.getCurAnim().name !== "left"
    ) {
      player.play("left");
    }

    if (
      player.direction.eq(k.vec2(1, 0)) &&
      player.getCurAnim().name !== "right"
    ) {
      player.play("right");
    }

    if (
      player.direction.eq(k.vec2(0, -1)) &&
      player.getCurAnim().name !== "up"
    ) {
      player.play("up");
    }

    if (
      player.direction.eq(k.vec2(0, 1)) &&
      player.getCurAnim().name !== "down"
    ) {
      player.play("down");
    }

    if (
      player.direction.eq(k.vec2(0, 0)) &&
      !player.getCurAnim().name.includes("idle")
    ) {
      player.play(`${player.getCurAnim().name}-idle`);
    }

    if (player.direction.x && player.direction.y) {
      player.move(player.direction.scale(DIAGONAL_FACTOR * player.speed));
      return;
    }

    player.move(player.direction.scale(player.speed));
  });

  const npc = k.add([
    k.sprite("characters", { anim: "npc-left" }),
    k.area(),
    k.body({ isStatic: true }),
    k.anchor("center"),
    k.scale(8),
    k.pos(1480, 500),
  ]);

  npc.onCollide("player", (player) => {
    if (player.direction.eq(k.vec2(0, -1))) {
      store.set(textBoxContentAtom, "Beautiful day, isn't it?");
      npc.play("npc-down");
    }

    if (player.direction.eq(k.vec2(0, 1))) {
      npc.play("npc-up");
      store.set(textBoxContentAtom, "Those rocks are heavy!");
    }

    if (player.direction.eq(k.vec2(1, 0))) {
      npc.play("npc-left");
      store.set(textBoxContentAtom, "This text box is made with React.js!");
    }

    if (player.direction.eq(k.vec2(-1, 0))) {
      store.set(textBoxContentAtom, "Is the water too cold?");
      npc.play("npc-right");
    }

    store.set(isTextBoxVisibleAtom, true);
  });
}
