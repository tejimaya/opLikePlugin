$(function(){
  $(document).on('click', '.like-post', function(event)
  {
    var likeParent = $(this).parent();
    var likeId = $(likeParent).attr('data-like-id');
    var target = $(likeParent).attr('data-like-target');
    var memberId = $(likeParent).attr('member-id');

    $.ajax(
    {
      url: openpne.apiBase + 'like/post.json',
      type: 'POST',
      data: 
      {
        'apiKey': openpne.apiKey,
        'target': target,
        'target_id': likeId,
        'member_id': memberId
      },
      success: function(json)
      {
        $(likeParent).children('.like-you').show();
        $(likeParent).children('.like-post').hide();
        $(likeParent).children('.like-cancel').show();
      },
      error: function(jqXHR, textStatus, errorThrown)
      {
        if (jqXHR.status === 0) return; // aborted
        alert("いいね！の投稿に失敗しました。");
      }
    });
  });

  $(document).on('click', '.like-cancel', function(event)
  {
    var likeParent = $(this).parent();
    var likeId = $(likeParent).attr('data-like-id');
    var target = $(likeParent).attr('data-like-target');

    $.ajax(
    {
      url: openpne.apiBase + 'like/delete.json',
      type: 'POST',
      data:
      {
        'apiKey': openpne.apiKey,
        'target': target,
        'target_id': likeId
      },
      success: function(json)
      {
        $(likeParent).children('.like-you').hide();
        $(likeParent).children('.like-post').show();
        $(likeParent).children('.like-cancel').hide();
      },
      error: function(jqXHR, textStatus, errorThrown)
      {
        if (jqXHR.status === 0) return; // aborted
        alert("いいね！の削除に失敗しました。");
      }
    });
  });


  $(document).on('click', '.like-list', function(event)
  {
    var likeId = $(this).parent().attr('data-like-id');
    var target = $(this).parent().attr('data-like-target');

    $.ajax(
    {
      url: openpne.apiBase + 'like/list.json',
      type: 'POST',
      data:
    {
      'apiKey': openpne.apiKey,
      'target': target,
      'target_id': likeId
    },
      success: function(json)
      {
        if (json.data[0])
        {
          memberListShow(json, likeId, target);
        }
      },
      error: function(jqXHR, textStatus, errorThrown)
      {
        if (jqXHR.status === 0) return; // aborted
        alert("データ取得に失敗しました。");
      }
    });
  });

  $(document).on('click', '.like-more-see', function(event)
  {
    var likeId = $(this).attr('data-like-id');
    var target = $(this).attr('data-like-target');
    var maxId = $(this).attr('data-max-id');
    var listMember = $(this).parent();
    maxId = parseInt(maxId) + 20;

    $.ajax(
    {
      url: openpne.apiBase + 'like/list.json',
      type: 'POST',
      data:
      {
        'apiKey': openpne.apiKey,
        'target': target,
        'target_id': likeId,
        'max_id': maxId
      },
      success: function(json)
      {
        if (json.data[0])
        {
          memberListShow(json, likeId, target);
          if (json.data.length < maxId)
          {
            $('.like-more-see').hide();
          }
        }
      },
      error: function(jqXHR, textStatus, errorThrown)
      {
        if (jqXHR.status === 0) return; // aborted
        alert("データ取得に失敗しました。");
      }
    });
  });

  setInterval("totalLoadAll()", 2000);
});


function memberListShow(json, likeId, target)
{
  var likeModalBody = $('.like-modal-body');
  $(likeModalBody).children().remove();

  var list = $('#LikelistTemplate').tmpl(json.data.reverse());
  $(likeModalBody).append(list);
  $(likeModalBody).append('<div class="like-more-see btn" data-max-id="' + json.data.length + '" data-like-target="' + target + '" data-like-id="' + likeId + '">続きを読む</div>');
}


function totalLoad(likeId, target, obj)
{
  var likeList = $(obj).children('.like-list');
  var likePost = $(obj).children('.like-post');
  var likeCancel = $(obj).children('.like-cancel');
  $.ajax(
  {
    url: openpne.apiBase + 'like/search.json?apiKey=' + openpne.apiKey,
    type: 'GET',
    data:
    {
      'target': target,
      'target_id': likeId
    },
    success: function(json)
    {
      if (0 < json.data.length)
      {
        judgeFriend(json, obj);
      }
      else
      {
        $(obj).attr('like-total', 0);
        likeList.text('');
      }
    },
    error: function(jqXHR, textStatus, errorThrown)
    {
      if (jqXHR.status === 0) return; // aborted
      alert("データ取得に失敗しました。");
    }
  });
}

function judgeFriend(json, obj)
{
  var mine = false;
  var friendHtml = '';
  var friendCount = 0;
  var friendViewNumber = 5;
  for (var i = 0; i < json.data.length - 1; i++)
  {
    if (json.data[json.data.length - 1].requestMemberId == json.data[i].member.id)
    {
      mine = true;
    }

    if (friendViewNumber > friendCount && json.data[i].member.friend)
    {
      friendHtml = friendHtml + '<a href="' + json.data[i].member.profile_url + '">' + json.data[i].member.name + '</a>さん';
      friendCount++;
    }

    if (mine && friendViewNumber <= friendCount)
    {
      break;
    }
  }

  totalShow(mine, friendCount, friendHtml, parseInt(json.data[json.data.length - 1].total), obj);
}

function totalShow(mine, friendCount, friendHtml, total, obj)
{
  var likeList = $(obj).children('.like-list');
  var likePost = $(obj).children('.like-post');
  var likeCancel = $(obj).children('.like-cancel');
  var likeYou = $(obj).children('.like-you');

  likeList.text('');
  likeList.next('.like-after').remove();
  likeList.attr('href', '#likeModal');

  if (mine && '' !== friendHtml)
  {
    if (0 < (total - friendCount - 1))
    {
      likeList.append('<i class="icon-thumbs-up"></i>他' + (total - friendCount - 1) + '人');
      likeList.after('<span class="like-after">と' + friendHtml + 'が「いいね！」と言っています。</span>');
    }
    else
    {
      likeList.append('<i class="icon-thumbs-up"></i>');
      likeList.after('<span class="like-after">' + friendHtml + 'が「いいね！」と言っています。</span>');
    }
    $(likeYou).show();
    $(likePost).hide();
    $(likeCancel).show();
  }
  else if (!mine && '' !== friendHtml)
  {
    if (0 < (total - friendCount))
    {
      likeList.append('<i class="icon-thumbs-up"></i>' + (total - friendCount) + '人');
      likeList.after('<span class="like-after">と' + friendHtml + 'が「いいね！」と言っています。</span>');
    }
    else
    {
      likeList.append('<i class="icon-thumbs-up"></i>');
      likeList.after('<span class="like-after">' + friendHtml + 'が「いいね！」と言っています。</span>');
    }
    $(likeYou).hide();
    $(likePost).show();
    $(likeCancel).hide();
  }
  else if (mine && '' === friendHtml)
  {
    if (0 < (total - 1))
    {
      likeList.append('<i class="icon-thumbs-up"></i>他' + (total - 1) + '人');
      likeList.after('<span class="like-after">が「いいね！」と言っています。</span>');
    }
    $(likeYou).show();
    $(likePost).hide();
    $(likeCancel).show();
  }
  else
  {
    if (0 < total)
    {
      likeList.append('<i class="icon-thumbs-up"></i>' + total + '人');
      likeList.after('<span class="like-after">が「いいね！」と言っています。</span>');
    }
    $(likeYou).hide();
    $(likePost).show();
    $(likeCancel).hide();
  }
  $(obj).attr('like-mine', mine);
  $(obj).attr('like-friend-count', friendCount);
  $(obj).attr('like-friend-html', friendHtml);
  $(obj).attr('like-total', total - friendCount);
}

function totalLoadAll()
{
  var dataList = new Array();
  $('.like-list').each(function()
  {
    if (!$(this).attr('not-each-load'))
    {
      var likeId = $(this).parent().attr('data-like-id');
      var target = $(this).parent().attr('data-like-target');
      var objList = new Object();

      if (likeId.match(/^[0-9]+$/) && target.match(/^[a-zA-Z]$/))
      {
        objList.likeId = likeId;
        objList.target = target;
        dataList.push(objList);
        $(this).attr('not-each-load', true);
      }
    }
  });

  if (0 < dataList.length)
  {
    packetLoad(dataList);
  }
}

function packetLoad(dataList)
{
  $.ajax(
  {
    url: openpne.apiBase + 'like/packet_search.json?apiKey=' + openpne.apiKey,
    type: 'GET',
    data:
    {
      'data': dataList,
    },
    success: function(json)
    {
      for (var i = 0; i < json.data.length; i++)
      {
        var targetObj = $('span[class="like-wrapper"][data-like-id="' + json.data[i].data[0].foreign_id + '"][data-like-target="' + json.data[i].data[0].foreign_table + '"]');
        if (0 >= targetObj.length)
        {
          var targetObj = $('span[class="like-wrapper font-small"][data-like-id="' + json.data[i].data[0].foreign_id + '"][data-like-target="' + json.data[i].data[0].foreign_table + '"]');
        }
        
        judgeFriend(json.data[i], targetObj);
      }
      $('.like-wrapper').show();
      $('.like').show();
    },
    error: function(jqXHR, textStatus, errorThrown)
    {
      if (jqXHR.status === 0) return; // aborted
      alert("データ取得に失敗しました。");
    }
  });
}
