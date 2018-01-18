		$(function() {
		/*

		// console.log('in form.js');
		// console.log($);

	var submitForm = function(e){
		  // console.log('in submitForm');
		e.preventDefault();

	var form = $(e.target),
		  data = form.serialize(),
		  url = form.attr('action');

		 // console.log(form);
		 // console.log(data);
		 // console.log(url);

	var request = $.ajax({
		 type: 'POST',
		 url: url,
		 data: data,
		 dataType : 'JSON'
	 });

	request.done(function(msg){
		// alert(msg);
		var mes = msg.mes,
		    status = msg.status;
		if (status === 'OK') {
			form.append('<p class="success">' + mes + '</p>');
		}else{
			form.append('<p class="error">'  + '</p>');
		}
	});

	request.fail(jqXHR, textStatus){
		alert("Request failed: " + textStatus);
	});

};

$('#order-form').on('submit', submitForm);
*/
// /////////

// универсальная формула обработки форм
var ajaxForm = function (form) {

    var url = form.attr('action'),
        data = form.serialize();

    return $.ajax({
        type: 'POST',
        url: url,
        data: data,
        dataType: 'JSON'
    });

}

// Обработка события

var submitForm = function (ev) {
    ev.preventDefault();
    // console.log(ev);

    var form = $(ev.target);
        
    var request = ajaxForm(form);

    request.done(function(msg) {
        var mes = msg.mes,
            status = msg.status;
        if (status === 'OK') {
            // form.append('<p class="success">' + mes + '</p>');
            $('.success').fadeIn(500);
			$(':input','#feedback').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
			$('textarea', '#feedback').val('').addClass('good');

        } else{
            // form.append('<p class="error">' + mes + '</p>');
            $('.error').fadeIn(500);
			$(':input','#feedback').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
			$('textarea','#feedback').val('').addClass('bad');
        }
    });

    request.fail(function(jqXHR, textStatus) {
    		$('.error').fadeIn(500);
        // alert("Request failed: " + textStatus);
    });
}

			$('#feedback').on('submit', submitForm);

		/*

		$("#order-form").submit(function() {
		var data = $(this).serialize();
		$.ajax({
			type: "POST",
			url: "contact.php",
			data: data,
			success: function(msg) {
				if(msg == 'ok') {
					$('#succes').fadeIn(500);
					// $('.popup2, .overlay').css('opacity','1');
					// $('.popup2, .overlay').css('visibility','visible');
					// $('.popup').css({'opacity':'0','visibility':'hidden'});
					$(':input','#order-form').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
				}
				else {
					// $('.popup2 .window').html('<h5>Ошибка</h5><p>Сообщение не отправлено, убедитесь в правильности заполнение полей</p>');
					// $('.popup2, .overlay').css('opacity','1');
					// $('.popup2, .overlay').css('visibility','visible');
					// $('.popup').css({'opacity':'0','visibility':'hidden'});
					$('#error').fadeIn(500);
				}
			}
		});
		return false;
	});
	*/

});