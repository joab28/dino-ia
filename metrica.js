class Metrica {
  constructor() {
    this.distProxObj = null;
    this.alturaProxObj = null;
    this.tempoPercorrido = 0;
  }

  getDistProxObj() {
    return this.distProxObj;
  }

  setDistProxObj(distProxObj) {
    this.distProxObj = distProxObj;
  }

  getAlturaProxObj() {
    return this.alturaProxObj;
  }

  setAlturaProxObj(alturaProxObj) {
    this.alturaProxObj = alturaProxObj;
  }

  getTempoPercorrido() {
    return this.tempoPercorrido;
  }

  setTempoPercorrido(tempoPercorrido) {
    this.tempoPercorrido = tempoPercorrido;
  }
}
