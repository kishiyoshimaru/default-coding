'use strict';
const floatButton = document.getElementsByClassName('.float-link');
(floatButton.style.display = 'none'),
  (window.onscroll = function () {
    floatButton.style.display = 100 < this.scrollTop ? '' : 'none';
  });
