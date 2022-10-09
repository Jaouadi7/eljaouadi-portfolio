document.addEventListener('DOMContentLoaded', () => {
  // VARS
  const sections = document.querySelectorAll('section');
  const contactSection = document.querySelector('#contact');
  const loaderPage = document.querySelector('.loader-page');

  // HIDDEN THE LOADER PAGE
  loaderPage.classList.add('loaded');
  setTimeout(() => {
    loaderPage.remove();
  }, 1000);

  const emptyLinks = document.querySelectorAll('a[href="#"]');
  emptyLinks.forEach((a) => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
    });
  });

  const sectionsLinks = document.querySelectorAll(
    '.navbar .navbar-end a, .navbar-dots a'
  );

  sectionsLinks.forEach((sectionLink) => {
    sectionLink.addEventListener('click', () => {
      let selectSection = document.querySelector(
        '#' + sectionLink.getAttribute('data-section')
      );

      // HIDING ACTIVE ICON FROM THE PREVIOUS SECTION
      let prevSectionIcon = document.querySelector(
        '.navbar-dots a .fa-dot-circle'
      );
      prevSectionIcon.setAttribute('class', 'fas fa-circle');

      if (sectionLink.parentElement.classList.contains('navbar-end')) {
        // ACTIVE ICON
        const activeIconLink = document.querySelector(
          '.navbar-dots a[data-section="' +
            selectSection.getAttribute('id') +
            '"]'
        );
        activeIconLink.firstElementChild.setAttribute(
          'class',
          'fas fa-dot-circle'
        );
      } else {
        // ACTIVE ICON
        sectionLink.firstElementChild.setAttribute(
          'class',
          'fas fa-dot-circle'
        );
      }

      // AFTER NAV MENU ITEM CLICKED
      // CHECK IS NAV MENU IS ACTIVE
      const navbMenu = document.querySelector('.navbar-menu');

      if (navbMenu.classList.contains('is-active')) {
        navbMenu.classList.remove('is-active');
        document.querySelector('.navbar-burger').classList.remove('is-active');
      }

      // HIDDEN ALL SECTIONS
      sections.forEach((section) => {
        section.classList.add('is-hidden');
        section.classList.remove('active');
      });

      // DISPLAY THE SELECTED SECTION
      selectSection.classList.add('active');
      selectSection.classList.remove('is-hidden');

      // EMPTY FORM INPUTS WHEN USER INPUT DATA AND LEAVE THE PAGE WITHOUT SUBMITTIMG
      const formInputs = document.querySelectorAll(
        '.contact-form input, .contact-form textarea'
      );
      formInputs.forEach((input) => {
        if (!contactSection.classList.contains('active') && input.value != '') {
          input.value = '';
        }
      });
    });
  });

  // CONTACT ME BUTTON
  const contactMeBtn = document.querySelector('#home .contact-btn');

  contactMeBtn.addEventListener('click', () => {
    // HIDDEN ALL SECTIONS
    sections.forEach((section) => {
      section.classList.add('is-hidden');
      section.classList.remove('active');
    });

    // ACTIVE CONTACT SECTION
    contactSection.classList.add('active');
    contactSection.classList.remove('is-hidden');

    // HIDING ACTIVE ICON FROM THE PREVIOUS SECTION
    let prevSectionIcon = document.querySelector(
      '.navbar-dots a .fa-dot-circle'
    );
    prevSectionIcon.setAttribute('class', 'fas fa-circle');

    // DOTS : ACTIVE CONTACT SECTION DOT
    const contactNavDot = document.querySelector(
      '.navbar-dots a[data-section="contact"]'
    );
    contactNavDot.firstElementChild.setAttribute('class', 'fas fa-dot-circle');
  });

  // REVIEWS SLIDER
  var slider = tns({
    container: '.reviews-slider',
    autoplay: true,
    controls: false,
    nav: false,
    navContainer: false,
    autoplayText: [false, false],
    rewind: true,
    speed: 500,
    autoplayTimeout: 6000,
    autoHeigh: true,
  });

  //   NEXT REVIEW SLIDER
  const showNextReview = document.querySelector('.next-review-btn');

  showNextReview.addEventListener('click', () => {
    slider.goTo('next');
  });
});

// JQUERY
$(function () {
  const localStorage = window.localStorage;

  // LOCALIZE LANGUAGES
  if (localStorage.getItem('lang') === null) {
    $('[data-localize]').localize('lang', { language: 'en' });
  } else {
    $('[data-localize]').localize('lang', {
      language: localStorage.getItem('lang'),
    });

    if (localStorage.getItem('lang') === 'ar') {
      $('html').attr('dir', 'rtl');
      $('html').attr('lang', 'ar');
      $('#core-style').append(
        '<link id="rtl-support" rel="stylesheet" href="css/rtl-support.css">'
      );
      $('.lang').attr('data-lang', 'en');
      $('#lang').attr('value', 'ar');
    }
  }

  // CHANGE WEBSITE LANGUAGE
  $('.lang').on('click', function () {
    if ($(this).attr('data-lang') === 'ar') {
      window.location.reload();
      localStorage.setItem('lang', 'ar');
    } else {
      window.location.reload();
      localStorage.setItem('lang', 'en');
    }
  });
});
