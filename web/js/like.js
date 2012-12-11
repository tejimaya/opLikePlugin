$(function(){
  $('.like-post').live('click', function()
  {
    var likeId = $(this).parent().attr('data-like-id');
    var target = $(this).parent().attr('data-like-target');
    var memberid = $(this).parent().attr('member-id');
    var likeParent = $(this).parent();

    $.ajax(
    {
      url: openpne.apiBase + 'like/post.json?apiKey=' + openpne.apiKey,
      type: 'POST',
      data: 
      {
        'target': target,
        'target_id': likeId,
        'member_id': memberid
      },
      success: function(json)
      {
        $(likeParent).children('.like-post').hide();
        $(likeParent).children('.like-cancel').show();
        totalLoad(likeId, target, $(likeParent));
      },
    });
  });

  $('.like-cancel').live('click', function()
  {
    var likeId = $(this).parent().attr('data-like-id');
    var target = $(this).parent().attr('data-like-target');
    var likeParent = $(this).parent();

    $.ajax(
    {
      url: openpne.apiBase + 'like/delete.json?apiKey=' + openpne.apiKey,
      type: 'POST',
      data:
      {
        'target': target,
        'target_id': likeId
      },
      success: function(json)
      {
        $(likeParent).children('.like-cancel').hide();
        $(likeParent).children('.like-post').show();
        totalLoad(likeId, target, $(likeParent));
      },
    });
  });


  $('.like-list').live('click', function()
  {
    var likeId = $(this).parent().attr('data-like-id');
    var target = $(this).parent().attr('data-like-target');

    $.ajax(
    {
      url: openpne.apiBase + 'like/list.json?apiKey=' + openpne.apiKey,
      type: 'POST',
      data:
    {
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
    });
  });

  $('.like-more-see').live('click', function()
  {
    var likeId = $(this).attr('data-like-id');
    var target = $(this).attr('data-like-target');
    var maxId = $(this).attr('data-max-id');
    var listMember = $(this).parent();
    maxId = parseInt(maxId) + 20;

    $.ajax(
    {
      url: openpne.apiBase + 'like/list.json?apiKey=' + openpne.apiKey,
      type: 'POST',
      data:
      {
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
    });
  });

  setInterval("totalLoadAll()", 2000);
});


function memberListShow(json, likeId, target)
{
  var modalBody = $('.modal-body');
  $(modalBody).children().remove();

  var list = $('#LikelistTemplate').tmpl(json.data.reverse());
  $(modalBody).append(list);
  $(modalBody).append('<div class="like-more-see btn" data-max-id="' + json.data.length + '" data-like-target="' + target + '" data-like-id="' + likeId + '">続きを読む</div>');
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
        var mine = false;
        var friendHtml = '';
        var friendCount = 0;
        for (var i = 0; i < json.data.length - 1; i++)
        {
          if (json.data[json.data.length - 1].requestMemberId == json.data[i].member.id)
          {
            mine = true;
          }
  
          if (5 > friendCount && json.data[i].member.friend)
          {
            friendHtml = friendHtml + '<a href="' + json.data[i].member.profile_url + '">' + json.data[i].member.name + '</a>さん';
            friendCount++;
          }
        }

        likeList.text('');
        likeList.next().text('');
        likeList.attr('href', '#likeModal');
        if (mine && '' !== friendHtml)
        {
          likeList.append('<i class="icon-thumbs-up"></i>あなたと' + '他' + (parseInt(json.data[json.data.length - 1].total) - friendCount - 1) + '人');
          likeList.next().append('と' + friendHtml + 'が「いいね！」と言っています。');
          $(likePost).hide();
          $(likeCancel).show();
        }
        else if (!mine && '' !== friendHtml)
        {
          likeList.append('<i class="icon-thumbs-up"></i> ' + (parseInt(json.data[json.data.length - 1].total) - friendCount) + '人');
          likeList.next().append('と' + friendHtml + 'が「いいね！」と言っています。');
        }
        else if (mine && '' === friendHtml)
        {
          likeList.append('<i class="icon-thumbs-up"></i>あなた');
          likeList.next().append('が「いいね！」と言っています。');
          $(likePost).hide();
          $(likeCancel).show();
        }
        else
        {
          if (0 < json.data[json.data.length - 1].total)
          {
            likeList.append('<i class="icon-thumbs-up"></i>' + json.data[json.data.length - 1].total + '人');
            likeList.next().append(friendHtml + 'が「いいね！」と言っています。');
          }
          else
          {
            likeList.append('<i class="icon-thumbs-up"></i>0');
            likeList.attr('href', '');
          }
        }
      }
      else
      {
        likeList.next().text('');
        likeList.text('');
      }
    },
  });
}

function totalLoadAll()
{
  $('.like-list').each(function()
  {
    if (!$(this).attr('not-each-load'))
    {
      var likeId = $(this).parent().attr('data-like-id');
      var target = $(this).parent().attr('data-like-target');
      totalLoad(likeId, target, $(this).parent().get(0));
      $(this).attr('not-each-load', true);
    }
  });
  $('.like-wrapper').show();
  $('.like').show();
}
