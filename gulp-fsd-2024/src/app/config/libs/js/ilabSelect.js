export class ilabSelect {
  constructor(id, dropdownType, options) {
    this.$el = document.getElementById(`${id}`);
    this.type = dropdownType;
    this.options = options;
    this.selectedId = this.options.input.selectedId ?? null;

    this.#render();
    this.#setup();
  }

  //* ============================Functions============================ *\\
  //* ================================================================= *\\

  // Gets html template for select
  getTemplate = () => {
    const { data, input, elements } = this.options;

    if (this.type === 'default') {
      return this.#renderDefaultDropdown(
        data,
        input.value,
        elements.icon,
        this.selectedId
      );
    }

    if (this.type === 'search') {
      return this.#renderSearchDropdown(
        data,
        input.value,
        elements.icon,
        this.selectedId
      );
    }
  };

  // Normalize search query string
  normalizeString = (str) => {
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
  };

  // Updates display on elements
  updateDisplay = (visibleItems) => {
    const visibleItemsArray = Array.from(visibleItems);

    this.$items.forEach((item) => {
      item.style.display =
        visibleItemsArray.indexOf(item) !== -1 ? 'block' : 'none';
    });
  };

  // Search function
  searchByValue = (query) => {
    const normalizedQuery = this.normalizeString(query);
    const queryRegex = new RegExp(normalizedQuery, 'i');
    const results = [];

    this.$items.forEach((item) => {
      const text = item.innerText;
      let param = this.normalizeString(text);

      if (param.match(queryRegex)) {
        results.push(item);
      }
    });

    return results;
  };

  //* ================================Items============================ *\\
  //* ================================================================= *\\

  #renderDropdownItems(data) {
    const items = data.map((item) => {
      let trigger = '';

      if (item.id === this.selectedId) {
        trigger = this.trigger;
      }

      if (item.type === 'text') {
        return `
          <li class="select-dropdown-list__item ${trigger}" data-type="item" data-id="${item.id}">
            <span>${item.value}</span>
          </li>
        `;
      }

      if (item.type === 'link') {
        return `
          <a
            class="select-dropdown-list__item ${trigger}"
            data-id="${item.id}"
            data-type="item"
            href="${item.href}">
              ${item.value}
          </a>
        `;
      }

      return '';
    });

    return items.join('');
  }

  #renderDefaultDropdown(data = [], value, icon, selectedId) {
    const items = this.#renderDropdownItems(data);
    let text = this.current?.value ?? value ?? '';

    return `
      <div class="${this.parent}__backdrop" data-type="backdrop"></div>
      <div class="${this.parent}__input" data-type="input">
        <span data-type="value">${text}</span>
        <i class="${icon}" aria-hidden="true" data-type="icon"></i>
      </div>
      <div class="${this.parent}__dropdown">
        <ul class="${this.parent}__list ${this.parent}-list">
          ${items}
        </ul>
      </div>
    `;
  }

  #renderSearchDropdown(data = [], value, icon, selectedId) {
    const items = this.#renderDropdownItems(data);
    let placeholder = this.current?.value ?? value ?? '';

    return `
      <div class="${this.parent}__backdrop" data-type="backdrop"></div>
      <label class="${this.parent}__label" data-type="label">
        <input class="${this.parent}__input" type="search" data-type="value" placeholder="${placeholder}" autocomplete="off"/>
        <i class="${icon}" aria-hidden="true" data-type="icon"></i>
      </label>
      <div class="${this.parent}__dropdown">
        <ul class="${this.parent}__list ${this.parent}-list">
          ${items}
        </ul>
      </div>
    `;
  }

  //* ==============================Private============================ *\\
  //* ================================================================= *\\

  #render() {
    const { elements, conditions } = this.options;
    this.trigger = conditions.trigger;
    this.parent = elements.parent;

    this.$el.innerHTML = this.getTemplate();
    this.$el.classList.add(this.parent);
  }

  #setup() {
    if (this.type === 'default') {
      this.$el.addEventListener('click', this.clickHandler);
    }

    if (this.type === 'search') {
      this.$el.addEventListener('click', this.clickHandler);
      this.$el.addEventListener('input', this.inputHandler);
    }

    this.$icon = this.$el.querySelector('[data-type="icon"]');
    this.$value = this.$el.querySelector('[data-type="value"]');
  }

  //* ===============================Public============================ *\\
  //* ================================================================= *\\

  init() {
    const { data, input, elements } = this.options;

    this.$el.innerHTML = this.getTemplate(
      data,
      input.value,
      elements.icon,
      this.selectedId
    );
    this.$el.classList.add(elements.parent);

    this.#setup();
  }

  //* =============================Handlers============================ *\\
  //* ================================================================= *\\

  clickHandler = (e) => {
    const target = e.target.dataset.type ?? e.target.parentNode.dataset.type;

    e.preventDefault();

    if (target === 'input' || target === 'value') {
      if (this.type !== 'search') {
        this.toggle();
      }
    }

    if (target === 'icon' && this.type === 'search') {
      if (this.$icon.classList.contains(this.trigger)) {
        this.$value.value = '';
        this.$icon.classList.remove(this.trigger);
        this.close();
      }
    }

    if (target === 'item') {
      const id = e.target.dataset.id ?? e.target.parentNode.dataset.id;
      this.select(id);
    }

    if (target === 'backdrop') {
      this.close();
    }
  };

  inputHandler = (e) => {
    this.$items = this.$el.querySelectorAll('[data-type="item"]');

    const { min, results } = this.options.search || { min: 3, results: 3 };
    const currentValue = e.target.value.trim();
    let searchResults = this.searchByValue(currentValue);

    if (currentValue.length === 0) {
      this.$icon.classList.remove(this.trigger);
      this.close();
      return;
    }

    this.open();

    if (currentValue.length >= min) {
      this.updateDisplay(searchResults.slice(0, results));
    } else {
      this.updateDisplay(this.$items);
    }

    if (currentValue.length >= min && searchResults.length === 0) {
      this.close();
    }
  };

  //* ==============================Getters============================ *\\
  //* ================================================================= *\\

  get isOpen() {
    return this.$el.classList.contains(this.trigger);
  }

  get current() {
    return this.options.data.find((item) => item.id === +this.selectedId);
  }

  //* ==============================Methods============================ *\\
  //* ================================================================= *\\

  select(id) {
    const items = this.$el.querySelectorAll('[data-type="item"]');
    const currentItem = this.$el.querySelector(`[data-id='${id}']`);

    this.selectedId = id;

    if (this.type === 'default') {
      this.$value.textContent = this.current.value;
    }

    if (this.type === 'search') {
      this.$value.value = this.current.value;
    }

    this.options.onSelect ? this.options.onSelect(this.current) : null;

    items.forEach((item) => item.classList.remove(this.trigger));
    currentItem.classList.add(this.trigger);

    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$el.classList.add(this.trigger);
    this.$icon.classList.add(this.trigger);
  }

  close() {
    this.$el.classList.remove(this.trigger);
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler);
    this.$el.removeEventListener('input', this.inputHandler);
    this.$el.innerHTML = '';
  }
}
