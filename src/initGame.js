import initKaplay from "./kaplayCtx";

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
    },
  ]);

  player.onUpdate(() => {
    const movementVector = k.vec2(0, 0);

    console.log(k.isKeyDown("left"));

    if (k.isKeyDown("left")) movementVector.x = -1;
    if (k.isKeyDown("right")) movementVector.x = 1;
    if (k.isKeyDown("up")) movementVector.y = -1;
    if (k.isKeyDown("down")) movementVector.y = 1;

    if (
      movementVector.eq(k.vec2(-1, 0)) &&
      player.getCurAnim().name !== "left"
    ) {
      player.play("left");
    }

    if (
      movementVector.eq(k.vec2(1, 0)) &&
      player.getCurAnim().name !== "right"
    ) {
      player.play("right");
    }

    if (movementVector.eq(k.vec2(0, -1)) && player.getCurAnim().name !== "up") {
      player.play("up");
    }

    if (
      movementVector.eq(k.vec2(0, 1)) &&
      player.getCurAnim().name !== "down"
    ) {
      player.play("down");
    }

    if (
      movementVector.eq(k.vec2(0, 0)) &&
      !player.getCurAnim().name.includes("idle")
    ) {
      player.play(`${player.getCurAnim().name}-idle`);
    }

    if (movementVector.x && movementVector.y) {
      player.move(movementVector.scale(DIAGONAL_FACTOR * player.speed));
      return;
    }

    player.move(movementVector.scale(player.speed));
  });

  const npc = k.add([
    k.sprite("characters", { anim: "npc-left" }),
    k.area(),
    k.body({ isStatic: true }),
    k.anchor("center"),
    k.scale(8),
    k.pos(1480, 500),
  ]);
}
