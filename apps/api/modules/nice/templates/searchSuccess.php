<?php
use_helper('opNice');

$data = array();

foreach ($nices as $nice)
{
  $data[] = op_api_nice_search($nice, $total, $requestMemberId);
}

return array(
  'status' => 'success',
  'data' => $data,
);
