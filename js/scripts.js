/*- reviews-slider -*/
var swiper = new Swiper("#reviews-slider", {
  slidesPerView: "auto",
  spaceBetween: 40,
  scrollbar: {
    el: "#reviews-slider .swiper-scrollbar",
    draggable: true,
    dragSize: 24
  },
  breakpoints: {
    0: {
      spaceBetween: 20,
    },
    480: {
      spaceBetween: 40,
    },
  },
});

/*- reviews-slider -*/
var swiper = new Swiper("#reviews-slider2", {
  slidesPerView: "3",
  spaceBetween: 40,
  scrollbar: {
    el: "#reviews-slider2 .swiper-scrollbar",
    draggable: true,
    dragSize: 24
  },
  breakpoints: {
    0: {
      spaceBetween: 20,
      slidesPerView: "auto",
    },
    1200: {
      spaceBetween: 40,
      slidesPerView: "3",
    },
  },
});

/*- reviews-slider -*/
var swiper = new Swiper("#reviews-slider3", {
  slidesPerView: "4",
  spaceBetween: 40,
  scrollbar: {
    el: "#reviews-slider3 .swiper-scrollbar",
    draggable: true,
    dragSize: 24
  },
  breakpoints: {
    0: {
      spaceBetween: 20,
      slidesPerView: "auto",
    },
    1200: {
      spaceBetween: 40,
      slidesPerView: "4",
    },
  },
});

/*- gallery-slider -*/
var swiper = new Swiper(".gallery-slider", {
  slidesPerView: "auto",
  spaceBetween: 40,
  pagination: {
    el: ".gallery-slider .swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      spaceBetween: 20,
    },
    1200: {
      spaceBetween: 40,
    },
  },
});

/*- like -*/
$(".like").on("click", function() {
  $(this).toggleClass("active");
});

/*- like-btn -*/
const lekBtn = document.querySelector(".like-btn");
let likeIcon = document.querySelector(".like-btn__icon"),
count = document.querySelector(".like-btn__count");

let clicked = false;

lekBtn?.addEventListener("click", () => {
  if (!clicked) {
    clicked = true;
    likeIcon.innerHTML = `<img src="img/bg/like-i-active.png" alt="icon">`;
    count.textContent++;
  } else {
    clicked = false;
    likeIcon.innerHTML = `<img src="img/bg/like-i.png" alt="icon">`;
    count.textContent--;
  }
});

/*- review__text -*/
let column = 0;
$('.review__text').each(function(){
  h = $(this).height();
  if (h > column) {
    column = h;
  }
}).height(column);

/*- price-col -*/
let last_id;
let $top_menu = $('#price-nav');
let menu_height = $top_menu.outerHeight(true);
let $menu_items = $top_menu.find('a');
let $scroll_items = $menu_items.map(function(){
  let item = $($(this).attr('href'));
  if (item.length){
    return item;
  }
});

$menu_items.click(function(e){
  let href = $(this).attr('href'),
  offset_top = href === '#' ? 0 : $(href).offset().top - menu_height;
  $('html, body').stop().animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 700);
  e.preventDefault();
});

$(window).scroll(function(){
  let from_top = $(this).scrollTop() + menu_height;
  let mar = parseInt($top_menu.css('margin-bottom'));
  let cur = $scroll_items.map(function(){
    if ($(this).offset().top < from_top + mar){
      return this;
    }
  });
  cur = cur[cur.length - 1];
  let id = cur && cur.length ? cur[0].id : '';
  if (last_id !== id){
    last_id = id;
    $menu_items.parent()
    .removeClass('active')
    .end()
    .filter("[href='#" + id + "']")
    .parent()
    .addClass('active');
  }
});

/*- modal -*/
const myModal = new HystModal({
  closeOnEsc: true,
  backscroll: true,
  afterClose: function(modal){
    let videoframe = modal.openedWindow.querySelector('iframe');
    if(videoframe){
        videoframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
    }
  },
});

/*- mobile menu -*/
let toggleButton = document.querySelector('.header__mob-btn');
let navBar = document.querySelector('.header__mob-dropdown');
toggleButton.addEventListener('click', function () {
  toggleButton.classList.toggle('open');
  navBar.classList.toggle('open');
});

/*- phone-input -*/
[].forEach.call(document.querySelectorAll('.phone-input'), function (input) {
    let keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            newValue = matrix.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
            });
        i = newValue.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            newValue = newValue.slice(0, i);
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function (a) {
                return "\\d{1," + a.length + "}";
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
        if (event.type == "blur" && this.value.length < 5) this.value = "";
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
});
