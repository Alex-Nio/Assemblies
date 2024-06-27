// Класс для управления маской ввода на элементах форм
export class ilabMask {
  constructor(input, options) {
    this.$input = input;
    this.options = options;

    this.placeholder = this.options.placeholder;
    this.mask = new Set(this.options.mask || '_');
    this.regexp = new RegExp(this.options.regexp || '\\d', 'g');

    this.#setup();
    this.#render();
  }

  //* ============================Functions============================ *\\
  //* ================================================================= *\\

  clean = (input) => {
    input = input.match(this.regexp) || [];
    return Array.from(this.placeholder, (c) =>
      input[0] === c || this.mask.has(c) ? input.shift() || c : c
    );
  };

  format = () => {
    const selectionStart = this.$input.selectionStart;

    const [i, j] = [selectionStart, this.$input.selectionEnd].map((i) => {
      i = this.clean(this.$input.value.slice(0, i)).findIndex((c) =>
        this.mask.has(c)
      );
      return i < 0 ? selectionStart : i;
    });

    const cleanedValue = this.clean(this.$input.value).join('');

    if (cleanedValue !== this.$input.value) {
      this.$input.value = cleanedValue;
      this.$input.setSelectionRange(i, j);
    }
  };

  //* =============================Handlers============================ *\\
  //* ================================================================= *\\

  inputHandler() {
    this.format();
  }

  focusHandler() {
    this.format();
  }

  //* ==============================Private============================ *\\
  //* ================================================================= *\\

  #setup() {
    this.$input.addEventListener('input', this.inputHandler.bind(this));
    this.$input.addEventListener('focus', this.focusHandler.bind(this));
  }

  #render() {
    this.init();
  }

  //* ============================Public============================ *\\
  //* ================================================================= *\\

  init() {
    this.format();
  }
}
