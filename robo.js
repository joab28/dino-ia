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
      ia.desenhaMetricas(this.ctx);
      if (partida.length == 0) {
        clearInterval(p);
        cenario = new Cenario(this.ctx);
        ia.geracao();
        partida = ia.getPartidas();
        SPEED = 7;
        p = setInterval(draw, 20);
      }
      let metricaPulo = partida[0].getDino().getMetricaPulo();
      document.getElementById("valor1").innerHTML = metricaPulo[0];
      document.getElementById("valor2").innerHTML = metricaPulo[1];
      document.getElementById("valor3").innerHTML = metricaPulo[2];
      document.getElementById("valor4").innerHTML = metricaPulo[3];
      document.getElementById("valor5").innerHTML = metricaPulo[4];
      document.getElementById("valor6").innerHTML = metricaPulo[5];
      document.getElementById("valor7").innerHTML = metricaPulo[6];
      document.getElementById("valor8").innerHTML = metricaPulo[7];
      document.getElementById("valor9").innerHTML = metricaPulo[8];
      document.getElementById("valor10").innerHTML = metricaPulo[9];
    };
    let cenario = new Cenario(this.ctx);
    const ia = new IA();
    let partida = ia.getPartidas();

    let p = setInterval(draw, 20);
  }
}
