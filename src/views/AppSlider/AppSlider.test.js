import AppSlider from './AppSlider';

describe('AppSlider.prototype.render', () => {
  it('Should be an instance of Function', () => {
    expect(AppSlider.prototype.render).toBeInstanceOf(Function);
  });

  it('Should be render correctly', () => {
    const context = {
      lock: function a() {
        return 1;
      },
      move: function b() {
        return 2;
      },
      addPagination: function c() {
        return 3;
      },
      addSlide: function d() {
        return 4;
      },
    };
    AppSlider.prototype.render.call(context);
    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('Should be render slide', () => {
    const context = {
      element: document.body,
    };
    AppSlider.prototype.addSlide.call(context);
    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('Should be render slider pagination', () => {
    const context = {
      element: document.body,
    };
    AppSlider.prototype.addPagination.call(context);
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
