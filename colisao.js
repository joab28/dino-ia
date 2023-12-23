class Colisao {
  colisao(obstaculos, dino) {
    for (let i = 0; i < obstaculos.length; i++) {
      if (
        dino.posicaoX + dino.largura + SPEED > obstaculos[i].posicaoX &&
        dino.posicaoY + dino.altura > obstaculos[i].posicaoY &&
        !(dino.posicaoY > obstaculos[i].posicaoY + obstaculos[i].altura) &&
        dino.posicaoX - dino.largura + SPEED < obstaculos[i].posicaoX
      ) {
        return true;
      }
    }
    return false;
  }

  desenhaBatida(ctx) {
    ctx.font = "20px serif";
    ctx.strokeText("bateu!", 400, 75);
  }
}
