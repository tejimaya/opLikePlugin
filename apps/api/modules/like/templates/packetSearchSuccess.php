<?php
use_helper('opLike');

$dataList = array();

foreach ($likeList as $likes)
{
  $data = array();
  foreach ($likes as $like)
  {
    $data[] = op_api_like_search($like, $like['member']);
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
