<script id="LikelistTemplate" type="text/x-jquery-tmpl">
  <table>
    <tr style="padding: 2px;">
      <td style="width: 48px; padding: 2px;"><a href="${profile_url}"><img src="${profile_image}" width="48"></a></td>
      <td style="padding: 2px;"><a href="${profile_url}">${name}</a></td>
    </tr>
  </table>
</script>

<div id="likeModal" class="modal hide">
  <div class="modal-header">
    <h1>「いいね！」と言っている人</h1>
  </div>
  <div class="modal-body">
  </div>
  <div class="modal-footer">
    <a href="#" class="btn close" data-dismiss="modal" aria-hidden="true">閉じる</a>
  </div>
</div>
