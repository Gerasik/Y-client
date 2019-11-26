import AppModel from './AppModel';

describe('AppModel.extractClipName', () => {
  it('should be an instance of Function', () => {
    expect(AppModel.extractClipName).toBeInstanceOf(Function);
  });

  const data = {
    items: [{
      snippet: {
        title: 'Title1',
        description: 'Desc1',
        thumbnails: { medium: './img1.png' },
        publishedAt: 'publishedAt1',
        channelTitle: 'title1',
        videoId: 1,
      },
      id: 1,
    },
    {
      snippet: {
        title: 'Title2',
        description: 'Desc2',
        thumbnails: { medium: './img2.png' },
        publishedAt: 'publishedAt2',
        channelTitle: 'title2',
        videoId: 1,
      },
      id: 2,
    },
    {
      snippet: {
        title: 'Title3',
        description: 'Desc3',
        thumbnails: { medium: './img3.png' },
        publishedAt: 'publishedAt3',
        channelTitle: 'title3',
        videoId: 3,
      },
      id: 3,
    }],
  };

  it('Should return Object', () => {
    const viewCounts = [11, 22, 33];
    const result = AppModel.extractClipName(data, viewCounts);
    expect(result).toBeInstanceOf(Object);
  });

  it('Should return Object with items', async () => {
    const viewCounts = await [11, 22, 33];
    const result = await AppModel.extractClipName(data, viewCounts);
    const answer = [{
      title: 'Title1',
      description: 'Desc1',
      image: './img1.png',
      date: 'publishedAt1',
      autor: 'title1',
      views: 11,
      id: undefined,
    }, {
      title: 'Title2',
      description: 'Desc2',
      image: './img2.png',
      date: 'publishedAt2',
      autor: 'title2',
      views: 22,
      id: undefined,
    }, {
      title: 'Title3',
      description: 'Desc3',
      image: './img3.png',
      date: 'publishedAt3',
      autor: 'title3',
      views: 33,
      id: undefined,
    }];
    expect(result).toEqual(answer);
  });
});
