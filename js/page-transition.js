// The outermost wrapper -> barba-wrapper
// The innermost container -> barba-container

(function (Barba, TweenLite, TimelineLite, window) {
  function addId(el) {
    removeActive()
    var element = document.getElementById(el);
    var anchorTag = element.firstChild;
    anchorTag.setAttribute('id', `${el}-link-is-active`);
  }

  function removeActive() {
    var navAnchors = document.querySelectorAll('.nav-anchor');
    navAnchors.forEach(el => { if(el.id) { el.removeAttribute('id'); } });
  }

  function switchPathname(pathname) {
    switch(pathname) {
      case '/':
        addId('home');
        break;
      case '/about':
        addId('about');
        break;
      case '/blog':
        addId('blog');
        break;
      case '/contact':
        addId('contact');
        break;
    }
  }

  var leftBlock = document.querySelector('.left-transition-block');
  var rightBlock = document.querySelector('.right-transition-block');
  var tl = new TimelineMax();
  tl.to(leftBlock, 0.6, { x: '50%', ease: Circ.easeOut });
  tl.to(rightBlock, 0.6, { x: '-50%', ease: Circ.easeOut }, '-=0.6');
  tl.to(leftBlock, 0.8, { x: '-100%', ease: Power2.easeOut }, '+=0.2')
  tl.to(rightBlock, 0.8, { x: '100%', ease: Power2.easeOut }, '-=0.8')
  tl.pause();

  function startGreensockTransition() {
    switchPathname(window.location.pathname);
    tl.play();
    tl.time(0);
  }

  Barba.Pjax.start();

  var FadeTransition = Barba.BaseTransition.extend({
    start: function() {
      console.log(this);
      /**
       * This function is automatically called as soon the Transition starts
       * this.newContainerLoading is a Promise for the loading of the new container
       * (Barba.js also comes with an handy Promise polyfill!)
       */

      // As soon the loading is finished and the old page is faded out, let's fade the new page
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function() {
      /**
       * this.oldContainer is the HTMLElement of the old Container
       */
      
      startGreensockTransition();

      return $(this.oldContainer).delay(300).animate({ zIndex: -9001 }).promise();
    },

    fadeIn: function() {
      /**
       * this.newContainer is the HTMLElement of the new Container
       * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
       * Please note, newContainer is available just after newContainerLoading is resolved!
       */

      var _this = this;
      var $el = $(this.newContainer);

      $(this.oldContainer).hide();

      // I can overwrite this transition set up
      // and make the page elements come in with flashy stylez
      // Could use CSS clip-path... But just checked browser support and
      // IE and Edge don't support it, at 88% global support and 59% prefixed.
      // May need to utilize SVG clip paths instead.
      // clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 0);
	    // -webkit-clip-path: polygon(0 0, 0 100%, 80% 100%, 80% 0);

      $el.css({
        visibility : 'visible',
        opacity : 0
      });

      $el.animate({ opacity: 1 }, 400, function() {
        /**
         * Do not forget to call .done() as soon your transition is finished!
         * .done() will automatically remove from the DOM the old Container
         */

        _this.done();
      });
    }
  });

  /**
   * Next step, you have to tell Barba to use the new Transition
   */

  Barba.Pjax.getTransition = function() {
    /**
     * Here you can use your own logic!
     * For example you can use different Transition based on the current page or link...
     */

    return FadeTransition;
  };
})(Barba, TweenMax, TimelineMax, window);








// // EXAMPLE BARBA ANIMATION TRANSITION 

// var FadeTransition = Barba.BaseTransition.extend({
//     start: function() {
//       /**
//        * This function is automatically called as soon the Transition starts
//        * this.newContainerLoading is a Promise for the loading of the new container
//        * (Barba.js also comes with an handy Promise polyfill!)
//        */

//       // As soon the loading is finished and the old page is faded out, let's fade the new page
//       Promise
//         .all([this.newContainerLoading, this.fadeOut()])
//         .then(this.fadeIn.bind(this));
//     },

//     fadeOut: function() {
//       /**
//        * this.oldContainer is the HTMLElement of the old Container
//        */

//       return $(this.oldContainer).animate({ opacity: 0 }).promise();
//     },

//     fadeIn: function() {
//       /**
//        * this.newContainer is the HTMLElement of the new Container
//        * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
//        * Please note, newContainer is available just after newContainerLoading is resolved!
//        */

//       var _this = this;
//       var $el = $(this.newContainer);

//       $(this.oldContainer).hide();

//       $el.css({
//         visibility : 'visible',
//         opacity : 0
//       });

//       $el.animate({ opacity: 1 }, 400, function() {
//         /**
//          * Do not forget to call .done() as soon your transition is finished!
//          * .done() will automatically remove from the DOM the old Container
//          */

//         _this.done();
//       });
//     }
//   });

//   /**
//    * Next step, you have to tell Barba to use the new Transition
//    */

//   Barba.Pjax.getTransition = function() {
//     /**
//      * Here you can use your own logic!
//      * For example you can use different Transition based on the current page or link...
//      */

//     return FadeTransition;
//   };

// END BARBA ANIMATION EXAMPLE










// The Rudimentary page transition implementation

// (function(window, history, document) {
//   var cache = {};
//   function loadPage(url) {
//     if (cache[url]) {
//       return new Promise(function(resolve) {
//         resolve(cache[url]);
//       });
//     }

//     return fetch(url, {
//       method: 'GET'
//     }).then(function(response) {
//       cache[url] = response.text();
//       return cache[url];
//     });
//   }

//   var main = document.querySelector('main');

//   function changePage() {
//     // Note, the URL has already been changed
//     var url = window.location.href;

//     loadPage(url).then(function(responseText) {
//       var wrapper = document.createElement('div');
//           wrapper.innerHTML = responseText;

//       var oldContent = document.querySelector('.heading-container');
//       var newContent = wrapper.querySelector('.heading-container');

//       main.appendChild(newContent);
//       animate(oldContent, newContent);
//     });
//   }

//   function animate(oldContent, newContent) {
//     oldContent.style.position = 'absolute';

//     var fadeOut = oldContent.animate({
//       opacity: [1, 0]
//     }, 1000);

//     var fadeIn = newContent.animate({
//       opacity: [0, 1]
//     }, 1000);

//     fadeIn.onfinish = function() {
//       oldContent.parentNode.removeChild(oldContent);
//     };
//   }

//   window.addEventListener('popstate', changePage);

//   document.addEventListener('click', function(e) {
//     var el = e.target;

//     // Go up in the nodelist until we find a node with .href (HTMLAnchorElement)
//     while (el && !el.href) {
//       el = el.parentNode;
//     }

//     if (el) {
//       e.preventDefault();
//       history.pushState(null, null, el.href);
//       changePage();

//       return;
//     }
//   });
// })(window, history, document);