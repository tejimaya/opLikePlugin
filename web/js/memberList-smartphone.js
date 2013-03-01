$(function()
{
  var url = location.href;
  if ((n = url.lastIndexOf('/')) != -1)
  {
    likeId = url.substring(n + 1);
    target = url.substring(n - 1, n);
  }

  memberListShow(likeId, target, 20);

  $('#more-see').click(function()
  {
    var maxId = $(this).attr('data-max-id');
    maxId = parseInt(maxId) + 20;
    memberListShow(likeId, target, maxId);
  });
});

function memberListShow(likeId, target, maxId)
{
  $.ajax(
  {
    url: openpne.apiBase + 'like/list.json',
    type: 'POST',
    data: 
    {
      'apiKey': openpne.apiKey,
      'target': target,
      'target_id': likeId,
      'max_id': maxId
    },
    success: function(json)
    { 
      $('div[class="like-list-member"]').hide();
      if (json.data[0])
      {
        $('#like-list-member').children().remove();

        var list = $('#LikelistTemplate').tmpl(json.data.reverse());
        $('#like-list-member').append(list);
        $('#more-see').attr('data-max-id', json.data.length);
        if (json.data.length < maxId)
        {
          $('#more-see').hide();
        }
      }
    }
  });
}
