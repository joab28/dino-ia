class Dino {
  constructor(posicaoX) {
    this.posicaoX = posicaoX;
    //this.posicaoY = 110;
    this.posicaoY = 110;
    this.altura = 40;
    this.largura = 40;
    this.imagem = new Image();
    this.selecaoImagem = 0;
    this.metrica = new Metrica();

    this.salto = {
      pulando: false,
      gravidade: SPEED + GRAVIDADE_INICIAL_PULO,
      jumpIntervalId: null,
      alturaPuloDino: SPEED + ALTURA_PULO / SPEED,
      crouching: false,
    };
  }

  drawDino(ctx) {
    ctx.fillStyle = "black";
    if (this.selecaoImagem < 10) {
      this.imagem.src = "images/dino1.png";
      this.selecaoImagem++;
    } else if (this.selecaoImagem < 20) {
      this.imagem.src = "images/dino0.png";
      this.selecaoImagem++;
    } else {
      this.selecaoImagem = 0;
    }
    //teste
    ctx.fillStyle = "red";
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
        let tamProjObj = objetos[i].largura;

        this.metrica.setDistProxObj(distProxObj);
        this.metrica.setTamProxObj(tamProjObj);

        cont = false;
      }
    }

    //console.log(this.metrica.getDistProxObj());
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
              VELOCIDADE_ADICIONAL_AGACHAMENTO * (this.salto.gravidade / 14);
          } else {
            this.salto.alturaPuloDino -= this.salto.gravidade / 14;
          } // adiciona a aceleração da gravidade à velocidade vertical do dinossauro
          this.posicaoY -= this.salto.alturaPuloDino; // atualiza a posição vertical do dinossauro
          if (this.posicaoY + this.altura >= ALTURA_CENARIO) {
            // verifica se o dinossauro atingiu o chão
            // define pulando como false para indicar que o dinossauro terminou de saltar
            this.posicaoY = ALTURA_CENARIO - this.altura; // define a posição vertical do dinossauro como a posição do chão
            this.salto.alturaPuloDino = SPEED + ALTURA_PULO / SPEED; // redefine a velocidade vertical do dinossauro como zero
            clearInterval(this.salto.jumpIntervalId); // para o loop de salto
            this.salto.jumpIntervalId = null;
            this.salto.pulando = false;
          }
        }, 20);
      }
    }
  }

  agachar() {
    this.salto.crouching = true;
  }

  resetarSalto() {
    this.salto.crouching = false;
  }
}
