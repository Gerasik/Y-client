import AppControl from './AppControl';

describe('AppControl.prototype.render', () => {
  it('Should be an instance of Function', () => {
    expect(AppControl.prototype.start).toBeInstanceOf(Function);
  });

  it('Should be render search form', () => {
    AppControl.prototype.start.call();
    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('Should be render clips', () => {
    const context = {
      slider: {
        element: document.body,
        addSlide: document.body.appendChild(document.createElement('div')),
      },
    };
    const data = [{
      title: 'Title1',
      description: 'Desc1',
      image: './img1.png',
      date: 'publishedAt1',
      autor: 'title1',
      views: 11,
      id: 1,
    }, {
      title: 'Title2',
      description: 'Desc2',
      image: './img2.png',
      date: 'publishedAt2',
      autor: 'title2',
      views: 22,
      id: 2,
    }, {
      title: 'Title3',
      description: 'Desc3',
      image: './img3.png',
      date: 'publishedAt3',
      autor: 'title3',
      views: 33,
      id: 3,
    }];
    AppControl.renderClips.call(context, data);
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
