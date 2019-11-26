import AppMain from './AppMain';

describe('AppMain.prototype.render', () => {
  it('Should be an instance of Function', () => {
    expect(AppMain.prototype.render).toBeInstanceOf(Function);
  });

  it('Should be render correctly', () => {
    const context = {
      searchEvent: function a() {
        return 1;
      },
    };
    AppMain.prototype.render.call(context);
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
