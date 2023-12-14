class IA {
  constructor() {
    this.quantidadePartidas = 100;
    this.quantidadePesos = 6;
    this.geracaoNum = 0;
    this.partidas = this.criaPartidas();
    for (let i = 0; i < this.quantidadePartidas; i++) {
      this.defineMetricasAleatoriaPulo(this.partidas[i].getDino());
    }
  }

  calcula(partida) {
    const dino = partida.getDino();
    const metricaDino = partida.getDino().getMetrica();

    if (metricaDino.getDistProxObj() < 10) {
      dino.pular();
    }
  }

  criaPartidas() {
    const meuArray = [];
    for (let i = 0; i < this.quantidadePartidas; i++) {
      const partida = new Partida(50 + i + 10);
      meuArray.push(partida);
    }
    return meuArray;
  }

  defineMetricasAleatoriaPulo(dino) {
    let pesos = [];
    const min = -1000;
    const max = 1000;
    for (let i = 0; i < this.quantidadePesos; i++) {
      let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      pesos.push(randomNumber);
    }
    //[-411, 930, 771, -562, -64, -963] velocidade 15
    dino.setMetricaPulo(pesos);
    console.log(pesos);
  }

  torneio(partidaAntiga) {
    let partidasSorteadas = [];
    for (let i = 0; i < this.quantidadePartidas; i++) {
      let indice = Math.floor(Math.random() * this.quantidadePartidas);
      partidasSorteadas.push(partidaAntiga[indice]);
    }
    partidasSorteadas.sort((x, y) => {
      return (
        y.getDino().getMetrica().getTempoPercorrido() -
        x.getDino().getMetrica().getTempoPercorrido()
      );
    });
    return [
      partidasSorteadas[0].getDino().getMetricaPulo(),
      partidasSorteadas[1].getDino().getMetricaPulo(),
    ];
  }

  crossOver(paisSelecionados) {
    let filhos = [];
    let corte = Math.floor(Math.random() * this.quantidadePesos);
    filhos.push([
      ...paisSelecionados[0].slice(0, corte),
      ...paisSelecionados[1].slice(corte, this.quantidadePesos),
    ]);
    filhos.push([
      ...paisSelecionados[1].slice(0, corte),
      ...paisSelecionados[0].slice(corte, this.quantidadePesos),
    ]);
    return filhos;
  }

  mutacao(individual) {
    let alteracoes = 1; //direito a 1 alterações
    const min = -1000;
    const max = 1000;
    for (let i = 0; i < alteracoes; i++) {
      let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      let indice = Math.floor(Math.random() * this.quantidadePesos);
      individual[indice] = randomNumber;
    }
    console.log("mutacao", individual);
    return individual;
  }

  geracao() {
    const partidaAntiga = this.partidas;
    const partidaNova = this.criaPartidas();

    let novaGeracao = [];
    for (let i = 0; i < this.quantidadePartidas / 2; i++) {
      let metricasPulosSelecionada = this.torneio(partidaAntiga);
      let filhos;
      if (Math.floor(Math.random() * 100) <= 60) {
        filhos = this.crossOver(metricasPulosSelecionada);
      } else {
        filhos = metricasPulosSelecionada;
      }
      novaGeracao.push(...filhos);
    }

    for (let i = 0; i < this.quantidadePartidas; i++) {
      if (Math.floor(Math.random() * 100) <= 5) {
        let individual = this.mutacao(novaGeracao[i]);
        novaGeracao[i] = individual;
        partidaNova[i].getDino().setMetricaPulo(individual);
      } else {
        partidaNova[i].getDino().setMetricaPulo(novaGeracao[i]);
      }
    }
    this.partidas = partidaNova;
    this.geracaoNum = this.geracaoNum + 1;
    console.log("geracao: ", this.geracaoNum);
    console.log("nova geracao: ", novaGeracao);
  }

  decisaoPulo(dino) {
    const sinais = [];
    let metricasDino = dino.getMetrica();

    let metricas = [
      metricasDino.getDistProxObj(),
      SPEED,
      metricasDino.getTamProxObj(),
    ];
    let metricasPulo = dino.getMetricaPulo();
    for (let i = 0; i < this.quantidadePesos; i++) {
      sinais.push(metricasPulo[i] * metricas[i % metricas.length]);
    }
    let neuronio1 = sinais.slice(0, 3).reduce((acc, cur) => acc + cur);
    let neuronio2 = sinais.slice(3, 6).reduce((acc, cur) => acc + cur);

    if (neuronio1 < 0) {
      neuronio1 = 0;
    }
    if (neuronio2 < 0) {
      neuronio2 = 0;
    }

    if (neuronio1 > neuronio2) {
      dino.pular();
    } else if (neuronio1 < neuronio2) {
      dino.agachar();
    }
  }

  getPartidas() {
    return this.partidas;
  }
}
