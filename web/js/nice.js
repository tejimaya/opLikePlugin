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


  $('.nice-list').live('click', function()
  {
    var niceId = $(this).attr('data-nice-id');
    var listMember = $('div[class="nice-list-member"][data-nice-id="' + niceId + '"]');
    listMember.children().remove();

    if ('none' == listMember.css('display'))
    {
      $.ajax(
      {
        url: openpne.apiBase + 'nice/list.json?apiKey=' + openpne.apiKey,
        type: 'POST',
        data:
        {
          'target': 'A',
          'target_id': niceId
        },
        success: function(json)
        {
          $('div[class="nice-list-member"]').hide();
          if (json.data[0])
          {
            memberListShow(json, niceId);
            niceListMemberFlag = true;
          }
        },
      });
    }
    else if (niceListMemberFlag)
    {
      listMember.hide();
      niceListMemberFlag = false;
    }
  });

  $('.nice-more-see').live('click', function()
  {
    var niceId = $(this).attr('data-nice-id');
    var maxId = $(this).attr('data-max-id');
    maxId = parseInt(maxId) + 20;

    $.ajax(
    {
      url: openpne.apiBase + 'nice/list.json?apiKey=' + openpne.apiKey,
      type: 'POST',
      data:
      {
        'target': 'A',
        'target_id': niceId,
        'max_id': maxId
      },
      success: function(json)
      {
        if (json.data[0])
        {
          memberListShow(json, niceId);
        }
      },
    });
  });

  $('.icon-remove').live('click', function()
  {
    $('div[class="nice-list-member"]').hide();
  });
});


function memberListShow(json, niceId)
{
  var listMember = $('div[class="nice-list-member"][data-nice-id="' + niceId + '"]');
  listMember.children().remove();

  var niceListMemberHead = '<div style="background-color: #66c"><span>「いいね！」したメンバー</span><span style="float:right;"><i class="icon-remove" style="cursor: pointer"></i></span></div>';
  listMember.append(niceListMemberHead);

  var list = $('#NicelistTemplate').tmpl(json.data);
  listMember.append(list);

  var moreSee = '<p class="nice-more-see btn" data-nice-id="' + niceId + '" data-max-id="' + json.data.length + '" style="width:90%;margin: 4px;">もっと読む</p>';
  listMember.append(moreSee);
  listMember.show();
}


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
          $('span[class="nice-list"][data-nice-id="' + niceId + '"]').text('いいね！(' + json.data[0].total + ')');
          $('span[class="nice-post"][data-nice-id="' +  niceId + '"]').hide();
          $('span[class="nice-cancel"][data-nice-id="' +  niceId + '"]').show();
        }
        else
        {
          $('span[class="nice-list"][data-nice-id="' + niceId + '"]').text('いいね！(' + json.data[0].total + ')');
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
