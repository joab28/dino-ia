class Humano {
  constructor(ctx) {
    this.ctx = ctx;
  }
  criaParitda() {
    let cenario = new Cenario(this.ctx);
    let partida = new Partida(50);
    let p = setInterval(draw, 20);

    function draw() {
      cenario.limpar(this.ctx);
      cenario.atualizarCenario(this.ctx);
      cenario.desenhaContador(this.ctx);
      partida.desenha(this.ctx, cenario, p);
    }

    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 13 && partida.getBateu()) {
        cenario = new Cenario(this.ctx);
        partida = new Partida(50);
        p = setInterval(draw, 20);
      }
      if (e.keyCode == 32 || e.keyCode == 38) {
        partida.getDino().pular();
      } else if (e.keyCode == 40) {
        partida.getDino().agachar();
      }
    });
    // document.addEventListener("keyup", (e) => {
    //   partida.getDino().resetarAgachamento();
    // });
  }
}
