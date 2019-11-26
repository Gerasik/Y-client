import AppClips from './AppClips';

describe('AppClips.prototype.render', () => {
  it('Should be an instance of Function', () => {
    expect(AppClips.prototype.render).toBeInstanceOf(Function);
  });

  it('Should be render correctly', () => {
    const context = {
      data: {
        title: 'Title1',
        description: 'Desc1',
        image: './img1.png',
        date: 'publishedAt1',
        autor: 'title1',
        views: 11,
        id: 'sd',
      },
      parent: document.body,
    };
    document.body.appendChild(document.createElement('div'));
    AppClips.prototype.render.call(context);
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
