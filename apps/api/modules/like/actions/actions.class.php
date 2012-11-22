<?php

/**
 * This file is part of the OpenPNE package.
 * (c) OpenPNE Project (http://www.openpne.jp/)
 *
 * For the full copyright and license information, please view the LICENSE
 * file and the NOTICE file that were distributed with this source code.
 */

/**
 * opLikePlugin actions.
 *
 * @package    OpenPNE
 * @subpackage opLikePlugin
 * @author     tatsuya ichikawa <ichikawa@tejimaya.com>
 */


class likeActions extends opJsonApiActions
{
  public function executeSearch(sfWebRequest $request)
  {
    $memberId = $this->getUser()->getMemberId();

    $this->forward400Unless($request['target'], 'foreign_table not specified.');
    $this->forward400Unless($request['target_id'], 'foreign_id not specified.');
    $foreignTable = $request['target'];
    $foreignId = $request['target_id'];

    if ('A' === $foreignTable)
    {
      $this->likes = Doctrine::getTable('Nice')->getNicedList($foreignTable, $foreignId);
      $this->total = Doctrine::getTable('Nice')->getNicedCount($foreignTable, $foreignId);

      $this->requestMemberId = $memberId;
    }
    else
    {
      $this->forward400('Table does not exist');
    }
  }

  public function executePost(sfWebRequest $request)
  {
    $this->forward400Unless($request['target'], 'foreign_table not specified.');
    $this->forward400Unless($request['target_id'], 'foreign_id not specified.');
    $this->forward400Unless($request['member_id'], 'member_id not specified.');
    $foreignTable = $request['target'];
    $foreignId = $request['target_id'];
    $requestMemberId = $request['member_id'];

    if (1 < strlen($foreignTable)) $this->forward400('Is at least one character');

    $memberId = $this->getUser()->getMemberId();

    if ($memberId == $requestMemberId)
    {
      $this->forward400('I can not be myself like');
    }

    $like = Doctrine::getTable('Nice')->isAlreadyNiced($memberId, $foreignTable, $foreignId);

    $this->forward400Unless(!$like, 'It has already been registered');

    $like = new Nice();
    $like->setMemberId($memberId);
    $like->setForeignTable($foreignTable);
    $like->setForeignId($foreignId);

    $like->save();
    $this->like = $like;
  }

  public function executeDelete(sfWebRequest $request)
  {
    $this->forward400Unless($request['target'], 'foreign_table not specified.');
    $this->forward400Unless($request['target_id'], 'foreign_id not specified.');
    $foreignTable = $request['target'];
    $foreignId = $request['target_id'];

    $memberId = $this->getUser()->getMemberId();

    $like = Doctrine::getTable('Nice')->getAlreadyNiced($memberId, $foreignTable, $foreignId);
    $this->like = $like->delete()->execute();

    if ($this->like < 1)
    {
      $this->forward400('There is no data');
    }
  }

  public function executeList(sfWebRequest $request)
  {
    $memberId = $this->getUser()->getMemberId();

    $this->forward400Unless($request['target'], 'foreign_table not specified.');
    $this->forward400Unless($request['target_id'], 'foreign_id not specified.');
    $foreignTable = $request['target'];
    $foreignId = $request['target_id'];

    $maxId = null;
    if (isset($request['max_id']))
    {
      is_numeric($request['max_id']) ? $maxId = $request['max_id'] : $this->forward400('max_id is not a number');
    }

    $this->members = Doctrine::getTable('Nice')->getNiceMemberList($foreignTable, $foreignId, $maxId);
  }
}
