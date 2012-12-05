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
  setTimeout('totalLoadAll()', 3000);
});

function totalLoad(likeId, target)
{
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
      var likeList = $('span[class="like-list"][data-like-id="' + likeId + '"][data-like-target="' + target + '"]');
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
        if (!likeList.attr('no-href-clear')) likeList.parent().attr('href', '/like/list/' + target + '/' + likeId);
      }
      else
      {
        likeList.text('いいね！');
        if (!likeList.attr('no-href-clear')) likeList.parent().removeAttr('href');
      }
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
  $('.like-comment-wrapper').show();
}
