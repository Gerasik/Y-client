export default class AppMain {
  constructor(move, lock) {
    this.name = 'slider';
    this.element = null;
    this.lock = lock;
    this.move = move;
  }

  render() {
    if (!document.querySelector(`.${this.name}`)) {
      const slider = document.createElement('section');
      slider.classList.add(this.name);
      document.body.appendChild(slider);
    }
    this.addPagination();
    this.addSlide();

    document.querySelector(`.${this.name}`).addEventListener('mousedown', this.lock, false);
    document.querySelector(`.${this.name}`).addEventListener('touchstart', this.lock, false);
    document.querySelector(`.${this.name}`).addEventListener('mouseup', this.move, false);
    document.querySelector(`.${this.name}`).addEventListener('touchend', this.move, false);
  }

  addSlide() {
    this.element = document.querySelector(`.${this.name}`);
    const slide = document.createElement('div');
    slide.classList.add(`${this.name}__slide`);
    this.element.appendChild(slide);
  }

  addPagination() {
    const paginationBar = document.createElement('ul');
    const buttonPrev = document.createElement('li');
    const buttonCurrPage = document.createElement('li');
    const buttonNextPage = document.createElement('li');
    const buttonNext = document.createElement('li');

    paginationBar.classList.add('pagination');
    buttonPrev.classList.add('pagination__prev');
    buttonCurrPage.classList.add('pagination__curr');
    buttonNextPage.classList.add('pagination__next-page');
    buttonNext.classList.add('pagination__next');

    buttonPrev.innerHTML = '<button><</button>';
    buttonCurrPage.innerHTML = '<button>1</button>';
    buttonNextPage.innerHTML = '<button>2</button>';
    buttonNext.innerHTML = '<button>></button>';

    paginationBar.addEventListener('click', this.move, false);

    document.body.appendChild(paginationBar);
    paginationBar.appendChild(buttonPrev);
    paginationBar.appendChild(buttonCurrPage);
    paginationBar.appendChild(buttonNextPage);
    paginationBar.appendChild(buttonNext);

    window.addEventListener('resize', () => {
      let clipsCount;
      if (window.outerWidth > 1300) {
        clipsCount = 4;
      } else if (window.outerWidth <= 1300 && window.outerWidth > 768) {
        clipsCount = 3;
      } else if (window.outerWidth <= 768 && window.outerWidth > 425) {
        clipsCount = 2;
      } else if (window.outerWidth <= 425) {
        clipsCount = 1;
      }
      const dataList = [];
      while (this.element.childElementCount) {
        while (this.element.firstChild.childElementCount) {
          dataList.push(this.element.firstChild.removeChild(this.element.firstChild.firstChild));
        }
        this.element.firstChild.remove();
      }
      this.addSlide();
      dataList.forEach((elem) => {
        if (this.element.lastChild.childElementCount >= clipsCount) {
          this.addSlide();
        }
        this.element.lastChild.appendChild(elem);
      });
    });
  }
}
