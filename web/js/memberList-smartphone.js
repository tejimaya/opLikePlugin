$(function()
{
  var url = location.href;  
  if ((n = url.lastIndexOf('/')) != -1)
  {
    niceId = url.substring(n + 1);
  }

  memberListShow(niceId, 20);

  $('#more-see').click(function()
  {
    var maxId = $(this).attr('data-max-id');
    maxId = parseInt(maxId) + 20;
    memberListShow(niceId, maxId);
  });
});

function memberListShow(niceId, maxId)
{
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
      $('div[class="nice-list-member"]').hide();
      if (json.data[0])
      {
        $('#nice-list-member').children().remove();

        var list = $('#NicelistTemplate').tmpl(json.data);
        $('#nice-list-member').append(list);
        $('#more-see').attr('data-max-id', json.data.length);
      }
    }
  }); 
}
