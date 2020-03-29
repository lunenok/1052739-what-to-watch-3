const DEFAULT_GENRE = `All genres`;

export const getUniqueGenres = (movies) => {
  let genres = [DEFAULT_GENRE];
  movies.map((movie) => {
    genres.push(movie.genre);
  });
  return Array.from(new Set(genres));
};

export const getDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  if (hours < 1) {
    return `${minutes}m`;
  }
  return `${hours}h ${minutes}m`;
};

export const formatRating = (rating) => {
  return rating.toString().replace(`.`, `,`);
};

export const getTextRating = (rating) => {
  switch (true) {
    case (rating < 3):
      return `Bad`;
    case (rating < 5):
      return `Normal`;
    case (rating < 8):
      return `Good`;
    case (rating < 10):
      return `Very good`;
    case rating = 10:
      return `Awesome`;
    default:
      break;
  }
  return null;
};
