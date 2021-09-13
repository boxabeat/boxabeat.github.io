(function($){

    "use strict";
// this script requires jQuery
$(document).ready(function() {
    Footnotes.setup();

    var modulefront = $('#main'),
    overlayMenu     = $('#overlay-menu'),
    navbar          = $('#nav-wrapper'),
    modules         = $('.module-front, .module, .module-small'),
    windowWidth     = Math.max($(window).width(), window.innerWidth),
    navbatTrans,
    mobileTest;
    var $window = $(window),
        $html = $('.master');

    function resize() {
        if ($window.width() < 481) {
            return $html.addClass('scrollingnav');
        }

        $html.removeClass('scrollingnav');
    }

    $window
        .resize(resize)
        .trigger('resize');

var lastScroll = 0;
$(window).scroll(function()
{
     var nowScroll = $(this).scrollTop();
     if(nowScroll > lastScroll && nowScroll > 300)
     {
          $('.scrollingnav').fadeOut(600);
     }
     else
     {
          $('.scrollingnav').fadeIn(300);
     }
     lastScroll = nowScroll;
});

        /* ---------------------------------------------- /*
         * Mobile detect
         /* ---------------------------------------------- */

         if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mobileTest = true;
         } else {
            mobileTest = false;
         }


        /* ---------------------------------------------- /*
         * Parallax
         /* ---------------------------------------------- */

         if (mobileTest === true) {
            $('.module-parallax').css({'background-attachment': 'scroll'});
         } else {
            $('#front.module-parallax').parallax('50%', 0.2);
         }

        /* ---------------------------------------------- /*
         * Full height module
         /* ---------------------------------------------- */

         function buildModulefront() {
            if (modulefront.length > 0) {
                if (modulefront.hasClass('module-full-height')) {
                    modulefront.height($(window).height());
                } else {
                    modulefront.height($(window).height() * 0.85);
                }
            }
         }
        /* ---------------------------------------------- /*
         * Show/Hide overlay menu
         /* ---------------------------------------------- */

         $('.toggle-menu').on('click', function() {
            if ($(window).width() < 960) {
            showMenu();
            $('body').addClass('aux-navigation-active');
            return false;
}
         });

         $('#overlay-menu-hide').on('click', function() {
            hideMenu();
            $('body').removeClass('aux-navigation-active');
            return false;
         });

         $('.overlay-menu-inner').on('click', function(e) {
          var className = $(e.target).attr('class');
      console.log(className);
              if (!$(e.target).hasClass('link')) {
                              hideMenu();
            $('body').removeClass('aux-navigation-active');
            return false;
              }
         });


         $(window).keydown(function(e) {
            if (overlayMenu.hasClass('active')) {
                if (e.which === 27) {
                    hideMenu();
                }
            }
         });

         function showMenu() {
            navbar.animate({'opacity': 0, 'top': -80}, {
                duration: 150,
                easing: 'easeInOutQuart'
            });

            overlayMenu.addClass('active');
         }

         function hideMenu() {
            navbar.animate({'opacity': 1, 'top': 0}, {
                duration: 150,
                easing: 'easeInOutQuart'
            });

            overlayMenu.removeClass('active');
         }

});
        /* ---------------------------------------------- /*
         * Overlay dropdown menu
         /* ---------------------------------------------- */

         $('#overflow-nav > li.slidedown > a').on('click', function() {
            if ($(this).attr('class') != 'active') {
                $('#overflow-nav li ul').slideUp({duration: 300, easing: 'easeInOutQuart'});
                $('#overflow-nav li a').removeClass('active');
                $(this).next().slideToggle({duration: 300, easing: 'easeInOutQuart'}).addClass('open');
                $(this).addClass('active');
            } else {
                $('#overflow-nav li ul').slideUp({duration: 300, easing: 'easeInOutQuart'}).removeClass('open');
                $(this).removeClass('active');
            }
            return false;
         });

var Footnotes = {
    footnotetimeout: false,
    setup: function() {
        var footnotelinks = $("a[rel='footnote-back']")
        var footnotereflinks = $("a[rel='footnote']")

        $("a[rel='footnote']").on('click',Footnotes.footnotescroll);
        $("a[rel='footnote-back']").on('click',Footnotes.footnotescroll);

        footnotereflinks.unbind('mouseover',Footnotes.footnoteover);
        footnotereflinks.unbind('mouseout',Footnotes.footnoteoout);
        
        footnotereflinks.bind('mouseover',Footnotes.footnoteover);
        footnotereflinks.bind('mouseout',Footnotes.footnoteoout);
    },
    footnoteover: function() {
        clearTimeout(Footnotes.footnotetimeout);
        $('#footnotediv').stop();
        $('#footnotediv').remove();
        
        var id = $(this).attr('href').substr(1);
        var position = $(this).offset();

        var div = $(document.createElement('div'));
        div.attr('id','footnotediv');
        div.bind('mouseover',Footnotes.divover);
        div.bind('mouseout',Footnotes.footnoteoout);

        var el = document.getElementById(id);
        div.html($(el).html());
        
        $(document.body).append(div);

        var left = position.left;
        if(left + (div.width() + 20)  > $(window).width())
            left = $(window).width() - (div.width() + 20);
        var top = position.top+20;
        if(top + div.height() > $(window).height() + $(window).scrollTop())
            top = position.top - div.height() - 15;
        div.css({
            left:left,
            top:top
        });
    },
    footnoteoout: function() {
        Footnotes.footnotetimeout = setTimeout(function() {
            $('#footnotediv').animate({
                opacity: 0
            }, 600, function() {
                $('#footnotediv').remove();
            });
        },100);
    },
    divover: function() {
        clearTimeout(Footnotes.footnotetimeout);
        $('#footnotediv').stop();
        $('#footnotediv').css({
            opacity: 0.9
        });
    },


    footnotescroll: function(e) {
      var t, a, n, r, o, i;

      if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") || location.hostname === this.hostname) {
        if (e.preventDefault(), o = $("nav.navbar").height() + 32, $(this).hasClass("footnote-backref")) 
            return i = "footnote-highlight", n = $(this), t = $('[id="' + n.attr("href").slice(1) + '"]'), 
        a = t.closest("p, ul, ol, sup"), a.addClass(i), a.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", 
            function() {
              return console.log("hello"), a.removeClass(i)
          }), $("html,body").animate({
              scrollTop: a.offset().top - o
          }, 500), !1;
          if ($(this).hasClass("footnote-ref")) {
              if (r = this.hash.slice(1), n = $('[id="' + r + '"]'), n.length) return $("html,body").animate({
                scrollTop: n.offset().top - o
            }, 500), !1
          } else if (n = $(this.hash), n = n.length ? n : $('[name="' + this.hash.slice(1)(NaN)), n.length) return $("html,body").animate({
              scrollTop: n.offset().top - o
          }, 500), !1
      }
  }

}

$(document).ready(function(){
    $('a[href^="#"]:not(a[rel="footnote"]):not(a[rev="footnote"]):not(a[id="backtotop"])').on('click',function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        console.log($target);
        $('html, body').stop().animate({
         'scrollTop': $target.offset().top
     }, 500, 'swing');
    });
    $('a[id="backtotop"]').on('click',function (e) {
        e.preventDefault();
        $('html, body').stop().animate({ scrollTop: 0 }, 400, 'swing');
    });

});


    
$(window).scroll(function() {
  if ($(this).scrollTop() > 100) {
    $('.scroll-up').fadeIn();
} else {
    $('.scroll-up').fadeOut();
}
});

$('a[href="#main]').click(function() {
  $('html, body').animate({ scrollTop: 0 }, 'slow');
  return false;
});


 //   $(window).scroll(function(e){ 
 //   var $el = $('.toc-container'); 
 //   var isPositionFixed = ($el.css('position') == 'fixed');
 //   if ($(this).scrollTop() > 500 && !isPositionFixed){ 
 //     $el.css({'position': 'fixed', 'top': '10%', 'left': $('.container').offset().left + $('.container').width() + '50px', 'height': 'auto'}); 
 //   }
 //   if ($(this).scrollTop() < 500 && isPositionFixed){
 //     $el.css({'position': 'static', 'top': '0px'}); 
 //   } 
 // });

        /* ---------------------------------------------- /*
         * popup
         /* ---------------------------------------------- */

         $(document).ready(function() {
            $('.image-link').magnificPopup({type:'image'});
         });

         $('.test-popup-link').magnificPopup({
            type: 'image',
            preload: [1,3],
            gallery:{
                enabled:true
            }
         });


$(document).ready(function() {
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
            gallery:{
                enabled:true
            },

        fixedContentPos: false
    });
});

$(document).ready(function(){
 $(".slider").slick({

  // normal options...
  infinite: true,

  dots: true,
  adaptiveHeight: false,
  arrows: true,
  lazyLoad: 'ondemand',
  // the magic
  responsive: [{

      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        infinite: true,
        dots: true
      }

    }, {

      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        infinite: true,
        dots: true
      }

    }]
});


});

(function() {
                function logElementEvent(eventName, element) {
                    console.log(
                        Date.now(),
                        eventName,
                        element.getAttribute("data-src"),
                    );
                }
                var callback_enter = function(element) {
                    logElementEvent("ENTERED", element);
                };
                var callback_exit = function(element) {
                    logElementEvent("EXITED", element);
                };
                var callback_reveal = function(element) {
                    logElementEvent("REVEALED", element);
                };
                var callback_loaded = function(element) {
                    logElementEvent("LOADED", element);
                };
                var callback_error = function(element) {
                    logElementEvent("ERROR", element);
                    element.src =
                        "https://via.placeholder.com/440x560/?text=Error+Placeholder";
                };
                var callback_finish = function() {
                    logElementEvent("FINISHED", document.documentElement);
                };
                var ll = new LazyLoad({
                    threshold: 0,
                    // Assign the callbacks defined above
                    callback_enter: callback_enter,
                    callback_exit: callback_exit,
                    callback_reveal: callback_reveal,
                    callback_loaded: callback_loaded,
                    callback_error: callback_error,
                    callback_finish: callback_finish,
                    use_native: "true"
                });
            })();

$('.multiple-items').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3
});

    })(jQuery);


var Iris = ( function($){

    var init = function( options ){

        /** Banner Parallax */
        $(window).scroll(function () {
            scrollBanner();
        });

    };


    /**
     * Parallax Banner Function
     */
     var scrollBanner = function() {

        /** Scroll and fade out the banner text */
        $('.paralaxtitle').css({
            'margin-top' : -( $(this).scrollTop() / 5 ) + "px",
            'opacity' : 1 - ( $(this).scrollTop() / 200 ),
            '-ms-filter' : 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + 1 - ( $(this).scrollTop() / 200 ) + ')'
        });
        $('.paralaxsubtitle').css({
            'margin-top' : -( $(this).scrollTop() / 5 ) + "px",
            'opacity' : 1 - ( $(this).scrollTop() / 350 ),
            '-ms-filter' : 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + 1 - ( $(this).scrollTop() / 350 ) + ')'
        });
     };

     /** Public API */
     return {
        init: init,
     }




 })(jQuery);

 jQuery(document).ready( function() {
    Iris.init();
 });





        /* ---------------------------------------------- /*
         * appear
         /* ---------------------------------------------- */

         appear = (function(){
            'use strict';
            var scrollLastPos = null, scrollTimer = 0, scroll = {};

            function track(){
    var newPos = window.scrollY || window.pageYOffset;  // pageYOffset for IE9
    if ( scrollLastPos != null ){
        scroll.velocity = newPos - scrollLastPos;
        scroll.delta = (scroll.velocity >= 0) ? scroll.velocity : (-1 * scroll.velocity);
        console.log('velocity:', scroll.velocity, 'delta:', scroll.delta);
    }
    scrollLastPos = newPos;
    if(scrollTimer){
        clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(function(){
        scrollLastPos = null;
    }, 30);
}
addEventListener('scroll', track, false);

  // determine if a given element (plus an additional "bounds" area around it) is in the viewport
  function viewable(el, bounds){
    var rect = el.getBoundingClientRect();
    return (
        (rect.top + rect.height) >= 0 &&
        (rect.left + rect.width) >= 0 &&
        (rect.bottom - rect.height) <= ( (window.innerHeight || document.documentElement.clientHeight) + bounds) &&
        (rect.right - rect.width) <= ( (window.innerWidth || document.documentElement.clientWidth) + bounds)
        );
  }

  return function(obj){

    return (function(obj){
        var initd = false, elements = [], elementsLength, reappear = [],
        appeared = 0, disappeared = 0, timer, deltaSet, opts = {}, done;

      // handle debouncing a function for better performance on scroll
      function debounce(fn, delay) {
        return function () {
            var self = this, args = arguments;
            clearTimeout(timer);
            console.log('debounce()');
            timer = setTimeout(function () {
                fn.apply(self, args);
            }, delay);
        };
      }

      // called on scroll and resize event, so debounce the actual function that does
      // the heavy work of determining if an item is viewable and then "appearing" it
      function checkAppear() {
        if(scroll.delta < opts.delta.speed) {
            if(!deltaSet) {
                deltaSet = true;
                doCheckAppear();
                setTimeout(function(){
                    deltaSet = false;
                }, opts.delta.timeout);
            }
        }
        (debounce(function() {
            doCheckAppear();
        }, opts.debounce)());
      }

      function begin() {
        // initial appear check before any scroll or resize event
        doCheckAppear();

        // add relevant listeners
        addEventListener('scroll', checkAppear, false);
        addEventListener('resize', checkAppear, false);
    }

    function end() {
        elements = [];
        if(timer) {
            clearTimeout(timer);
        }
        removeListeners();
    }

    function removeListeners() {
        console.log('remove listeners');
        removeEventListener('scroll', checkAppear, false);
        removeEventListener('resize', checkAppear, false);
    }

    function doCheckAppear() {
        if(done) {
            return;
        }
        console.log('doCheckReappear()');
        elements.forEach(function(n, i){
            if(n && viewable(n, opts.bounds)) {
            // only act if the element is eligible to reappear
            if(reappear[i]) {
              // mark this element as not eligible to appear
              reappear[i] = false;
              // increment the count of appeared items
              appeared++;
              console.log('appears:', appeared);
              // call the appear fn
              if(opts.appear) {
                opts.appear(n);
              }
              // if not tracking reappears or disappears, need to remove node here
              if(!opts.disappear && !opts.reappear) {
                // stop tracking this node, which is now viewable
                elements[i] = null;
            }
        }
    } else {
        if(reappear[i] === false) {
            if(opts.disappear) {
                opts.disappear(n);
            }
              // increment the dissappeared count
              disappeared++;
              console.log('disappears:', disappeared);
              // if not tracking reappears, need to remove node here
              if(!opts.reappear) {
                // stop tracking this node, which is now viewable
                elements[i] = null;
            }
        }
            // element is out of view and eligible to be appeared again
            reappear[i] = true;
        }
    });

        // remove listeners if all items have (re)appeared
        if(!opts.reappear && (!opts.appear || opts.appear && appeared === elementsLength) && (!opts.disappear || opts.disappear && disappeared === elementsLength)) {
          // ensure done is only called once (could be called from a trailing debounce/throttle)
          done = true;
          removeListeners();
          // all items have appeared, so call the done fn
          if(opts.done){
            opts.done();
          }
      }
  }

  function init() {
        // make sure we only init once
        if(initd) {
            return;
        }
        initd = true;

        // call the obj init fn
        if(opts.init) {
            opts.init();
        }
        // get the elements to work with
        var els;
        if(typeof opts.elements === 'function') {
            els = opts.elements();
        } else {
            els = opts.elements;
        }
        if(els) {
          //  put elements into an array object to work with
          elementsLength = els.length;
          for(var i = 0; i < elementsLength; i += 1) {
            elements.push(els[i]);
            reappear.push(true);
          }
          begin();
      }
  }

  return function(obj) {
    obj = obj || {};

        // assign the fn to execute when a node is visible
        opts = {
          // a function to be run when the dom is ready (allows for any setup work)
          init: obj.init,
          // either an array of elements or a function that will return an htmlCollection
          elements: obj.elements,
          // function to call when an element is "viewable", will be passed the element to work with
          appear: obj.appear,
          // function to call when an element is no longer "viewable", will be passed the element to work with
          disappear: obj.disappear,
          // function to call when all the elements have "appeared"
          done: obj.done,
          // keep tracking the elements
          reappear: obj.reappear,
          // the extra border around an element to make it viewable outside of the true viewport
          bounds: obj.bounds || 0,
          // the debounce timeout
          debounce: obj.debounce || 50,
          // appear.js will also check for items on continuous slow scrolling
          // you can controll how slow the scrolling should be  (deltaSpeed)
          // and when it will check again (deltaTimeout) after it has inspected the dom/viewport;
          delta: {
            speed: obj.deltaSpeed || 50,
            timeout: obj.deltaTimeout || 500
          }
      };

        // add an event listener to init when dom is ready
        addEventListener('DOMContentLoaded', init, false);

        // http://stackoverflow.com/questions/9900311/how-do-i-target-only-internet-explorer-10-for-certain-situations-like-internet-e/13971998#13971998
        var isIE10 = false;
        if (Function('/*@cc_on return document.documentMode===10@*/')()){
            isIE10 = true;
        }
        var completeOrLoaded = document.readyState === 'complete' || document.readyState === 'loaded';

        // call init if document is ready to be worked with and we missed the event
        if (isIE10) {
            if (completeOrLoaded) {
                init();
            }
        } else {
            if (completeOrLoaded || document.readyState === 'interactive') {
                init();
            }
        }

        return {
          // manually fire check for visibility of tracked elements
          trigger: function trigger(){
            doCheckAppear();
          },
          // pause tracking of elements
          pause: function pause(){
            removeListeners();
          },
          // resume tracking of elements after a pause
          resume: function resume(){
            begin();
          },
          // provide a means to stop monitoring all elements
          destroy: function destroy() {
            end();
          }
      };

  };
}()(obj));
};
}());

appear(
    (function() {
        'use strict';
        var nodes = [];

        function addClass(el) {
            if (el.classList) {
                el.classList.add('appeared');
            } else {
        // IE9 compat
        el.className += ' ' + 'appeared';
    }
}

    // set the image src or background attribute
    function doReveal(el) {
        var orig = el.getAttribute('src') || false;

        el.addEventListener('error', function handler(e) {
        // on error put back the original image if available (usually a placeholder)
        console.log('error loading image', e);
        if (orig) {
            el.setAttribute('src', orig);
        }
        el.removeEventListener('error', handler); // hate this.
    });

        var src = el.getAttribute('data-src');
        if (src) {
            el.setAttribute('src', src);
            addClass(el);
            return;
        }
        src = el.getAttribute('data-bkg');
        if (src) {
            el.style.backgroundImage = 'url("' + src + '")';
            addClass(el);
            return;
        }
    }

    // find what element to work with, as we support containers of images
    function reveal(el) {
        if (el.hasChildNodes()) {
        // dealing with a container try and find children
        var els = el.querySelectorAll('[data-src], [data-bkg]');
        var elsl = els.length;
        if (elsl === 0) {
          // node has children, but none have the attributes, so reveal
          // the node itself (use case: div with a background)
          doReveal(el);
      } else {
        for (var j = 0; j < elsl; j++) {
            doReveal(els[j]);
        }
      }
  } else {
    doReveal(el);
  }
}

    // reveal an image after a specified timeout
    function delayAppear(el, delay) {
        setTimeout(function() {
            reveal(el);
        }, delay);
    }

    return {
      // function executed when dom is interactive
      init: function init() {
        // find all elements with the class "appear"
        var els = document.getElementsByClassName('appear');
        var elsl = els.length;
        //  put html elements into an array object to work with
        for (var i = 0; i < elsl; i += 1) {
          // some images are revealed on a simple timeout, instead of
          // viewport appears. These delays appears must have
          // the appear class on them directly
          var delay = els[i].getAttribute('data-delay');
          if (delay) {
            delayAppear(els[i], delay);
          } else {
            nodes.push(els[i]);
          }
      }
  },
  elements: nodes,
      // function to run when an element is determined to be in view
      appear: reveal,
      // larger bounds area for reveal images
      bounds: 200
  };

}())
    );















(function($){

    "use strict";



     $(document).ready(function() {
    
         var modulefront      = $('#front'),
         overlayMenu     = $('#overlay-menu'),
         navbar          = $('.navbar-custom'),
         modules         = $('.module-front, .module, .module-small'),
         windowWidth     = Math.max($(window).width(), window.innerWidth),
         navbatTrans,
         mobileTest;


        /* ---------------------------------------------- /*
         * Portfolio
         /* ---------------------------------------------- */


         $(window).on('resize', function() {

            var windowWidth    = Math.max($(window).width(), window.innerWidth),
            itemWidth      = $('.grid-sizer').width(),
            itemHeight     = itemWidth,
            itemTallHeight = itemHeight * 2;

            $('.work-item').each(function() {
                if ($(this).hasClass('tall')) {
                    $(this).css({
                        height : itemTallHeight
                    });
                } else if ($(this).hasClass('wide')) {
                    $(this).css({
                        height : itemHeight
                    });
                } else if ($(this).hasClass('wide-tall')) {
                    $(this).css({
                        height : itemTallHeight
                    });
                } else {
                    $(this).css({
                        height : itemHeight
                    });
                }
            });


         }).resize();


    $('.works-grid').imagesLoaded( function(){
        $('.works-grid').packery({
            itemSelector: '.work-item', 
            columnWidth: '.grid-sizer',
            percentPosition: true,
        gutter: 0
        });
    });

        });

})(jQuery);