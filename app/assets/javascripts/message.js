$(function(){
  function buildHTML(message){
    var addMessage = (message.content != null) ? `${message.content}` : ''
    var addImage = (message.image == null) ? `<img class = "lower-message__image", src="${message.image}">` : ''
    var html = `<div class="main__message">
                  <div class="main__message-name">
                    ${message.user_name}
                  </div>
                  <div class="main__message-time">
                    ${message.time}
                  </div>
                  <div class="main__message-text">
                    ${addMessage}
                    ${addImage}
                  </div>
                </div>`
    return html;
  }
  function scroll(){
    $('.message').animate({scrollTop: $('.message')[0].scrollHeight});
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html);
      $('.form__submit').prop('disabled', false);
      $('form')[0].reset();
      scroll()
    })
    .fail(function(){
      alert('error')
      $('.form__submit').prop('disabled', false);
    })
  })
});
