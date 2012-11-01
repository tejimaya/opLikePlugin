<?php

/**
 * This file is part of the OpenPNE package.
 * (c) OpenPNE Project (http://www.openpne.jp/)
 *
 * For the full copyright and license information, please view the LICENSE
 * file and the NOTICE file that were distributed with this source code.
 */
/**
 * opActivity provides helper function for Activity
 *
 * @package    OpenPNE
 * @subpackage NicePlugin
 * @author     tatsuya ichikawa <ichikawa@tejimaya.com>
 */

function op_api_member_info($member)
{
  return op_api_member($member);
}

function op_api_nice_search($nice, $total, $requestMemberId)
{
  return array(
    'id'              => $nice['id'],
    'member_id'       => $nice['member_id'],
    'foreign_table'   => $nice['foreign_table'],
    'foreign_id'      => $nice['foreign_id'],
    'total'           => $total,
    'requestMemberId' => $requestMemberId,
  );
}

function op_api_nice_post($nice)
{
  return array('id' => $nice['id'],
    'member_id' => $nice['member_id'],
    'foreign_table' => $nice['foreign_table'],
    'foreign_id' => $nice['foreign_id'],
  );
}
