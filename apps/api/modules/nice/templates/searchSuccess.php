<?php
$data = array();

foreach ($nices as $nice)
{
  $data[] = array(
    'id' => $nice['id'],
    'member_id' => $nice['member_id'],
    'foreign_table' => $nice['foreign_table'],
    'foreign_id' => $nice['foreign_id'],
    'total' => $total,
    'requestMemberId' => $requestMemberId,
  );
}

/*if (isset($nices))
{
  $data[] = array('requestMemberId' => $requestMemberId);
}*/

return array(
  'status' => 'success',
  'data' => $data,
);
