<?php if($isLikeable): ?>

<form action="<?php echo url_for('@like_regist'); ?>" method="post" id="LikeForm">
<?php echo $newForm; ?>
<input type="submit" value="<?php echo __('Like!'); ?>" />
</form>



<?php else: ?>

<?php echo __('Like!'); ?>

<?php endif; ?>

<?php if($likedCount>0): ?>
  (<?php echo link_to($likedCount, '@liked_member_list?table='.$foreignTable.'&id='.$foreignId); ?>)
  <?php foreach($likedList as $like): ?>
    <?php echo link_to($like->getMember()->getName(), '@member_profile?id='.$like->getMemberId()); ?><?php if($like->isDeletable($sf_user->getMemberId())): ?>(<form action="<?php echo url_for('@like_delete?id='.$like->getId()); ?>" method="post" class="LikeDeleteForm"><?php echo $deleteForm; ?><input type="submit" value="<?php echo __('Delete Like!'); ?>" /></form>)<?php endif; ?>&nbsp;
  <?php endforeach; ?>
<?php endif; ?>
