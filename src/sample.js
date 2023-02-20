export default sample = (name) => {
    return `
    <a href="${name.largeImageURL}"> 
      <img src="${name.previewURL}" alt="" loading="lazy" />
      <div class="info">
        <p class="info-item info-item-1">
          <b>Likes</b>
          <span>${name.likes}</span>
        </p>
        <p class="info-item info-item-2">
          <b>Views</b>
          <span>${name.views}</span>
        </p>
        <p class="info-item info-item-3">
          <b>Comments</b>
          <span>${name.comments}</span>
        </p>
        <p class="info-item info-item-4">
          <b>Downloads</b>
          <span>${name.downloads}</span>
        </p>
      </div>
    </a>
    `
  }