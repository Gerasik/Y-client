import AppModel from '../models/AppModel';
import AppMain from '../views/AppMain/AppMain';
import AppSlider from '../views/AppSlider/AppSlider';
import AppClips from '../views/AppClips/AppClips';

export default class App {
  constructor() {
    this.parametrs = {
      apiKey: 'AIzaSyAboqwlqPy-2bcz8E7RPz9mTmlhoQVCbvU',
      urlSearch: null,
      nextPageToken: null,
    };
    this.slider = null;
    this.currSlide = null;
    this.cursorPosition = null;
  }

  start() {
    const main = new AppMain(App.search.bind(this));
    main.render();
  }

  static async search(ev) {
    ev.preventDefault();
    if (this.parametrs.urlSearch) {
      App.slider.element.remove();
      document.querySelector('.pagination').remove();
    }
    const search = document.querySelector('.header-search__search');

    this.parametrs.urlSearch = search.value;

    const model = new AppModel(this.parametrs);
    const data = await model.getClipNames();
    App.slider = new AppSlider(App.move, App.lock);
    App.slider.render();
    App.currSlide = 0;
    App.parametrs = this.parametrs;
    App.parametrs.nextPageToken = data.nextPageToken;
    App.renderClips(await data.data);
  }

  static renderClips(data) {
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
    data.forEach((element) => {
      if (this.slider.element.lastElementChild.childElementCount === clipsCount) {
        this.slider.addSlide();
      }
      const clips = new AppClips(element, this.slider.element);
      clips.render();
    });
  }

  static unify(e) { return e.changedTouches ? e.changedTouches[0] : e; }

  static lock(e) { App.cursorPosition = App.unify(e).clientX; }

  static async move(e) {
    const pagination = document.querySelector('.pagination');
    if (e.type === 'click') {
      switch (e.target.parentNode.classList[0]) {
        case 'pagination__prev':
        case 'pagination__curr':
          if (App.currSlide > 0) App.currSlide -= 1;
          break;
        case 'pagination__next-page':
        case 'pagination__next':
          App.currSlide += 1;
          break;
        default:
      }
      pagination.childNodes[1].firstChild.innerHTML = App.currSlide + 1;
      pagination.childNodes[2].firstChild.innerHTML = App.currSlide + 2;
      if (App.currSlide > -1) {
        App.slider.element.childNodes.forEach(a => a.style.setProperty('transform', `translateX(-${App.currSlide}00%)`));
        if (App.currSlide === App.slider.element.childElementCount - 2) {
          const model = new AppModel(App.parametrs);
          const data = await model.getClipNames();
          App.parametrs.nextPageToken = data.nextPageToken;
          App.renderClips(await data.data);
        }
      }
    }
    if (App.cursorPosition || App.cursorPosition === 0) {
      const dx = App.unify(e).clientX - App.cursorPosition;
      if (dx > 0 && App.currSlide > 0) {
        App.currSlide -= 1;
      } else if (dx < 0) {
        App.currSlide += 1;
      }
      pagination.childNodes[1].firstChild.innerHTML = App.currSlide + 1;
      pagination.childNodes[2].firstChild.innerHTML = App.currSlide + 2;
      if (App.currSlide > -1) {
        App.slider.element.childNodes.forEach(a => a.style.setProperty('transform', `translateX(-${App.currSlide}00%)`));
        if (App.currSlide === App.slider.element.childElementCount - 2) {
          const model = new AppModel(App.parametrs);
          const data = await model.getClipNames();
          App.parametrs.nextPageToken = data.nextPageToken;
          App.renderClips(await data.data);
        }
      }
      App.cursorPosition = null;
    }
  }
}
