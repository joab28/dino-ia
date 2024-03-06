class Cenario {
  constructor(ctx) {
    const objetos = this.montarObjetos();
    this.desenhaObstaculos(ctx, objetos);
    this.objetos = objetos;
    this.distPercorrida = 0;
    this.tempoInicial = Date.now();
  }

  montarObjetos() {
    let objetos = [];
    let soma = 0;
    for (let i = 0; i < 3000; i++) {
      let random = Math.floor(Math.random() * 450) + 450;
      let obstaculo = new Obstaculo(
        canvas.width + soma,
        Math.floor(Math.floor(Math.random() * 6))
      );
      objetos.push(obstaculo);
      soma = random + soma;
    }
    return objetos;
  }

  desenhaObstaculos(ctx, objetos) {
    ctx.fillStyle = "white";
    for (let i = 0; i < objetos.length; i++) {
      //teste
      ctx.fillRect(
        objetos[i].posicaoX,
        objetos[i].posicaoY,
        objetos[i].largura,
        objetos[i].altura
      );

      ctx.drawImage(
        objetos[i].imagem,
        objetos[i].posicaoX,
        objetos[i].posicaoY,
        objetos[i].largura,
        objetos[i].altura
      );
    }
  }

  desenhaContador(ctx) {
    ctx.font = "16px serif";
    ctx.strokeText(("0000000" + this.distPercorrida).slice(-7), 5, 15);

    ctx.strokeText("Vel:", 90, 15);
    ctx.strokeText(("000" + parseInt(VELOCIDADE_JOGO)).slice(-3), 120, 15);
  }

  atualizarCenario(ctx) {
    let tamArray = this.objetos.length;
    for (let i = 0; i < tamArray; i++) {
      this.objetos[i].posicaoX -= VELOCIDADE_JOGO;
    }
    //verificar se acabou os obstaculos, ele insere mais
    const ultimo = this.objetos[tamArray - 1];
    // -50 para dar tempo do objeto sair do cenário.
    if (ultimo.posicaoX < -50) {
      const objetos = this.montarObjetos();
      this.objetos = objetos;
    }
    if (VELOCIDADE_JOGO < 25) VELOCIDADE_JOGO = VELOCIDADE_JOGO + 0.005;

    this.setDistPercorrida(Date.now());

    this.desenhaObstaculos(ctx, this.objetos);
  }

  limpar(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  getObjetos() {
    return this.objetos;
  }

  getDistPercorrida() {
    return this.distPercorrida;
  }

  setDistPercorrida(distPercorrida) {
    this.distPercorrida = Math.floor(
      (distPercorrida - this.tempoInicial) / 100
    );
  }
}
