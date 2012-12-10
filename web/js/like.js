$(function(){
  var likeListMemberFlag = false;

  $('body').click(function()
  {
    if (likeListMemberFlag)
    {
      $('div[class="like-list-member"]').hide();
      likeListMemberFlag = false;
    }
  });

  $('.like-post').live('click', function()
  {
    var likeId = $(this).attr('data-like-id');
    var target = $(this).attr('data-like-target');
    var memberid = $(this).attr('member-id');

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
        $('span[class="like-post"][data-like-id="' +  likeId + '"][data-like-target="' + target + '"]').hide();
        $('span[class="like-cancel"][data-like-id="' +  likeId + '"][data-like-target="' + target + '"]').show();
        totalLoad(likeId, target);
      },
    });
  });

  $('.like-cancel').live('click', function()
  {
    var likeId = $(this).attr('data-like-id');
    var target = $(this).attr('data-like-target');

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
        $('span[class="like-cancel"][data-like-id="' +  likeId + '"][data-like-target="' + target + '"]').hide();
        $('span[class="like-post"][data-like-id="' +  likeId + '"][data-like-target="' + target + '"]').show();
        totalLoad(likeId, target);
      },
    });
  });


  $('.like-list').live('click', function()
  {
    var likeId = $(this).attr('data-like-id');
    var target = $(this).attr('data-like-target');
    var listMember = $('div[class="like-list-member"][data-like-id="' + likeId + '"][data-like-target="' + target + '"]');
    listMember.children().remove();

    if ('none' == listMember.css('display'))
    {
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
          $('div[class="like-list-member"]').hide();
          if (json.data[0])
          {
            memberListShow(json, likeId, target);
            likeListMemberFlag = true;
          }
        },
      });
    }
    else if (likeListMemberFlag)
    {
      listMember.hide();
      likeListMemberFlag = false;
    }
  });

  $('.like-more-see').live('click', function()
  {
    var likeId = $(this).attr('data-like-id');
    var target = $(this).attr('data-like-target');
    var maxId = $(this).attr('data-max-id');
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
        }
      },
    });
  });

  $('.icon-remove').live('click', function()
  {
    $('div[class="like-list-member"]').hide();
  });

  setInterval("totalLoadAll()", 2000);
});


function friendListShow(likeId, target)
{
  if ($('.like-friend-list'))
  {
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
        var friendHtml = '';
        var count = 0;
        if (json.data[0])
        {
          for (var i = 0; i < json.data.length; i++)
          {
            if (json.data[i].friend)
            {
              friendHtml = friendHtml + "&nbsp;&nbsp;" + '<a href="' + json.data[i].profile_url + '">' + json.data[i].name + '</a>';
            }
            else
            {
              count++;
            }
          }
        }
        friendHtml = friendHtml + "他" + count + "人が「いいね！」と言っています。";
        var friendList = $('span[class="like-friend-list"][data-like-id="' + likeId + '"][data-like-target="' + target + '"]');
        friendList.text('');
        friendList.append(friendHtml);
      },
    });
  }
}

function memberListShow(json, likeId, target)
{
  var listMember = $('div[class="like-list-member"][data-like-id="' + likeId + '"][data-like-target="' + target + '"]');
  listMember.children().remove();

  var likeListMemberHead = '<div style="background-color: #66c"><span>「いいね！」したメンバー</span><span style="float:right;"><i class="icon-remove" style="cursor: pointer"></i></span></div>';
  listMember.append(likeListMemberHead);

  var list = $('#LikelistTemplate').tmpl(json.data);
  listMember.append(list);

  var moreSee = '<p class="like-more-see btn" data-like-id="' + likeId + '" data-like-target="' + target + '" data-max-id="' + json.data.length + '" style="width:90%;margin: 4px;">もっと読む</p>';
  listMember.append(moreSee);
  listMember.show();
}


function totalLoad(likeId, target)
{
  var likeList = $('span[class="like-list"][data-like-id="' + likeId + '"][data-like-target="' + target + '"]');
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
          }
          friendCount++;
        }

        likeList.text('');
        likeList.parent().next().text('');
        if (mine && '' !== friendHtml)
        {
          likeList.append('<i class="icon-thumbs-up"></i>あなたと' + '他' + json.data[json.data.length - 1].total + '人');
          likeList.parent().next().append(friendHtml + 'が「いいね！」と言っています。');
          $('span[class="like-post"][data-like-id="' +  likeId + '"][data-like-target="' + target + '"]').hide();
          $('span[class="like-cancel"][data-like-id="' +  likeId + '"][data-like-target="' + target + '"]').show();
        }
        else if (!mine && '' !== friendHtml)
        {
          likeList.append('<i class="icon-thumbs-up"></i> ' + json.data[json.data.length - 1].total + '人');
          likeList.parent().next().append('と' + friendHtml + 'が「いいね！」と言っています。');
        }
        else if (mine && '' === friendHtml)
        {
          likeList.append('<i class="icon-thumbs-up"></i>あなた');
          likeList.parent().next().append('が「いいね！」と言っています。');
          $('span[class="like-post"][data-like-id="' +  likeId + '"][data-like-target="' + target + '"]').hide();
          $('span[class="like-cancel"][data-like-id="' +  likeId + '"][data-like-target="' + target + '"]').show();
        }
        else
        {
          if (0 < json.data[json.data.length - 1].total)
          {
            likeList.append('<i class="icon-thumbs-up"></i>' + json.data[json.data.length - 1].total + '人');
            likeList.parent().next().append(friendHtml + 'が「いいね！」と言っています。');
          }
          else
          {
            likeList.append('<i class="icon-thumbs-up"></i>0');
          }
        }
      }
      else
      {
        likeList.parent().next().text('');
        likeList.text('');
      }
      //friendListShow(likeId, target);
    },
  });
}

function totalLoadAll()
{
  $('.like-list').each(function()
  {
    if (!$(this).attr('not-each-load'))
    {
      var likeId = $(this).attr('data-like-id');
      var target = $(this).attr('data-like-target');
      totalLoad(likeId, target);
      $(this).attr('not-each-load', true);
    }
  });
  $('.like-wrapper').show();
  $('.like').show();
}
