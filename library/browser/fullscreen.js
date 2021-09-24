export default function fullscreen() {
  if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (elem.requestFullscreen) {
    document.documentElement.RequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
}
