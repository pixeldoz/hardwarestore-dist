(function() {
  'use strict';

  function init() {

    // INLINE SVG
    jQuery('img.svg').each(function(i) {
      var $img = jQuery(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      jQuery.get(imgURL, function(data) {
        var $svg = jQuery(data).find('svg');
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        $img.replaceWith($svg);
      }, 'xml');
    });

    $('select').each(function(){
      var select = $(this),
          backdrop = '<div class="select-backdrop"></div>';

      select.addClass('select').selectpicker({
        style: 'select-control',
        size: 4,
        width: '100%',
        liveSearchPlaceholder: 'Search here..'
      }).on('show.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        select.closest('.form-group').append(backdrop);
      }).on('hide.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        select.closest('.form-group').find('.select-backdrop').remove();
      });
    })

    $.fn.datepicker.dates['en'] = {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      daysMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      today: "Today",
      clear: "Clear",
      format: "mm/dd/yyyy",
      titleFormat: "M yyyy",
      weekStart: 0
    };

    $('input[data-provide="datepicker"]').each(function() {
      var input = $(this),
          orientation = 'left',
          backdrop = '<div class="datepicker-backdrop"></div>';

      var newWindowWidth = $(window).width();
      if (newWindowWidth < 481) {
        orientation = 'left bottom'
      }

      input.addClass('datepicker').datepicker({
        format: 'dd M yyyy',
        orientation: orientation,
        autoclose: true,
      }).on('show', function(e) {
        $('body').append(backdrop);
      }).on('hide', function(e) {
        $('body').find('.datepicker-backdrop').remove();
      });
    })

    $('[data-toggle="popover"]').popover();

    $(document).on('click', '[data-lightbox]', lity);

    setTimeout(mainLayout, 100);
    setTimeout(animation, 100);
    setTimeout(slider, 100);
    setTimeout(func, 100);

    $(window).scroll(function() {
      setTimeout(function() {
        animation();
      }, 300)
    });

  }
  init(); // end of init()

  $(window).resize(function() {
    setTimeout(mainLayout, 100);
    setTimeout(slider, 100);
  });

  function mainLayout() {
    var h = $('#header').outerHeight(true),
      m = $('main'),
      f = $('#footer').outerHeight(true);

    m.css('min-height', 'calc(100vh - ' + f + 'px)');
  }

  function animation() {
    $(".animate").each(function() {
      var bottom_of_object = $(this).offset().top + 10;
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      if( bottom_of_window > bottom_of_object ){
        $(this).addClass('animate--in');
        // console.log('work')
      }
      // console.log('run')
    })
  }

  function slider() {
    $('.slider').each(function() {
      var slider = $(this),
          item = slider.find('.slider__item'),
          out = slider.attr('data-timeout') ? slider.attr('data-timeout') : 4000;

      slider.addClass('animate');

      slider.on('changed.owl.carousel', function(event) {
        slider.removeClass('animate').addClass('animate');
      })

      if (item.length > 1) {
        slider.addClass('owl-carousel').owlCarousel({
          items: 1,
          nav: false,
          dots: true,
          loop: true,
          autoplay: true,
          autoplayTimeout: out,
          autoplaySpeed: 800,
        });
      } else {
        slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        slider.find('.owl-stage-outer').children().unwrap();
      }
    })

    $('.slider-clients').each(function() {
      var slider = $(this),
          item = slider.find('.slider__item');

      slider.addClass('animate');

      slider.on('changed.owl.carousel', function(event) {
        slider.removeClass('animate').addClass('animate');
      })

      if (item.length > 1) {
        slider.addClass('owl-carousel').owlCarousel({
          items: 6,
          nav: false,
          dots: false,
          loop: true,
          autoplay: true,
          autoplayTimeout: 4000,
          autoplaySpeed: 800,
          responsive : {
            0 : {
              items: 2
            },
            769 : {
              items: 4
            },
            1200 : {
              items: 6
            }
          }
        });
      } else {
        slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        slider.find('.owl-stage-outer').children().unwrap();
      }
    })

    $('.slider-xs').each(function() {
      var w = $(window).width(),
        slider = $(this),
        nitem = slider.children().length;
      if (w < 169 && nitem > 2 || w < 426) {
        slider.addClass('owl-carousel').removeClass('ns');
        slider.each(function() {
          var t = $(this),
            item = t.attr('data-items') ? t.attr('data-items') : 1,
            autoplay = t.attr('data-autoplay') && t.attr('data-autoplay')=="false" ? false : true,
            loop = t.attr('data-loop') && t.attr('data-loop')=="false" ? false : true,
            dots = t.attr('data-dots') && t.attr('data-dots')=="false" ? false : true,
            aw = t.attr('data-width') && t.attr('data-width') == "auto" ? true : false;

          t.owlCarousel({
            items: 1,
            loop: loop,
            dots: dots,
            nav: true,
            navText: ['<div class="btn-nav left"></div>', '<div class="btn-nav right"></div>'],
            autoplay: autoplay,
            autoWidth: aw,
            autoHeight: true,
            autoplayTimeout: 4000,
            autoplaySpeed: 800,
          })
        })

      } else {
        slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        slider.find('.owl-stage-outer').children().unwrap();
      }
    })
    
  }
  slider();

  function func() {

    $('a[target!="_blank"]')
    .not('[href*="#"]')
    .not('.scroll-to')
    .not('[data-lity]')
    .not('[data-product]')
    .not('.lsb-preview').click(function(t) {
      t.preventDefault();
      var href = this.href;
      $("body").addClass("link-transition");
      setTimeout(function() {
        window.location = href
      }, 500)
    })

    $("body").addClass("load-page");
    $("html, body").animate({ scrollTop: 0 }, 100);

    // STICKY HEADER
    if ($('.header').length > 0) {
      var header = $('.header'),
        pos = 122;
      $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll >= pos) {
          header.addClass('sticky');
          $('body').addClass('header-stick');
        } else {
          header.removeClass('sticky');
          $('body').removeClass('header-stick');
        }
      });
    }

    $('.header-toggle').click(function() {
      $('body').toggleClass('menu-open');
    })

    $('.sidebar__toggle').each(function(){
      $(this).click(function(){
        $('body').addClass('sidebar-open')
      })
    })
    $('.sidebar__close').each(function(){
      $(this).click(function(){
        $('body').removeClass('sidebar-open')
      })
    })

    $('.has-sub').each(function(){
      var t = $(this);
      $('.has-sub').click(function() {
        t.toggleClass('sub-open');
        $('.has-sub').not(this).removeClass('sub-open');
      })
    })
    

    $('.btn-search').each(function(){
      var t = $(this);
      t.click(function(){
        $('body').addClass('search-open');
      })
    })
    $('.modal-search').each(function(){
      var close = $(this).find('.close');
      close.click(function(){
        $('body').removeClass('search-open');
      })
    })

    $('.scroll-down').each(function() {
      var target = $(this).data('target');
      $(this).click(function() {
        $('html, body').animate({
          scrollTop: $(target).offset().top - 100
        }, 900);
      })
    })

    // SMOOTH SCROLL
    $('.scroll-to').click(function(event) {
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 60
          }, 800, function() {
            var $target = $(target);
            if ($target.is(":focus")) {
              return false;
            } else {
              $target.attr('tabindex', '-1');
            };
          });
        }
      }
    });

    // form contact
    $('.form-contact').each(function(){
      var t = $(this),
          g = t.find('.field-lg');
      
      g.each(function(){
        var l = $(this).find('label'),
            f = $(this).find('.form-control');

        f.focusin(function(){
          l.addClass('label-small');
        })
        f.focusout(function(){
          if(f.val() == ''){
            l.removeClass('label-small');
          }
        })
      })  

      autosize($('textarea.form-control'));
    })

    $('.product-single__img').each(function(){
      var t = $(this),
          large = t.find('.img-large'),
          itemL = large.find('.img-large__item');

      if (itemL.length > 1) {
        large.addClass('owl-carousel').owlCarousel({
          items: 1,
          loop: false,
          center: true,
          nav: false,
          dots: false,
          mouseDrag: false,
          touchDrag: false,
          URLhashListener:true,
          startPosition: 'img01',
          animateOut: 'fadeOut'
        });
      } else {
        slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        slider.find('.owl-stage-outer').children().unwrap();
      }

      $('.img-thumb__item').each(function(){
        var t = $(this);
        $(this).click(function(){
          $('.img-thumb__item').removeClass('active');
          t.addClass('active');
        })
      })
    })

  } // end of func

  $('.modal').on('show.bs.modal', function(e) {
    $('html').addClass('modal-open');
    $('body').removeClass('menu-open');
  })

  $('.modal').on('hide.bs.modal', function(e) {
    $('html').removeClass('modal-open');
  })


})();


function customQty() {

  $('.quantity').each(function() {
    var t = $(this),
      input = t.find('input'),
      plus = $('<span class="quantity-control_plus"></span>'),
      minus = $('<span class="quantity-control_min"></span>');

    if (!t.hasClass('quantity-control')) {
      t.addClass('quantity-control');
      t.find('label').remove();
      t.prepend(minus);
      t.append(plus);

      function setW(par) {
        var v = par;
        if (v < 10)
          t.css('max-width', '80px');
        if (v > 9)
          t.css('max-width', '86px');
        if (v > 99)
          t.css('max-width', '92px');
        if (v > 999)
          t.css('max-width', '98px');
      }

      minus.click(function() {
        var v = parseInt(input.val());
        if (v > 1)
          v = v - 1;
        input.val(v).change();
        setW(v);
        // console.log(input.val())
      })

      plus.click(function() {
        var v = parseInt(input.val());
        v = v + 1;
        input.val(v).change();
        setW(v);
        // console.log(input.val())
      })

      input.on('input', function(e) {
        var v = $(this).val();
        setW(v);
        if (v == "")
          $(this).val('1');
        if (v < 1)
          $(this).val('1');
      })

      input.keydown(function(e) {
        // console.log(e.keyCode);
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
          (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
          (e.keyCode >= 35 && e.keyCode <= 40)) {
          return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
        }
      });
    }
  })

}
customQty();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGZ1bmN0aW9uIGluaXQoKSB7XHJcblxyXG4gICAgLy8gSU5MSU5FIFNWR1xyXG4gICAgalF1ZXJ5KCdpbWcuc3ZnJykuZWFjaChmdW5jdGlvbihpKSB7XHJcbiAgICAgIHZhciAkaW1nID0galF1ZXJ5KHRoaXMpO1xyXG4gICAgICB2YXIgaW1nSUQgPSAkaW1nLmF0dHIoJ2lkJyk7XHJcbiAgICAgIHZhciBpbWdDbGFzcyA9ICRpbWcuYXR0cignY2xhc3MnKTtcclxuICAgICAgdmFyIGltZ1VSTCA9ICRpbWcuYXR0cignc3JjJyk7XHJcblxyXG4gICAgICBqUXVlcnkuZ2V0KGltZ1VSTCwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIHZhciAkc3ZnID0galF1ZXJ5KGRhdGEpLmZpbmQoJ3N2ZycpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW1nSUQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKCdpZCcsIGltZ0lEKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbWdDbGFzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2NsYXNzJywgaW1nQ2xhc3MgKyAnIHJlcGxhY2VkLXN2ZycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkc3ZnID0gJHN2Zy5yZW1vdmVBdHRyKCd4bWxuczphJyk7XHJcbiAgICAgICAgJGltZy5yZXBsYWNlV2l0aCgkc3ZnKTtcclxuICAgICAgfSwgJ3htbCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnc2VsZWN0JykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgc2VsZWN0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIGJhY2tkcm9wID0gJzxkaXYgY2xhc3M9XCJzZWxlY3QtYmFja2Ryb3BcIj48L2Rpdj4nO1xyXG5cclxuICAgICAgc2VsZWN0LmFkZENsYXNzKCdzZWxlY3QnKS5zZWxlY3RwaWNrZXIoe1xyXG4gICAgICAgIHN0eWxlOiAnc2VsZWN0LWNvbnRyb2wnLFxyXG4gICAgICAgIHNpemU6IDQsXHJcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICBsaXZlU2VhcmNoUGxhY2Vob2xkZXI6ICdTZWFyY2ggaGVyZS4uJ1xyXG4gICAgICB9KS5vbignc2hvdy5icy5zZWxlY3QnLCBmdW5jdGlvbiAoZSwgY2xpY2tlZEluZGV4LCBpc1NlbGVjdGVkLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgc2VsZWN0LmNsb3Nlc3QoJy5mb3JtLWdyb3VwJykuYXBwZW5kKGJhY2tkcm9wKTtcclxuICAgICAgfSkub24oJ2hpZGUuYnMuc2VsZWN0JywgZnVuY3Rpb24gKGUsIGNsaWNrZWRJbmRleCwgaXNTZWxlY3RlZCwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgIHNlbGVjdC5jbG9zZXN0KCcuZm9ybS1ncm91cCcpLmZpbmQoJy5zZWxlY3QtYmFja2Ryb3AnKS5yZW1vdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgICQuZm4uZGF0ZXBpY2tlci5kYXRlc1snZW4nXSA9IHtcclxuICAgICAgZGF5czogW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIl0sXHJcbiAgICAgIGRheXNTaG9ydDogW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdLFxyXG4gICAgICBkYXlzTWluOiBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl0sXHJcbiAgICAgIG1vbnRoczogW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl0sXHJcbiAgICAgIG1vbnRoc1Nob3J0OiBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIl0sXHJcbiAgICAgIHRvZGF5OiBcIlRvZGF5XCIsXHJcbiAgICAgIGNsZWFyOiBcIkNsZWFyXCIsXHJcbiAgICAgIGZvcm1hdDogXCJtbS9kZC95eXl5XCIsXHJcbiAgICAgIHRpdGxlRm9ybWF0OiBcIk0geXl5eVwiLFxyXG4gICAgICB3ZWVrU3RhcnQ6IDBcclxuICAgIH07XHJcblxyXG4gICAgJCgnaW5wdXRbZGF0YS1wcm92aWRlPVwiZGF0ZXBpY2tlclwiXScpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBpbnB1dCA9ICQodGhpcyksXHJcbiAgICAgICAgICBvcmllbnRhdGlvbiA9ICdsZWZ0JyxcclxuICAgICAgICAgIGJhY2tkcm9wID0gJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWJhY2tkcm9wXCI+PC9kaXY+JztcclxuXHJcbiAgICAgIHZhciBuZXdXaW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xyXG4gICAgICBpZiAobmV3V2luZG93V2lkdGggPCA0ODEpIHtcclxuICAgICAgICBvcmllbnRhdGlvbiA9ICdsZWZ0IGJvdHRvbSdcclxuICAgICAgfVxyXG5cclxuICAgICAgaW5wdXQuYWRkQ2xhc3MoJ2RhdGVwaWNrZXInKS5kYXRlcGlja2VyKHtcclxuICAgICAgICBmb3JtYXQ6ICdkZCBNIHl5eXknLFxyXG4gICAgICAgIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvbixcclxuICAgICAgICBhdXRvY2xvc2U6IHRydWUsXHJcbiAgICAgIH0pLm9uKCdzaG93JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoYmFja2Ryb3ApO1xyXG4gICAgICB9KS5vbignaGlkZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAkKCdib2R5JykuZmluZCgnLmRhdGVwaWNrZXItYmFja2Ryb3AnKS5yZW1vdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5wb3BvdmVyKCk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ1tkYXRhLWxpZ2h0Ym94XScsIGxpdHkpO1xyXG5cclxuICAgIHNldFRpbWVvdXQobWFpbkxheW91dCwgMTAwKTtcclxuICAgIHNldFRpbWVvdXQoYW5pbWF0aW9uLCAxMDApO1xyXG4gICAgc2V0VGltZW91dChzbGlkZXIsIDEwMCk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmMsIDEwMCk7XHJcblxyXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBhbmltYXRpb24oKTtcclxuICAgICAgfSwgMzAwKVxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuICBpbml0KCk7IC8vIGVuZCBvZiBpbml0KClcclxuXHJcbiAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgIHNldFRpbWVvdXQobWFpbkxheW91dCwgMTAwKTtcclxuICAgIHNldFRpbWVvdXQoc2xpZGVyLCAxMDApO1xyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiBtYWluTGF5b3V0KCkge1xyXG4gICAgdmFyIGggPSAkKCcjaGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSksXHJcbiAgICAgIG0gPSAkKCdtYWluJyksXHJcbiAgICAgIGYgPSAkKCcjZm9vdGVyJykub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblxyXG4gICAgbS5jc3MoJ21pbi1oZWlnaHQnLCAnY2FsYygxMDB2aCAtICcgKyBmICsgJ3B4KScpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYW5pbWF0aW9uKCkge1xyXG4gICAgJChcIi5hbmltYXRlXCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBib3R0b21fb2Zfb2JqZWN0ID0gJCh0aGlzKS5vZmZzZXQoKS50b3AgKyAxMDtcclxuICAgICAgdmFyIGJvdHRvbV9vZl93aW5kb3cgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcblxyXG4gICAgICBpZiggYm90dG9tX29mX3dpbmRvdyA+IGJvdHRvbV9vZl9vYmplY3QgKXtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhbmltYXRlLS1pbicpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd3b3JrJylcclxuICAgICAgfVxyXG4gICAgICAvLyBjb25zb2xlLmxvZygncnVuJylcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzbGlkZXIoKSB7XHJcbiAgICAkKCcuc2xpZGVyJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHNsaWRlciA9ICQodGhpcyksXHJcbiAgICAgICAgICBpdGVtID0gc2xpZGVyLmZpbmQoJy5zbGlkZXJfX2l0ZW0nKSxcclxuICAgICAgICAgIG91dCA9IHNsaWRlci5hdHRyKCdkYXRhLXRpbWVvdXQnKSA/IHNsaWRlci5hdHRyKCdkYXRhLXRpbWVvdXQnKSA6IDQwMDA7XHJcblxyXG4gICAgICBzbGlkZXIuYWRkQ2xhc3MoJ2FuaW1hdGUnKTtcclxuXHJcbiAgICAgIHNsaWRlci5vbignY2hhbmdlZC5vd2wuY2Fyb3VzZWwnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHNsaWRlci5yZW1vdmVDbGFzcygnYW5pbWF0ZScpLmFkZENsYXNzKCdhbmltYXRlJyk7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBpZiAoaXRlbS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgc2xpZGVyLmFkZENsYXNzKCdvd2wtY2Fyb3VzZWwnKS5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgIG5hdjogZmFsc2UsXHJcbiAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgYXV0b3BsYXlUaW1lb3V0OiBvdXQsXHJcbiAgICAgICAgICBhdXRvcGxheVNwZWVkOiA4MDAsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2xpZGVyLnRyaWdnZXIoJ2Rlc3Ryb3kub3dsLmNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ293bC1jYXJvdXNlbCBvd2wtbG9hZGVkJyk7XHJcbiAgICAgICAgc2xpZGVyLmZpbmQoJy5vd2wtc3RhZ2Utb3V0ZXInKS5jaGlsZHJlbigpLnVud3JhcCgpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgICQoJy5zbGlkZXItY2xpZW50cycpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBzbGlkZXIgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgaXRlbSA9IHNsaWRlci5maW5kKCcuc2xpZGVyX19pdGVtJyk7XHJcblxyXG4gICAgICBzbGlkZXIuYWRkQ2xhc3MoJ2FuaW1hdGUnKTtcclxuXHJcbiAgICAgIHNsaWRlci5vbignY2hhbmdlZC5vd2wuY2Fyb3VzZWwnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHNsaWRlci5yZW1vdmVDbGFzcygnYW5pbWF0ZScpLmFkZENsYXNzKCdhbmltYXRlJyk7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBpZiAoaXRlbS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgc2xpZGVyLmFkZENsYXNzKCdvd2wtY2Fyb3VzZWwnKS5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICBpdGVtczogNixcclxuICAgICAgICAgIG5hdjogZmFsc2UsXHJcbiAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgIGF1dG9wbGF5VGltZW91dDogNDAwMCxcclxuICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDgwMCxcclxuICAgICAgICAgIHJlc3BvbnNpdmUgOiB7XHJcbiAgICAgICAgICAgIDAgOiB7XHJcbiAgICAgICAgICAgICAgaXRlbXM6IDJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgNzY5IDoge1xyXG4gICAgICAgICAgICAgIGl0ZW1zOiA0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIDEyMDAgOiB7XHJcbiAgICAgICAgICAgICAgaXRlbXM6IDZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNsaWRlci50cmlnZ2VyKCdkZXN0cm95Lm93bC5jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdvd2wtY2Fyb3VzZWwgb3dsLWxvYWRlZCcpO1xyXG4gICAgICAgIHNsaWRlci5maW5kKCcub3dsLXN0YWdlLW91dGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICAkKCcuc2xpZGVyLXhzJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHcgPSAkKHdpbmRvdykud2lkdGgoKSxcclxuICAgICAgICBzbGlkZXIgPSAkKHRoaXMpLFxyXG4gICAgICAgIG5pdGVtID0gc2xpZGVyLmNoaWxkcmVuKCkubGVuZ3RoO1xyXG4gICAgICBpZiAodyA8IDE2OSAmJiBuaXRlbSA+IDIgfHwgdyA8IDQyNikge1xyXG4gICAgICAgIHNsaWRlci5hZGRDbGFzcygnb3dsLWNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ25zJyk7XHJcbiAgICAgICAgc2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIGl0ZW0gPSB0LmF0dHIoJ2RhdGEtaXRlbXMnKSA/IHQuYXR0cignZGF0YS1pdGVtcycpIDogMSxcclxuICAgICAgICAgICAgYXV0b3BsYXkgPSB0LmF0dHIoJ2RhdGEtYXV0b3BsYXknKSAmJiB0LmF0dHIoJ2RhdGEtYXV0b3BsYXknKT09XCJmYWxzZVwiID8gZmFsc2UgOiB0cnVlLFxyXG4gICAgICAgICAgICBsb29wID0gdC5hdHRyKCdkYXRhLWxvb3AnKSAmJiB0LmF0dHIoJ2RhdGEtbG9vcCcpPT1cImZhbHNlXCIgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgICAgICAgIGRvdHMgPSB0LmF0dHIoJ2RhdGEtZG90cycpICYmIHQuYXR0cignZGF0YS1kb3RzJyk9PVwiZmFsc2VcIiA/IGZhbHNlIDogdHJ1ZSxcclxuICAgICAgICAgICAgYXcgPSB0LmF0dHIoJ2RhdGEtd2lkdGgnKSAmJiB0LmF0dHIoJ2RhdGEtd2lkdGgnKSA9PSBcImF1dG9cIiA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgICB0Lm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgaXRlbXM6IDEsXHJcbiAgICAgICAgICAgIGxvb3A6IGxvb3AsXHJcbiAgICAgICAgICAgIGRvdHM6IGRvdHMsXHJcbiAgICAgICAgICAgIG5hdjogdHJ1ZSxcclxuICAgICAgICAgICAgbmF2VGV4dDogWyc8ZGl2IGNsYXNzPVwiYnRuLW5hdiBsZWZ0XCI+PC9kaXY+JywgJzxkaXYgY2xhc3M9XCJidG4tbmF2IHJpZ2h0XCI+PC9kaXY+J10sXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiBhdXRvcGxheSxcclxuICAgICAgICAgICAgYXV0b1dpZHRoOiBhdyxcclxuICAgICAgICAgICAgYXV0b0hlaWdodDogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b3BsYXlUaW1lb3V0OiA0MDAwLFxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA4MDAsXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNsaWRlci50cmlnZ2VyKCdkZXN0cm95Lm93bC5jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdvd2wtY2Fyb3VzZWwgb3dsLWxvYWRlZCcpO1xyXG4gICAgICAgIHNsaWRlci5maW5kKCcub3dsLXN0YWdlLW91dGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIFxyXG4gIH1cclxuICBzbGlkZXIoKTtcclxuXHJcbiAgZnVuY3Rpb24gZnVuYygpIHtcclxuXHJcbiAgICAkKCdhW3RhcmdldCE9XCJfYmxhbmtcIl0nKVxyXG4gICAgLm5vdCgnW2hyZWYqPVwiI1wiXScpXHJcbiAgICAubm90KCcuc2Nyb2xsLXRvJylcclxuICAgIC5ub3QoJ1tkYXRhLWxpdHldJylcclxuICAgIC5ub3QoJ1tkYXRhLXByb2R1Y3RdJylcclxuICAgIC5ub3QoJy5sc2ItcHJldmlldycpLmNsaWNrKGZ1bmN0aW9uKHQpIHtcclxuICAgICAgdC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgaHJlZiA9IHRoaXMuaHJlZjtcclxuICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJsaW5rLXRyYW5zaXRpb25cIik7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gaHJlZlxyXG4gICAgICB9LCA1MDApXHJcbiAgICB9KVxyXG5cclxuICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwibG9hZC1wYWdlXCIpO1xyXG4gICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZSh7IHNjcm9sbFRvcDogMCB9LCAxMDApO1xyXG5cclxuICAgIC8vIFNUSUNLWSBIRUFERVJcclxuICAgIGlmICgkKCcuaGVhZGVyJykubGVuZ3RoID4gMCkge1xyXG4gICAgICB2YXIgaGVhZGVyID0gJCgnLmhlYWRlcicpLFxyXG4gICAgICAgIHBvcyA9IDEyMjtcclxuICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIGlmIChzY3JvbGwgPj0gcG9zKSB7XHJcbiAgICAgICAgICBoZWFkZXIuYWRkQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdoZWFkZXItc3RpY2snKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaGVhZGVyLnJlbW92ZUNsYXNzKCdzdGlja3knKTtcclxuICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaGVhZGVyLXN0aWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAkKCcuaGVhZGVyLXRvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG4gICAgfSlcclxuXHJcbiAgICAkKCcuc2lkZWJhcl9fdG9nZ2xlJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAkKHRoaXMpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdzaWRlYmFyLW9wZW4nKVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICAgICQoJy5zaWRlYmFyX19jbG9zZScpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgJCh0aGlzKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnc2lkZWJhci1vcGVuJylcclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgJCgnLmhhcy1zdWInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKTtcclxuICAgICAgJCgnLmhhcy1zdWInKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICB0LnRvZ2dsZUNsYXNzKCdzdWItb3BlbicpO1xyXG4gICAgICAgICQoJy5oYXMtc3ViJykubm90KHRoaXMpLnJlbW92ZUNsYXNzKCdzdWItb3BlbicpO1xyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICAgIFxyXG5cclxuICAgICQoJy5idG4tc2VhcmNoJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgdCA9ICQodGhpcyk7XHJcbiAgICAgIHQuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3NlYXJjaC1vcGVuJyk7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgJCgnLm1vZGFsLXNlYXJjaCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIGNsb3NlID0gJCh0aGlzKS5maW5kKCcuY2xvc2UnKTtcclxuICAgICAgY2xvc2UuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ3NlYXJjaC1vcGVuJyk7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgICQoJy5zY3JvbGwtZG93bicpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpO1xyXG4gICAgICAkKHRoaXMpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgIHNjcm9sbFRvcDogJCh0YXJnZXQpLm9mZnNldCgpLnRvcCAtIDEwMFxyXG4gICAgICAgIH0sIDkwMCk7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIC8vIFNNT09USCBTQ1JPTExcclxuICAgICQoJy5zY3JvbGwtdG8nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sICcnKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCAnJykgJiZcclxuICAgICAgICBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lXHJcbiAgICAgICkge1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XHJcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyAnXScpO1xyXG4gICAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3AgLSA2MFxyXG4gICAgICAgICAgfSwgODAwLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKHRhcmdldCk7XHJcbiAgICAgICAgICAgIGlmICgkdGFyZ2V0LmlzKFwiOmZvY3VzXCIpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICR0YXJnZXQuYXR0cigndGFiaW5kZXgnLCAnLTEnKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gZm9ybSBjb250YWN0XHJcbiAgICAkKCcuZm9ybS1jb250YWN0JykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgICBnID0gdC5maW5kKCcuZmllbGQtbGcnKTtcclxuICAgICAgXHJcbiAgICAgIGcuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBsID0gJCh0aGlzKS5maW5kKCdsYWJlbCcpLFxyXG4gICAgICAgICAgICBmID0gJCh0aGlzKS5maW5kKCcuZm9ybS1jb250cm9sJyk7XHJcblxyXG4gICAgICAgIGYuZm9jdXNpbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgbC5hZGRDbGFzcygnbGFiZWwtc21hbGwnKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGYuZm9jdXNvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGlmKGYudmFsKCkgPT0gJycpe1xyXG4gICAgICAgICAgICBsLnJlbW92ZUNsYXNzKCdsYWJlbC1zbWFsbCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pICBcclxuXHJcbiAgICAgIGF1dG9zaXplKCQoJ3RleHRhcmVhLmZvcm0tY29udHJvbCcpKTtcclxuICAgIH0pXHJcblxyXG4gICAgJCgnLnByb2R1Y3Qtc2luZ2xlX19pbWcnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIGxhcmdlID0gdC5maW5kKCcuaW1nLWxhcmdlJyksXHJcbiAgICAgICAgICBpdGVtTCA9IGxhcmdlLmZpbmQoJy5pbWctbGFyZ2VfX2l0ZW0nKTtcclxuXHJcbiAgICAgIGlmIChpdGVtTC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgbGFyZ2UuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpLm93bENhcm91c2VsKHtcclxuICAgICAgICAgIGl0ZW1zOiAxLFxyXG4gICAgICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgICAgICBjZW50ZXI6IHRydWUsXHJcbiAgICAgICAgICBuYXY6IGZhbHNlLFxyXG4gICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICBtb3VzZURyYWc6IGZhbHNlLFxyXG4gICAgICAgICAgdG91Y2hEcmFnOiBmYWxzZSxcclxuICAgICAgICAgIFVSTGhhc2hMaXN0ZW5lcjp0cnVlLFxyXG4gICAgICAgICAgc3RhcnRQb3NpdGlvbjogJ2ltZzAxJyxcclxuICAgICAgICAgIGFuaW1hdGVPdXQ6ICdmYWRlT3V0J1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNsaWRlci50cmlnZ2VyKCdkZXN0cm95Lm93bC5jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdvd2wtY2Fyb3VzZWwgb3dsLWxvYWRlZCcpO1xyXG4gICAgICAgIHNsaWRlci5maW5kKCcub3dsLXN0YWdlLW91dGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJCgnLmltZy10aHVtYl9faXRlbScpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgdCA9ICQodGhpcyk7XHJcbiAgICAgICAgJCh0aGlzKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgJCgnLmltZy10aHVtYl9faXRlbScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgIHQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICB9IC8vIGVuZCBvZiBmdW5jXHJcblxyXG4gICQoJy5tb2RhbCcpLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKCdtb2RhbC1vcGVuJyk7XHJcbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG4gIH0pXHJcblxyXG4gICQoJy5tb2RhbCcpLm9uKCdoaWRlLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG4gICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJyk7XHJcbiAgfSlcclxuXHJcblxyXG59KSgpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGN1c3RvbVF0eSgpIHtcclxuXHJcbiAgJCgnLnF1YW50aXR5JykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgaW5wdXQgPSB0LmZpbmQoJ2lucHV0JyksXHJcbiAgICAgIHBsdXMgPSAkKCc8c3BhbiBjbGFzcz1cInF1YW50aXR5LWNvbnRyb2xfcGx1c1wiPjwvc3Bhbj4nKSxcclxuICAgICAgbWludXMgPSAkKCc8c3BhbiBjbGFzcz1cInF1YW50aXR5LWNvbnRyb2xfbWluXCI+PC9zcGFuPicpO1xyXG5cclxuICAgIGlmICghdC5oYXNDbGFzcygncXVhbnRpdHktY29udHJvbCcpKSB7XHJcbiAgICAgIHQuYWRkQ2xhc3MoJ3F1YW50aXR5LWNvbnRyb2wnKTtcclxuICAgICAgdC5maW5kKCdsYWJlbCcpLnJlbW92ZSgpO1xyXG4gICAgICB0LnByZXBlbmQobWludXMpO1xyXG4gICAgICB0LmFwcGVuZChwbHVzKTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIHNldFcocGFyKSB7XHJcbiAgICAgICAgdmFyIHYgPSBwYXI7XHJcbiAgICAgICAgaWYgKHYgPCAxMClcclxuICAgICAgICAgIHQuY3NzKCdtYXgtd2lkdGgnLCAnODBweCcpO1xyXG4gICAgICAgIGlmICh2ID4gOSlcclxuICAgICAgICAgIHQuY3NzKCdtYXgtd2lkdGgnLCAnODZweCcpO1xyXG4gICAgICAgIGlmICh2ID4gOTkpXHJcbiAgICAgICAgICB0LmNzcygnbWF4LXdpZHRoJywgJzkycHgnKTtcclxuICAgICAgICBpZiAodiA+IDk5OSlcclxuICAgICAgICAgIHQuY3NzKCdtYXgtd2lkdGgnLCAnOThweCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBtaW51cy5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdiA9IHBhcnNlSW50KGlucHV0LnZhbCgpKTtcclxuICAgICAgICBpZiAodiA+IDEpXHJcbiAgICAgICAgICB2ID0gdiAtIDE7XHJcbiAgICAgICAgaW5wdXQudmFsKHYpLmNoYW5nZSgpO1xyXG4gICAgICAgIHNldFcodik7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coaW5wdXQudmFsKCkpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBwbHVzLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB2ID0gcGFyc2VJbnQoaW5wdXQudmFsKCkpO1xyXG4gICAgICAgIHYgPSB2ICsgMTtcclxuICAgICAgICBpbnB1dC52YWwodikuY2hhbmdlKCk7XHJcbiAgICAgICAgc2V0Vyh2KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhpbnB1dC52YWwoKSlcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGlucHV0Lm9uKCdpbnB1dCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgdiA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgc2V0Vyh2KTtcclxuICAgICAgICBpZiAodiA9PSBcIlwiKVxyXG4gICAgICAgICAgJCh0aGlzKS52YWwoJzEnKTtcclxuICAgICAgICBpZiAodiA8IDEpXHJcbiAgICAgICAgICAkKHRoaXMpLnZhbCgnMScpO1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgaW5wdXQua2V5ZG93bihmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZS5rZXlDb2RlKTtcclxuICAgICAgICBpZiAoJC5pbkFycmF5KGUua2V5Q29kZSwgWzQ2LCA4LCA5LCAyNywgMTMsIDExMCwgMTkwXSkgIT09IC0xIHx8XHJcbiAgICAgICAgICAoZS5rZXlDb2RlID09PSA2NSAmJiAoZS5jdHJsS2V5ID09PSB0cnVlIHx8IGUubWV0YUtleSA9PT0gdHJ1ZSkpIHx8XHJcbiAgICAgICAgICAoZS5rZXlDb2RlID49IDM1ICYmIGUua2V5Q29kZSA8PSA0MCkpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChlLnNoaWZ0S2V5IHx8IChlLmtleUNvZGUgPCA0OCB8fCBlLmtleUNvZGUgPiA1NykpICYmIChlLmtleUNvZGUgPCA5NiB8fCBlLmtleUNvZGUgPiAxMDUpKSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KVxyXG5cclxufVxyXG5jdXN0b21RdHkoKTtcclxuIl0sImZpbGUiOiJtYWluLmpzIn0=

//# sourceMappingURL=main.js.map
