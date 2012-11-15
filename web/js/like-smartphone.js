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
    var memberid = $(this).attr('member-id');

    $.ajax(
    {
      url: openpne.apiBase + 'like/post.json?apiKey=' + openpne.apiKey,
      type: 'POST',
      data: 
      {
        'target': 'A',
        'target_id': likeId,
        'member_id': memberid
      },
      success: function(json)
      {
        $('span[class="like-post"][data-like-id="' +  likeId + '"]').hide();
        $('span[class="like-cancel"][data-like-id="' +  likeId + '"]').show();
        totalLoad(likeId);
      },
    });
  });

  $('.like-cancel').live('click', function()
  {
    var likeId = $(this).attr('data-like-id');

    $.ajax(
    {
      url: openpne.apiBase + 'like/delete.json?apiKey=' + openpne.apiKey,
      type: 'POST',
      data:
      {
        'target': 'A',
        'target_id': likeId
      },
      success: function(json)
      {
        $('span[class="like-cancel"][data-like-id="' +  likeId + '"]').hide();
        $('span[class="like-post"][data-like-id="' +  likeId + '"]').show();
        totalLoad(likeId);
      },
    });
    $('span[class="like-list"][data-like-id="' + likeId + '"]').parent().removeAttr('href');
  });
});

function totalLoad(likeId)
{
  $.ajax(
  {
    url: openpne.apiBase + 'like/search.json?apiKey=' + openpne.apiKey,
    type: 'GET',
    data:
    {
      'target': 'A',
      'target_id': likeId
    },
    success: function(json)
    {
      var likeList = $('span[class="like-list"][data-like-id="' + likeId + '"]');
      if (0 < json.data.length)
      {
        var mine = false;
        for (var i=0; i<json.data.length; i++)
        {
          if (json.data[i].requestMemberId == json.data[i].member_id)
          {
            mine = true;
          }
        }

        if (mine)
        {
          likeList.text('いいね！(' + json.data[0].total + ')');
          $('span[class="like-post"][data-like-id="' +  likeId + '"]').hide();
          $('span[class="like-cancel"][data-like-id="' +  likeId + '"]').show();
        }
        else
        {
          likeList.text('いいね！(' + json.data[0].total + ')');
        }
        likeList.parent().attr('href', '/like/list/A/' + likeId);
      }
      else
      {
        likeList.text('いいね！');
      }
    },
  });
}

function totalLoadAll()
{
  $('.like-list').each(function()
  {
    var likeId = $(this).attr('data-like-id');
    totalLoad(likeId);
  });
}
