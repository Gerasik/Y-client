export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  static async extractClipName(data, viewCounts) {
    const views = await viewCounts;
    function cteateItem(item, id) {
      const newItem = {};
      newItem.title = item.snippet.title;
      newItem.description = item.snippet.description;
      newItem.image = item.snippet.thumbnails.medium;
      newItem.date = item.snippet.publishedAt;
      newItem.autor = item.snippet.channelTitle;
      newItem.views = views[id];
      newItem.id = item.id.videoId;
      return newItem;
    }
    return data.items.map(cteateItem.bind(this));
  }

  static async extractViewCount(data, apiKey) {
    const clipsId = data.items.map(clip => clip.id.videoId).join(',');
    const url = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${clipsId}&part=snippet,statistics`;
    const responce = await fetch(url);
    const dataStatistic = await responce.json();
    return dataStatistic.items.map(item => item.statistics.viewCount);
  }

  async getClipNames() {
    const { apiKey, urlSearch, nextPageToken } = this.state;
    let url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=15&q=${urlSearch}`;
    if (nextPageToken) {
      url += `&pageToken=${nextPageToken}`;
    }
    const responce = await fetch(url);
    const data = await responce.json();
    return {
      data: AppModel.extractClipName(data, AppModel.extractViewCount(data, apiKey)),
      nextPageToken: data.nextPageToken,
    };
  }
}
