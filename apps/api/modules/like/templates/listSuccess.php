<?php
use_helper('opLike');
$data = array();

foreach ($members as $member)
{
  $data[] = op_api_member_info($member);
}

return array(
  'status' => 'success',
  'data' => $data,
);
