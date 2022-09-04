export abstract class View<T> {

  protected elemento: HTMLElement;
  private escapar = false;

  constructor(seletor: string, escapar?: Boolean){
    const elemento = document.querySelector(seletor);
    if(elemento) {
      this.elemento = elemento as HTMLInputElement;
    } else {
      throw Error(`Seletor ${seletor} não existe!`);
    }
    if(escapar) {
      this.escapar = escapar;
    }
  };

  //Forçando a implementar o metodo template
  protected abstract template(model: T): string;

  public update(model: T): void{
    let template = this.template(model);
    if (this.escapar) {
      template = template.replace(/<script>[\s\S]*?<\/script>/, '');
    }
    this.elemento.innerHTML = template;
  };
}