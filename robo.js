class Robo {
  constructor(ctx) {
    this.ctx = ctx;
  }

  criaPartida() {
    function criaDinos() {
      const quantidadeDeObjetos = 10;

      const meuArray = [];
      for (let i = 0; i < quantidadeDeObjetos; i++) {
        meuArray.push(new Partida(50));
      }
      return meuArray;
    }

    function desenhaPartidas(ctx, cenario, p) {
      const quantidadeDeObjetos = 10;
      for (let i = 0; i < quantidadeDeObjetos; i++) {
        partida[i].desenha(ctx, cenario, p);
      }
    }

    function verificaBatidas(partida) {
      return partida.filter((item) => !item.getBateu());
    }
    let cenario = new Cenario(this.ctx);
    let partida = criaDinos();
    let p = setInterval(draw, 20);
    function draw() {
      cenario.limpar(this.ctx);
      cenario.atualizarCenario(this.ctx);
      cenario.desenhaContador(this.ctx);
      desenhaPartidas(this.ctx, cenario, p);
      partida = verificaBatidas(partida);
    }
  }
}
