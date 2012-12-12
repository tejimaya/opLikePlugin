$(function(){

  $('.like-post').live('click', function()
  {
    var likeParent = $(this).parent().parent('.like-wrapper');
    var likeId = $(likeParent).attr('data-like-id');
    var target = $(likeParent).attr('data-like-target');
    var memberId = $(likeParent).attr('member-id');
    var likeList = $(likeParent).children().children('.like-list');

    $.ajax(
    {
      url: openpne.apiBase + 'like/post.json?apiKey=' + openpne.apiKey,
      type: 'POST',
      data: 
      {
        'target': target,
        'target_id': likeId,
        'member_id': memberId,
      },
      success: function(json)
      {
        $(likeParent).children().children('.like-post').hide();
        $(likeParent).children().children('.like-cancel').show();
        var likeTotal = parseInt($(likeList).text());
        $(likeList).text('');
        $(likeList).append('<i class="icon-thumbs-up"></i>' + (likeTotal + 1));
        $(likeList).attr('href', '/like/list/' + target + '/' + likeId);
      },
    });
  });

  $('.like-cancel').live('click', function()
  {
    var likeParent = $(this).parent().parent('.like-wrapper');
    var likeId = $(likeParent).attr('data-like-id');
    var target = $(likeParent).attr('data-like-target');
    var likeList = $(likeParent).children().children('.like-list');

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
        $(likeParent).children().children('.like-post').show();
        $(likeParent).children().children('.like-cancel').hide();
        var likeTotal = parseInt($(likeList).text());
        $(likeList).text('');
        $(likeList).append('<i class="icon-thumbs-up"></i>' + (likeTotal - 1));
        if (1 > (likeTotal - 1))
        {
          $(likeList).removeAttr('href');
        }
      },
    });
  });
  setInterval('totalLoadAll()', 2000);
});

function totalLoad(likeId, target, obj)
{
  var likeList = $(obj).children().children('.like-list');
  var likePost = $(obj).children().children('.like-post');
  var likeCancel = $(obj).children().children('.like-cancel');

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
        for (var i = 0; i < json.data.length - 1; i++)
        {
          if (json.data[json.data.length - 1].requestMemberId == json.data[i].member.id)
          {
            mine = true;
            break;
          }
        }

        likeList.text('');
        if (mine)
        {
          $(likeList).append('<i class="icon-thumbs-up"></i>' + json.data[json.data.length - 1].total);
          $(likePost).hide();
          $(likeCancel).show();
        }
        else
        {
          likeList.append('<i class="icon-thumbs-up"></i>' + json.data[json.data.length - 1].total);
        }

        if (!likeList.attr('no-href-clear') && 0 < parseInt(json.data[json.data.length - 1].total))
        {
          $(likeList).attr('href', '/like/list/' + target + '/' + likeId);
        }
      }
      else
      {
        likeList.append('<i class="icon-thumbs-up"></i>0');
        if (!likeList.attr('no-href-clear'))
        {
          $(likeList).removeAttr('href');
        }
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
      var likeParent = $(this).parent().parent('.like-wrapper');
      var likeId = $(likeParent).attr('data-like-id');
      var target = $(likeParent).attr('data-like-target');
      totalLoad(likeId, target, $(likeParent).get(0));
      $(this).attr('not-each-load', true);
    }
  });
  $('.like-wrapper').show();
}
