interface FileOptions {}

export default class OpenFile {
  private input: HTMLInputElement;
  public options: FileOptions;
  constructor(opt: FileOptions) {}

  openFile() {
    const input = (this.input = document.createElement('input'));
    input.type = 'file';
    input.style.display = 'none';
    input.click();
    input.addEventListener('change', (event) => {
      console.log(event);
      console.log(this);
      document.removeChild(input);
    });
    document.body.appendChild(input);
  }
}
