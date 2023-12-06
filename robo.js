class Robo {
  constructor(ctx) {
    this.ctx = ctx;
  }

  criaDinos() {
    const quantidadeDeObjetos = 10;

    const meuArray = [];
    for (let i = 0; i < quantidadeDeObjetos; i++) {
      meuArray.push(new Partida(50 + i + 10));
    }
    return meuArray;
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
      console.log(partida);
      cenario.limpar(this.ctx);
      cenario.atualizarCenario(this.ctx);
      cenario.desenhaContador(this.ctx);
      this.desenhaPartidas(this.ctx, cenario, p, partida);
      partida = this.verificaBatidas(partida);

      if (partida.length == 0) {
        clearInterval(p);
      }
    };
    console.log("joabin");
    let cenario = new Cenario(this.ctx);
    let partida = this.criaDinos();
    let p = setInterval(draw, 20);
  }
}
