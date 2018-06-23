(function(pathname) {
  function addId(el) {
    var element = document.getElementById(el);
    element.setAttribute('id', `${el}-link-is-active`);
  }

  switch(pathname) {
    case '/':
      addId('home');
      break;
    case '/about/':
      addId('about');
      break;
    case '/blog/':
      addId('blog');
      break;
    case '/contact/':
      addId('contact');
      break;
  }
})(window.location.pathname);