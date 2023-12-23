var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const ALTURA_CENARIO = canvas.height;
let SPEED = 7;
const ALTURA_PULO = 10;
const GRAVIDADE_INICIAL_PULO = 0.55;
const VELOCIDADE_ADICIONAL_AGACHAMENTO = 6;
const HUMANO = false;

if (HUMANO) {
  const humano = new Humano(ctx);
  humano.criaParitda();
} else {
  const robo = new Robo(ctx);
  robo.criaPartida();
}
