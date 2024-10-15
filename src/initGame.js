import initKaplay from "./kaplayCtx";

const k = initKaplay();

export default function initGame() {
  const DIAGONAL_FACTOR = 1 / Math.sqrt(2);

  const player = k.add([
    k.rect(16, 16),
    k.anchor("center"),
    k.pos(k.center()),
    "player",
    {
      speed: 128,
    },
  ]);

  player.onUpdate(() => {
    const movementVector = k.vec2(0, 0);

    console.log(k.isKeyDown("left"));

    if (k.isKeyDown("left")) movementVector.x = -1;
    if (k.isKeyDown("right")) movementVector.x = 1;
    if (k.isKeyDown("up")) movementVector.y = -1;
    if (k.isKeyDown("down")) movementVector.y = 1;

    if (movementVector.x && movementVector.y) {
      player.move(movementVector.scale(DIAGONAL_FACTOR * player.speed));
      return;
    }

    player.move(movementVector.scale(player.speed));
  });
}
