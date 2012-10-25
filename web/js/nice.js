$(function(){

  $('.nice-post').live('click', function()
  {
    var niceid = $(this).attr('data-nice-id');
    var memberid = $(this).attr('member-id');

    $.ajax(
    {
      url: openpne.apiBase + 'nice/post.json?apiKey=' + openpne.apiKey,
      type: 'POST',
      data: 
      {
        'target': 'A',
        'target_id': niceid,
        'member_id': memberid
      },
      success: function(json)
      {
        $('span[class="nice-post"][data-nice-id="' +  niceid + '"]').hide();
        $('span[class="nice-cancel"][data-nice-id="' +  niceid + '"]').show();
        totalLoad(niceid);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) 
      {
        $('span[class="nice-post"][data-nice-id="' +  niceid + '"]').text('いいね投稿失敗');
      }
    });
  });

  $('.nice-cancel').live('click', function() 
  {
    var niceid = $(this).attr('data-nice-id');

    $.ajax(
    {
      url: openpne.apiBase + 'nice/delete.json?apiKey=' + openpne.apiKey,
      type: 'POST',
      data: 
      {
        'target': 'A',
        'target_id': niceid
      },
      success: function(json)
      {
        $('span[class="nice-cancel"][data-nice-id="' +  niceid + '"]').hide();
        $('span[class="nice-post"][data-nice-id="' +  niceid + '"]').show();
        totalLoad(niceid);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown)
      {
        $('span[class="nice-cancel"][data-nice-id="' +  niceid + '"]').text('いいね取消し失敗');
      }
    });
  });


  $('.nice-list').live('click', function()
  {
    var niceid = $(this).attr('data-nice-id');
    var listMember = $('div[class="nice-list-member"][data-nice-id="' + niceid + '"]');
    listMember.children().children().remove();

    if ('none' == listMember.css('display'))
    {
      $.ajax(
      {
        url: openpne.apiBase + 'nice/list.json?apiKey=' + openpne.apiKey,
        type: 'POST',
        data: 
        {
          'target': 'A',
          'target_id': niceid
        },
        success: function(json)
        {
          if (json.data[0])
          {
            var list = $('#NicelistTemplate').tmpl(json.data);
            listMember.append(list);
            listMember.show();
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown)
        {
        }
      });
    }
    else
    {
      listMember.hide();
    }
  });
});

function totalLoad(niceid)
{
  $.ajax(
  {
    url: openpne.apiBase + 'nice/search.json?apiKey=' + openpne.apiKey,
    type: 'GET',
    data: 
    {
      'target': 'A',
      'target_id': niceid
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
          $('span[class="nice-list"][data-nice-id="' + niceid + '"]').text('いいね！(' + json.data['0'].total + ')');
          $('span[class="nice-post"][data-nice-id="' +  niceid + '"]').hide();
          $('span[class="nice-cancel"][data-nice-id="' +  niceid + '"]').show();
        }
        else
        {
          $('span[class="nice-list"][data-nice-id="' + niceid + '"]').text('いいね！(' + json.data['0'].total + ')');
        }
      }
      else
      {
        $('span[class="nice-list"][data-nice-id="' + niceid + '"]').text('いいね！');
      }
    },
  });
}

function totalLoadAll()
{
  $('.nice-list').each(function()
  {
    var niceid = $(this).attr('data-nice-id');
    totalLoad(niceid);
  });
}
