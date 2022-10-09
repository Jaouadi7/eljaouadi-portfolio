$(function () {
  'use strict';

  // Check for click events on the navbar burger icon
  $('.navbar-burger').on('click', function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $('.navbar-burger').toggleClass('is-active');
    $('.navbar-menu').toggleClass('is-active');
  });

  $('.contact-form')
    .parsley()
    .on('form:validate', (formInstancce) => {
      let isValidated = formInstancce.isValid();

      if (isValidated) {
        $.ajax({
          type: 'POST',
          url: './php/sendEmail.php',
          data: $('.contact-form').serialize(),
          beforeSend: function(){
            $('#submit-btn').addClass('is-loading');
          },
        })
         
          .done(function (response) {
            $('#submit-btn').removeClass('is-loading');
            $('.form-msg').html(response);
            if ($('.notification').hasClass('is-success')) {
              $('.input, .textarea').val('');
              $('.form-msg').fadeOut(7000, function () {
                $(this).remove();
              });
            }
              
          })
          .fail(function (data) {
            if (data.responseText !== '') {
              $('.form-msg').html(data.responseText);
            } else {
              if ($('html').attr('dir') === 'rtl') {
                $('.form-msg').text(
                  'يبدو أن هناك خطأ ما حصل المرجو إعادة إرسال رسالتك أو المحاولة لاحقا'
                );
              } else {
                $('.form-msg').text(
                  'Oops! An error occured and your message could not be sent.'
                );
              }
            }
              
          });
      }
    })
    .on('form:submit', function () {
      return false;
    });
});
