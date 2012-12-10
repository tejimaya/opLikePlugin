<?php
use_helper('opLike');

$data = array();

foreach ($likes as $like)
{
  $member = Doctrine::getTable('Member')->find($like['member_id']);
  $data[] = op_api_like_search($like, $member);
}
$data[] = array('total' => $total, 'requestMemberId' => $requestMemberId);

return array(
  'status' => 'success',
  'data' => $data,
);
