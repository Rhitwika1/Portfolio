
// JavaScript contact form Document
/*$(document).ready(function() {
	$('form#contact-form').submit(function() {
	$('form#contact-form .error').remove();
	var hasError = false;
	$('.requiredField').each(function() {
	if(jQuery.trim($(this).val()) == '') {
    var labelText = $(this).prev('label').text();
    $(this).parent().append('<span class="error">You forgot to enter your '+labelText+'</span>');
    $(this).addClass('inputError');
    hasError = true;
    } else if($(this).hasClass('email')) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if(!emailReg.test(jQuery.trim($(this).val()))) {
    var labelText = $(this).prev('label').text();
    $(this).parent().append('<span class="error">You entered an invalid '+labelText+'</span>');
    $(this).addClass('inputError');
    hasError = true;
    }
    }
    });
    if(!hasError) {
    $('form#contact-form input.submit').fadeOut('normal', function() {
    $(this).parent().append('');
    });

     $("#loader").show();
        $.ajax({
            url: "contact.php",
            type: "POST",
            data:  new FormData(this),
            contentType: false,
            cache: false,
            processData:false,
            success: function(data){
			  $('form#contact-form').slideUp("fast", function() {
			  $(this).before('<div class="success">Thank you. Your Email was sent successfully.</div>');
			  $("#loader").hide();
			  })
            }           
       });
	   
	   return false;
    }
 
   });
});*/
$(document).ready(function() {
    $('form#contact-form').submit(function(e) {
        e.preventDefault(); // Prevent default form submission
        
        $('.error').remove(); // Remove old errors
        var hasError = false;

        $('.requiredField').each(function() {
            var fieldValue = $.trim($(this).val());
            var labelText = $(this).prev('label').text();

            if (fieldValue === '') {
                $(this).parent().append('<span class="error">You forgot to enter your ' + labelText + '</span>');
                $(this).addClass('inputError');
                hasError = true;
            } else if ($(this).hasClass('email')) {
                var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Improved regex
                if (!emailReg.test(fieldValue)) {
                    $(this).parent().append('<span class="error">You entered an invalid ' + labelText + '</span>');
                    $(this).addClass('inputError');
                    hasError = true;
                }
            }
        });

        if (!hasError) {
            $('form#contact-form input.submit').fadeOut('normal', function() {
                $(this).parent().append('<p class="success">Processing...</p>');
            });

            $("#loader").show();

            var formData = new FormData(document.getElementById("contact-form"));

            $.ajax({
                url: "contact.php",
                type: "POST",
                data: formData,
                contentType: false,
                cache: false,
                processData: false,
                success: function(response) {
                    $('form#contact-form').slideUp("fast", function() {
                        $(this).before('<div class="success">Thank you. Your Email was sent successfully.</div>');
                        $("#loader").hide();
                    });
                },
                error: function() {
                    alert("There was an error submitting the form. Please try again.");
                    $("#loader").hide();
                }
            });
        }
    });
});
