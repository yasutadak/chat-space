$(document).on('turbolinks:load', function(){
var search_list = $("#user-search-result");

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
              </div>`
  search_list.append(html);
}

function appendNoUser(user) {
  var html = `<div class="chat-group-user clearfix">${ user }</div>`
  search_list.append(html);
}

var user_list = $('#add-user-result');

function appendAddUser(id, name) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value=${id}>
                <p class='chat-group-user__name'>${name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
  user_list.append(html);
}

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーはいません")
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました')
    })
  });

  $(document).on('click', '.chat-group-user__btn--add', function(){
    $(this).parent().remove();
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    appendAddUser(id, name);
  });

  $(document).on('click', '.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
  });
});
