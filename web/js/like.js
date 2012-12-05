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

  totalLoadAll();
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
        if (json.data[0])
        {
          for (var i = 0; i < json.data.length; i++)
          {
            friendHtml = friendHtml + "&nbsp;&nbsp;" + '<a href="' + json.data[i].profile_url + '">' + json.data[i].name + '</a>';
          }
        }
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
        for (var i = 0; i < json.data.length; i++)
        {
          if (json.data[i].requestMemberId == json.data[i].member_id)
          {
            mine = true;
          }
        }

        if (mine)
        {
          likeList.text('いいね！(' + json.data[0].total + ')');
          $('span[class="like-post"][data-like-id="' +  likeId + '"][data-like-target="' + target + '"]').hide();
          $('span[class="like-cancel"][data-like-id="' +  likeId + '"][data-like-target="' + target + '"]').show();
        }
        else
        {
          likeList.text('いいね！(' + json.data[0].total + ')');
        }
      }
      else
      {
        likeList.text('いいね！');
      }
      friendListShow(likeId, target);
    },
  });
}

function totalLoadAll()
{
  $('.like-list').each(function()
  {
    var likeId = $(this).attr('data-like-id');
    var target = $(this).attr('data-like-target');
    totalLoad(likeId, target);
  });
  $('.like-wrapper').show();
  $('.like').show();
}
