class Dino {
  constructor(posicaoX) {
    this.posicaoX = posicaoX;
    //this.posicaoY = 110;
    this.posicaoY = 107;
    this.altura = 43;
    this.largura = 40;
    this.imagem = new Image();
    this.selecaoImagem = 0;
    this.metrica = new Metrica();
    //ia
    this.metricaPulo = [];

    this.salto = {
      pulando: false,
      gravidade: GRAVIDADE_INICIAL_PULO + SPEED / 1000,
      jumpIntervalId: null,
      alturaPuloDino: ALTURA_PULO,
      crouching: false,
    };
  }

  desenhaDino(ctx) {
    ctx.fillStyle = "blue";

    if (this.posicaoY + this.altura == ALTURA_CENARIO) {
      if (this.selecaoImagem < 10 && this.salto.crouching) {
        this.altura = 25;
        this.imagem.src = "images/dino2.png";
        this.selecaoImagem++;
      } else if (this.selecaoImagem < 20 && this.salto.crouching) {
        this.altura = 25;
        this.imagem.src = "images/dino3.png";
        this.selecaoImagem++;
      } else if (this.selecaoImagem < 10) {
        this.imagem.src = "images/dino1.png";
        this.selecaoImagem++;
        this.altura = this.imagem.naturalHeight;
      } else if (this.selecaoImagem < 20) {
        this.imagem.src = "images/dino0.png";
        this.selecaoImagem++;
        this.altura = this.imagem.naturalHeight;
      } else {
        this.selecaoImagem = 0;
      }
    } else {
      this.imagem.src = "images/dino5.bmp";
      this.altura = this.imagem.naturalHeight;
    }
    if (!this.salto.pulando) {
      this.posicaoY = ALTURA_CENARIO - this.altura;
    }

    ctx.fillRect(this.posicaoX, this.posicaoY, this.largura, this.altura);
    ctx.drawImage(
      this.imagem,
      this.posicaoX,
      this.posicaoY,
      this.largura,
      this.altura
    );
  }

  atualizaMetricas(objetos) {
    let tamArray = objetos.length;
    let cont = true;

    for (let i = 0; i < tamArray; i++) {
      if (
        this.posicaoX < objetos[i].posicaoX &&
        cont &&
        this.metrica.getTempoPercorrido() == 0
      ) {
        let distProxObj =
          objetos[i].posicaoX - (this.posicaoX + this.largura + SPEED);
        let alturaProjObj = objetos[i].altura;

        this.metrica.setDistProxObj(distProxObj);
        this.metrica.setAlturaProxObj(alturaProjObj);

        cont = false;
      }
    }
  }

  pular() {
    if (!this.salto.pulando) {
      // verifica se o dinossauro está no chão e a barra de espaço foi pressionada
      this.salto.pulando = true; // define pulando como true para indicar que o dinossauro começou a saltar
      if (this.salto.jumpIntervalId == null) {
        this.salto.jumpIntervalId = setInterval(() => {
          if (this.salto.crouching) {
            // verifica se o dinossauro está agachado e aplica uma força de gravidade maior se estiver
            this.salto.alturaPuloDino -=
              VELOCIDADE_ADICIONAL_AGACHAMENTO * this.salto.gravidade;
          } else {
            this.salto.alturaPuloDino -= this.salto.gravidade;
          } // adiciona a aceleração da gravidade à velocidade vertical do dinossauro
          this.posicaoY -= this.salto.alturaPuloDino; // atualiza a posição vertical do dinossauro
          if (this.posicaoY + this.altura >= ALTURA_CENARIO) {
            // verifica se o dinossauro atingiu o chão
            // define pulando como false para indicar que o dinossauro terminou de saltar
            this.posicaoY = ALTURA_CENARIO - this.altura; // define a posição vertical do dinossauro como a posição do chão
            this.salto.alturaPuloDino = ALTURA_PULO; // redefine a velocidade vertical do dinossauro como zero
            clearInterval(this.salto.jumpIntervalId); // para o loop de salto
            this.salto.jumpIntervalId = null;
            this.salto.pulando = false;
          }
        }, 20);
        //this.salto.crouching = false;
      }
    }
  }
  agachar() {
    this.salto.crouching = true;
  }

  resetarAgachamento() {
    this.salto.crouching = false;
  }

  getMetrica() {
    return this.metrica;
  }

  getMetricaPulo() {
    return this.metricaPulo;
  }

  setMetricaPulo(metricaPulo) {
    this.metricaPulo = metricaPulo;
  }

  getMetricaPulo() {
    return this.metricaPulo;
  }
}
