import kaplay from "kaplay";

export default function initKaplay() {
  return kaplay({
    width: 256,
    height: 144,
    letterbox: true,
    global: false,
    debug: true, // put back to false in prod
    debugKey: "f1",
    canvas: document.getElementById("game"),
  });
}
