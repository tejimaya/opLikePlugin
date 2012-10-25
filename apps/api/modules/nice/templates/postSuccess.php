<?php

$data = array();
if (isset($nice))
{
  $data[] = array(
      'id' => $nice['id'],
      'member_id' => $nice['member_id'],
      'foreign_table' => $nice['foreign_table'],
      'foreign_id' => $nice['foreign_id'],
  );
}

return array(
  'status' => 'success',
  'data' => $data,
);
