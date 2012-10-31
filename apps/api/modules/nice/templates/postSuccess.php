<?php
use_helper('opNice');

$data = array();
if (isset($nice))
{
  $data = op_api_nice_post($nice);
}

return array(
  'status' => 'success',
  'data' => $data,
);
