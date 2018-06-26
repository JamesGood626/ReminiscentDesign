(function(pathname) {
  console.log('nav-link-active running.');
  function addId(el) {
    var element = document.getElementById(el);
    var anchorTag = element.firstChild;
    console.log('This is the element in nav-link-active IIFE: ', element);
    anchorTag.setAttribute('id', `${el}-link-is-active`);
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