class IA {
  constructor() {
    this.quantidadePartidas = 800;
    this.quantidadePesos = 10;
    this.geracaoNum = 0;
    this.individuosSelecionados = [];
    this.partidas = this.criaPartidas();
    for (let i = 0; i < this.quantidadePartidas; i++) {
      this.defineMetricasAleatoriaPulo(this.partidas[i].getDino());
    }
  }

  criaPartidas() {
    const meuArray = [];
    for (let i = 0; i < this.quantidadePartidas; i++) {
      const partida = new Partida(50);
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

    dino.setMetricaPulo(pesos);
  }

  defineMetricasAleatoriaPuloComplementar() {
    let pesos = [];
    const min = -1000;
    const max = 1000;
    for (let i = 0; i < this.quantidadePesos; i++) {
      let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      pesos.push(randomNumber);
    }

    return pesos;
  }

  torneio(partidaAntiga) {
    let partidasSorteadas = [];
    for (let i = 0; i < this.quantidadePartidas/ 10; i++) {
      let indice = Math.floor(Math.random() * this.quantidadePartidas);

      do {
        indice = Math.floor(Math.random() * this.quantidadePartidas);
    } while (this.individuosSelecionados.includes(indice));
      partidaAntiga[indice].indice = indice;
      partidasSorteadas.push(partidaAntiga[indice]);
    }
    partidasSorteadas.sort((x, y) => {
      return (
        y.getDino().getMetrica().getTempoPercorrido() -
        x.getDino().getMetrica().getTempoPercorrido()
      );
    });
    this.individuosSelecionados.push( partidasSorteadas[0].indice, partidasSorteadas[1].indice);
    partidasSorteadas[0].indice = null;
    partidasSorteadas[1].indice = null;
    return [
      partidasSorteadas[0].getDino().getMetricaPulo(),
      partidasSorteadas[1].getDino().getMetricaPulo(),
    ];
  }

  selecaoPorRoleta(populacao) {
    // Calcula a soma total das aptidões na população
    var somaAptidoes = populacao.reduce(function (soma, individuo) {
      return soma + individuo.getDino().getMetrica().getTempoPercorrido();
    }, 0);

    // Gera um número aleatório entre 0 e a soma total das aptidões
    var pontoDeSelecao = Math.random() * somaAptidoes;

    // Realiza a seleção com base no ponto de seleção
    var acumulado = 0;
    for (var i = 0; i < populacao.length; i++) {
      acumulado += populacao[i].getDino().getMetrica().getTempoPercorrido();
      if (acumulado >= pontoDeSelecao) {
        // Retorna o indivíduo selecionado
        return populacao[i].getDino().getMetricaPulo();
      }
    }

    // Em caso de erro ou se nenhum indivíduo for selecionado
    return [];
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
    let alteracoes = 1; //direito a 1 alteração
    const min = -1000;
    const max = 1000;
    for (let i = 0; i < alteracoes; i++) {
      let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      let indice = Math.floor(Math.random() * this.quantidadePesos);
      individual[indice] = randomNumber;
    }
    console.log("Sofreu mutação");
    return individual;
  }

  geracao() {
    const partidaAntiga = this.partidas;
    const partidaNova = this.criaPartidas();
    let novaGeracao = [];
    for (let i = 0; i < this.quantidadePartidas / 2; i++) {
      let metricasPulosSelecionada = this.torneio(partidaAntiga);
      let filhos;
      if (Math.floor(Math.random() * 100) <= 70) {
        filhos = this.crossOver(metricasPulosSelecionada);
        novaGeracao.push(...filhos, ...metricasPulosSelecionada);
      } else {
        novaGeracao.push(...metricasPulosSelecionada);
      }
    }
    this.individuosSelecionados = [];
    let tamNovaGeracao = novaGeracao.length;
    for (let i = 0; i < tamNovaGeracao; i++) {
      if (Math.floor(Math.random() * 100) <= 10) {
        let individual = this.mutacao(novaGeracao[i]);
        novaGeracao.push(individual);
      }
    }
    while(novaGeracao.length < this.quantidadePartidas) {
      novaGeracao.push(this.defineMetricasAleatoriaPuloComplementar());
    }
    for (let i = 0; i < this.quantidadePartidas; i++) {
      partidaNova[i].getDino().setMetricaPulo(novaGeracao[i]);
      this.partidas = partidaNova;
    }
    this.geracaoNum = this.geracaoNum + 1;
  }

  desenhaMetricas(ctx) {
    ctx.font = "16px serif";
    ctx.strokeText("Geracao: ", 790, 15);
    ctx.strokeText(("0000" + this.geracaoNum).slice(-4), 850, 15);

    ctx.strokeText("Populacao: ", 675, 15);
    ctx.strokeText(("0000" + this.quantidadePartidas).slice(-4), 750, 15);
  }

  decisaoPulo(dino) {
    const sinais = [];
    let metricasDino = dino.getMetrica();

    let metricas = [
      Number(metricasDino.getDistProxObj().toFixed(0)),
      metricasDino.getAlturaProxObj(),
      Number(SPEED.toFixed(0)),
    ];
    let metricasPulo = dino.getMetricaPulo();
    for (let i = 0; i < this.quantidadePesos - 4; i++) {
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

    metricas = [neuronio1, neuronio2];

    for (let i = 6; i < this.quantidadePesos; i++) {
      sinais.push(metricasPulo[i] * metricas[i % metricas.length]);
    }

    neuronio1 = sinais.slice(6, 8).reduce((acc, cur) => acc + cur);
    neuronio2 = sinais.slice(8, 10).reduce((acc, cur) => acc + cur);

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
