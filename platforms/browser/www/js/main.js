(function($) {

  $('#hobbies').parent().append('<ul class="list-item" id="newhobbies" name="hobbies"></ul>');
  $('#hobbies option').each(function(){
      $('#newhobbies').append('<li value="' + $(this).val() + '">'+$(this).text()+'</li>');
  });
  $('#hobbies').remove();
  $('#newhobbies').attr('id', 'hobbies');
  $('#hobbies li').first().addClass('init');
  $("#hobbies").on("click", ".init", function() {
      $(this).closest("#hobbies").children('li:not(.init)').toggle();
  });
  
  var allOptions = $("#hobbies").children('li:not(.init)');
  $("#hobbies").on("click", "li:not(.init)", function() {
      allOptions.removeClass('selected');
      $(this).addClass('selected');
      $("#hobbies").children('.init').html($(this).html());
      allOptions.toggle();
  });

  var marginSlider = document.getElementById('slider-margin');
  if (marginSlider != undefined) {
      noUiSlider.create(marginSlider, {
            start: [500],
            step: 10,
            connect: [true, false],
            tooltips: [true],
            range: {
                'min': 0,
                'max': 1000
            },
            format: wNumb({
                decimals: 0,
                thousand: ',',
                prefix: '$ ',
            })
    });
  }
  $('#reset').on('click', function(){
      $('#register-form').reset();
  });

  $('#register-form').validate({
    rules : {
        first_name : {
            required: true,
        },
        last_name : {
            required: true,
        },
        company : {
            required: true
        },
        email : {
            required: true,
            email : true
        },
        phone_number : {
            required: true,
        }
    },
    onfocusout: function(element) {
        $(element).valid();
    },
});

    jQuery.extend(jQuery.validator.messages, {
        required: "",
        remote: "",
        email: "",
        url: "",
        date: "",
        dateISO: "",
        number: "",
        digits: "",
        creditcard: "",
        equalTo: ""
    });
})(jQuery);