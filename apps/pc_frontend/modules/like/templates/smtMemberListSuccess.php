<?php use_helper('Javascript', 'opUtil', 'opAsset') ?>
<?php op_smt_use_javascript('/opLikePlugin/js/memberList-smartphone.js', 'last') ?>
<div class="row">
  <div class="gadget_header span12"><a href="javascript:history.go(-1)"><i style="float: left;" class="icon-arrow-left icon-white"></i></a><?php echo __('Members liked') ?></div>
</div>
<div id="like-list-member"></div>

<script id="LikelistTemplate" type="text/x-jquery-tmpl">
  <div class="row" style="border: 1px solid #000000;">

    <span class="span2" style="border-right: 1px solid #000000;"><a href="${profile_url}"><img src="${profile_image}" width="48"></a></span>
    <span class="span10" style="padding-top: 15px;"><a href="${profile_url}">${name}</a></span>
  </div>
</script>

<span class="btn span11" id="more-see" data-max-id="">もっと見る</span>
