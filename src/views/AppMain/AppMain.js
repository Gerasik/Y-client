export default class AppMain {
  constructor(searchEvent) {
    this.searchEvent = searchEvent;
    this.name = 'header-search';
  }

  render() {
    const header = document.createElement('header');
    const searchForm = document.createElement('form');
    const search = document.createElement('input');
    const submit = document.createElement('input');

    search.setAttribute('type', 'text');
    search.setAttribute('placeholder', 'Search');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Search');

    header.classList.add(this.name);
    search.classList.add(`${this.name}__search`);

    document.body.appendChild(header);
    header.appendChild(searchForm);
    searchForm.appendChild(submit);
    searchForm.appendChild(search);

    searchForm.addEventListener('submit', this.searchEvent, false);
  }
}
