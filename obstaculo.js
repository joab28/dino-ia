class Obstaculo {
  constructor(posicaoX, tipoObstaculo) {
    this.posicaoX = posicaoX;
    this.imagem = new Image();
    this.tipoObstaculo = tipoObstaculo;

    this.imagem.src = this.tipoObjetos(tipoObstaculo);
    this.imagem.onload = () => {
      this.altura = this.imagem.naturalHeight;
      this.largura = this.imagem.naturalWidth;
      if ([5, 4, 3].includes(tipoObstaculo)) {
        this.posicaoY = ALTURA_CENARIO - this.imagem.naturalHeight - 50;
      } else {
        this.posicaoY = ALTURA_CENARIO - this.imagem.naturalHeight - 5;
      }
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
      case 5:
        return "images/obs5.bmp";
    }
  }
}
