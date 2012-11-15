<div class="parts" id="likedMemberList">
  <div class="partsHeading">
    <h3><?php echo __('Members who liked %name%', array('%name%'=>$name)); ?></h3>
  </div>
  <?php if($pager->getNbResults()>0): ?>
    <?php slot('pagenavi'); ?>
    <?php op_include_pager_navigation($pager, '@liked_member_list?table='.$table.'&id='.$id.'&page=%s'); ?>
    <?php end_slot(); ?>
    <?php include_slot('pagenavi'); ?>
    <ul>
    <?php foreach($pager->getResults() as $like): ?>
      <li><?php echo link_to($like->getMember()->getName(), '@member_profile?id='.$like->getMemberId()); ?></li>
    <?php endforeach; ?>
    </ul>
    <?php include_slot('pagenavi'); ?>
  <?php else: ?>
    <p><?php echo __('No member liked.'); ?></p>
  <?php endif; ?>
</div>
