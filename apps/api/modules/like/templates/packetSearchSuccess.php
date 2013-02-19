<?php
use_helper('opLike');

$dataList = array();

foreach ($likeList as $likes)
{
  $data = array();
  foreach ($likes as $like)
  {
    $member = Doctrine::getTable('Member')->find($like['member_id']);
    $data[] = op_api_like_search($like, $member);
  }
  if (0 < count($likes))
  {
    $total = Doctrine::getTable('Nice')->getNicedCount($likes[0]['foreign_table'], $likes[0]['foreign_id']);
    $data[] = array('total' => $total, 'requestMemberId' => $requestMemberId);
    $dataList[]['data'] = $data;
  }

  unset($data);
}

return array(
  'status' => 'success',
  'data' => $dataList,
);
