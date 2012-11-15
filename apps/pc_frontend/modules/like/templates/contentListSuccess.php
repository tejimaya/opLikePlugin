<div class="parts" id="likeContentList">
  <div class="partsHeading">
    <h3><?php echo __('%member% liked these.', array('%member%'=>$member->getName())); ?></h3>
  </div>
  <?php if($pager->getNbResults()>0): ?>
    <?php slot('pagenavi'); ?>
    <?php op_include_pager_navigation($pager, '@like_my_list?page=%s'); ?>
    <?php end_slot(); ?>
    <?php include_slot('pagenavi'); ?>
    <ul>
    <?php foreach($pager->getResults() as $like): ?>
      <li><?php echo link_to($like->getForeignTitle(), $like->getForeignUrl()); ?></li>
    <?php endforeach; ?>
    </ul>
    <?php include_slot('pagenavi'); ?>
  <?php else: ?>
    <p><?php echo __('No content.'); ?></p>
  <?php endif; ?>
</div>
