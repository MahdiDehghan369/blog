const calculateRelativeTimeDifference = (created_at) => {
  const currentTime = new Date();
  const createdAtTime = new Date(created_at);

  const difference = Math.abs(currentTime - createdAtTime);
  const seconds = Math.floor(difference / 1000);

  if (seconds < 60) {
    return "همین الان";
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} دقیقه پیش`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} ساعت پیش`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days} روز پیش`;
  }
};

module.exports = calculateRelativeTimeDifference;
