<?php
use_helper('opLike');

$dataList = array();
$members = array();

foreach ($likeList as $likes)
{
  $data = array();
  foreach ($likes as $like)
  {
    $member = $like['member'];
    if (!isset($members[$member->id]))
    {
      $members[$member->id] = op_api_member($member);
    }
    $data[] = op_api_like_search($like, $members[$member->id], false);
  }
  if (0 < count($likes))
  {
    $data[] = array('total' => count($likes), 'requestMemberId' => $requestMemberId);
    $dataList[]['data'] = $data;
  }
}

return array(
  'status' => 'success',
  'data' => $dataList,
);
