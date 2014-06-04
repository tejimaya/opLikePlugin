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
 * @subpackage LikePlugin
 * @author     tatsuya ichikawa <ichikawa@tejimaya.com>
 */

function op_api_member_info($member)
{
  return op_api_member($member);
}

function op_api_like_search($like, $member, $useExternalHelper = true)
{
  return array(
    'id'              => $like['id'],
    'member'          => $useExternalHelper ? op_api_member_info($member) : $member,
    'foreign_table'   => $like['foreign_table'],
    'foreign_id'      => $like['foreign_id'],
  );
}

function op_api_like_post($like)
{
  return array('id' => $like['id'],
    'member_id' => $like['member_id'],
    'foreign_table' => $like['foreign_table'],
    'foreign_id' => $like['foreign_id'],
  );
}
