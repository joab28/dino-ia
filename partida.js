class Partida {
  constructor(posicaoDino) {
    this.dino = new Dino(posicaoDino);
    this.colisao = new Colisao();
    this.bateu = false;
  }

  desenha(ctx, cenario, current) {
    this.dino.drawDino(ctx);
    this.dino.atualizaMetricas(cenario.getObjetos());

    const colidiu = this.colisao.colisao(cenario.getObjetos(), this.dino);

    if (colidiu) {
      this.dino.metrica.setTempoPercorrido(cenario.getDistPercorrida());
      this.bateu = colidiu;
      if (HUMANO) {
        this.colisao.desenhaBatida(ctx);
        clearInterval(current);
      }
    }
  }

  getDino() {
    return this.dino;
  }

  getBateu() {
    return this.bateu;
  }
}
