const timeToSeconds = (time: string) => {
  const timeParts = time.split('.').map(Number);
  const minutes = timeParts[0];
  const seconds = timeParts.length > 1 ? timeParts[1] : 0;

  return minutes * 60 + seconds;
};

export const createYouTubeLink = (videoId: string, startTime: string) => {
  const startSeconds = timeToSeconds(startTime);
  return `https://www.youtube.com/watch?v=${videoId}&t=${startSeconds}s`;
};
