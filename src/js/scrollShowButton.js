const floatButton = document.getElementsByClassName('.float-link');
floatButton.style.display = 'none';

window.onscroll = function () {
  if (this.scrollTop > 100) {
    floatButton.style.display = '';
  } else {
    floatButton.style.display = 'none';
  }
};
