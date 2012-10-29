$(function(){
  var niceListMemberFlag = false;

  $('body').click(function()
  {
    if (niceListMemberFlag) 
    {
      $('div[class="nice-list-member"]').hide();
      niceListMemberFlag = false;
    }
  });

  $('.nice-post').live('click', function()
  {
    var niceId = $(this).attr('data-nice-id');
    var memberid = $(this).attr('member-id');

    $.ajax(
    {
      url: openpne.apiBase + 'nice/post.json?apiKey=' + openpne.apiKey,
      type: 'POST',
      data: 
      {
        'target': 'A',
        'target_id': niceId,
        'member_id': memberid
      },
      success: function(json)
      {
        $('span[class="nice-post"][data-nice-id="' +  niceId + '"]').hide();
        $('span[class="nice-cancel"][data-nice-id="' +  niceId + '"]').show();
        totalLoad(niceId);
      },
    });
  });

  $('.nice-cancel').live('click', function() 
  {
    var niceId = $(this).attr('data-nice-id');

    $.ajax(
    {
      url: openpne.apiBase + 'nice/delete.json?apiKey=' + openpne.apiKey,
      type: 'POST',
      data: 
      {
        'target': 'A',
        'target_id': niceId
      },
      success: function(json)
      {
        $('span[class="nice-cancel"][data-nice-id="' +  niceId + '"]').hide();
        $('span[class="nice-post"][data-nice-id="' +  niceId + '"]').show();
        totalLoad(niceId);
      },
    });
  });
});

function totalLoad(niceId)
{
  $.ajax(
  {
    url: openpne.apiBase + 'nice/search.json?apiKey=' + openpne.apiKey,
    type: 'GET',
    data: 
    {
      'target': 'A',
      'target_id': niceId
    },
    success: function(json)
    {
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
          $('span[class="nice-list"][data-nice-id="' + niceId + '"]').text('いいね！(' + json.data['0'].total + ')');
          $('span[class="nice-post"][data-nice-id="' +  niceId + '"]').hide();
          $('span[class="nice-cancel"][data-nice-id="' +  niceId + '"]').show();
        }
        else
        {
          $('span[class="nice-list"][data-nice-id="' + niceId + '"]').text('いいね！(' + json.data['0'].total + ')');
        }
      }
      else
      {
        $('span[class="nice-list"][data-nice-id="' + niceId + '"]').text('いいね！');
      }
    },
  });
}

function totalLoadAll()
{
  $('.nice-list').each(function()
  {
    var niceId = $(this).attr('data-nice-id');
    totalLoad(niceId);
  });
}
