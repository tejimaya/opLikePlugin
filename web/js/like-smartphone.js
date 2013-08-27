$(function(){

  $(document).on('click', '.like-post', function()
  {
    var likeParent = $(this).parent().parent('.like-wrapper');
    var likeId = $(likeParent).attr('data-like-id');
    var target = $(likeParent).attr('data-like-target');
    var memberId = $(likeParent).attr('member-id');
    var likeList = $(likeParent).children().children('.like-list');

    $.ajax(
    {
      url: openpne.apiBase + 'like/post.json',
      type: 'POST',
      data: 
      {
        'apiKey': openpne.apiKey,
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
        $(likeList).attr('href', 'like/list/' + target + '/' + likeId);
      },
      error: function(jqXHR, textStatus, errorThrown)
      {
        if (jqXHR.status === 0) return; // aborted
        alert("いいね！の投稿に失敗しました。");
      }
    });
  });

  $(document).on('click', '.like-cancel', function()
  {
    var likeParent = $(this).parent().parent('.like-wrapper');
    var likeId = $(likeParent).attr('data-like-id');
    var target = $(likeParent).attr('data-like-target');
    var likeList = $(likeParent).children().children('.like-list');

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
      error: function(jqXHR, textStatus, errorThrown)
      {
        if (jqXHR.status === 0) return; // aborted
        alert("いいね！の削除に失敗しました。");
      }
    });
  });
  setInterval('totalLoadAll()', 2000);
});

function totalLoad(likeId, target, obj)
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
      totalShowSmt(json, obj);
    },
    error: function(jqXHR, textStatus, errorThrown)
    {
      if (jqXHR.status === 0) return; // aborted
      alert("データの取得に失敗しました。");
    }
  });
}

function totalShowSmt(json, obj)
{
  var likeList = $(obj).children().children('.like-list');
  var likePost = $(obj).children().children('.like-post');
  var likeCancel = $(obj).children().children('.like-cancel');
  var total = json.data[json.data.length - 1].total;

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
      $(likeList).append('<i class="icon-thumbs-up"></i>' + total);
      $(likePost).hide();
      $(likeCancel).show();
    }
    else
    {
      likeList.append('<i class="icon-thumbs-up"></i>' + total);
    }

    if (!likeList.attr('no-href-clear') && 0 < parseInt(total))
    {
      $(likeList).attr('href', 'like/list/' + json.data[0].foreign_table + '/' + json.data[0].foreign_id);
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
}

function totalLoadAll()
{
  var dataList = new Array();
  $('.like-list').each(function()
  {
    if (!$(this).attr('not-each-load'))
    {   
      $(this).append('<i class="icon-thumbs-up"></i>0');
      var likeParent = $(this).parent().parent('.like-wrapper');
      var likeId = $(likeParent).attr('data-like-id');
      var target = $(likeParent).attr('data-like-target');
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
        totalShowSmt(json.data[i], $('div[class="row like-wrapper"][data-like-id="' + json.data[i].data[0].foreign_id + '"][data-like-target="' + json.data[i].data[0].foreign_table + '"]'));
      }
      $('.like-wrapper').show();
      $('.like').show();
    },
    error: function(jqXHR, textStatus, errorThrown)
    {
      if (jqXHR.status === 0) return; // aborted
      alert("データの取得に失敗しました。");
    }
  });
}

