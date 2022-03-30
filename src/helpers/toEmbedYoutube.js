export default function embedYoutubeUrl(url) {
  const res = url.split('=');
  const embeddedUrl = `https://www.youtube.com/embed/${res[1]}`;
  return embeddedUrl;
}
