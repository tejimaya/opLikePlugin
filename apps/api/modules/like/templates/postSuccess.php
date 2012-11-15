<?php
use_helper('opLike');

$data = array();
if (isset($like))
{
  $data = op_api_like_post($like);
}

return array(
  'status' => 'success',
  'data' => $data,
);
