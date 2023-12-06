class Obstaculo {
  constructor(posicaoX, tipoObstaculo) {
    this.posicaoX = posicaoX;
    this.imagem = new Image();
    this.tipoObstaculo = tipoObstaculo;

    this.imagem.src = this.tipoObjetos(tipoObstaculo);
    this.imagem.onload = () => {
      this.altura = this.imagem.naturalHeight;
      this.largura = this.imagem.naturalWidth;
      this.posicaoY = ALTURA_CENARIO - this.imagem.naturalHeight;
    };
  }

  setPosicaoX(novaPosicao) {
    this.posicaoX = novaPosicao;
  }

  getPosicaoX() {
    return this.posicaoX;
  }

  tipoObjetos(type) {
    switch (type) {
      case 0:
        return "images/obs0.png";
      case 1:
        return "images/obs1.png";
      case 2:
        return "images/obs2.png";
      case 3:
        return "images/obs3.png";
      case 4:
        return "images/obs4.png";
    }
  }

  desenhaObjeto(ctx) {
    ctx.fillStyle = "black";
    ctx.drawImage(
      this.imagem,
      this.posicaoX,
      this.posicaoY,
      this.largura,
      this.altura
    );
  }
}
