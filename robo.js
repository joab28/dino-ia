class Robo {
  constructor(ctx) {
    this.ctx = ctx;
  }

  desenhaPartidas(ctx, cenario, p, partida) {
    for (let i = 0; i < partida.length; i++) {
      partida[i].desenha(ctx, cenario, p);
    }
  }

  verificaBatidas(partida) {
    return partida.filter((item) => !item.getBateu());
  }

  criaPartida() {
    const draw = () => {
      cenario.limpar(this.ctx);
      cenario.atualizarCenario(this.ctx);
      cenario.desenhaContador(this.ctx);
      this.desenhaPartidas(this.ctx, cenario, p, partida);
      partida = this.verificaBatidas(partida);
      for (let i = 0; i < partida.length; i++) {
        ia.decisaoPulo(partida[i].getDino());
      }

      if (partida.length == 0) {
        clearInterval(p);
        cenario = new Cenario(this.ctx);
        ia.geracao();
        partida = ia.getPartidas();
        p = setInterval(draw, 20);
      }
    };
    let cenario = new Cenario(this.ctx);
    const ia = new IA();
    let partida = ia.getPartidas();
    let p = setInterval(draw, 20);
  }
}
