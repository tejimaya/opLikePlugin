$(function()
{
  var url = location.href;
  if ((n = url.lastIndexOf('/')) != -1)
  {
    likeId = url.substring(n + 1);
  }

  memberListShow(likeId, 20);

  $('#more-see').click(function()
  {
    var maxId = $(this).attr('data-max-id');
    maxId = parseInt(maxId) + 20;
    memberListShow(likeId, maxId);
  });
});

function memberListShow(likeId, maxId)
{
  $.ajax(
  {
    url: openpne.apiBase + 'like/list.json?apiKey=' + openpne.apiKey,
    type: 'POST',
    data: 
    {
      'target': 'A',
      'target_id': likeId,
      'max_id': maxId
    },
    success: function(json)
    { 
      $('div[class="like-list-member"]').hide();
      if (json.data[0])
      {
        $('#like-list-member').children().remove();

        var list = $('#LikelistTemplate').tmpl(json.data);
        $('#like-list-member').append(list);
        $('#more-see').attr('data-max-id', json.data.length);
      }
    }
  });
}
