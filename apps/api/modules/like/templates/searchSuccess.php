<?php
use_helper('opLike');

$data = array();

foreach ($likes as $like)
{
  $data[] = op_api_like_search($like, $total, $requestMemberId);
}

return array(
  'status' => 'success',
  'data' => $data,
);
