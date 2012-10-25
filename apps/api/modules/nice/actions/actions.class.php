<?php
class niceActions extends opJsonApiActions
{
  public function executeSearch(sfWebRequest $request)
  {
    $this->forward400Unless($request['target'], 'foreign_table not specified.');
    $this->forward400Unless($request['target_id'], 'foreign_id not specified.');
    $foreignTable = $request['target'];
    $foreignId = $request['target_id'];

    if ('A' === $foreignTable)
    {
      $memberId = $this->getUser()->getMemberId();

      $this->nices = Doctrine::getTable('Nice')->getNicedList($foreignTable, $foreignId);
      $this->total = Doctrine::getTable('Nice')->getNicedCount($foreignTable, $foreignId);

      $this->requestMemberId = $memberId;
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

    $memberId = $this->getUser()->getMemberId();

    if ($memberId == $requestMemberId)
    {
      $this->forward400('I can not be myself nice');
    }

    $nice = Doctrine::getTable('Nice')->isAlreadyNiced($memberId, $foreignTable, $foreignId);

    if (0 < $nice)
    {
      $this->forward400('It has already been registered');
    }
    else
    {
      $nice = new Nice();
      $nice->setMemberId($memberId);
      $nice->setForeignTable($foreignTable);
      $nice->setForeignId($foreignId);

      $nice->save();
      $this->nice = $nice;
    }
  }

  public function executeDelete(sfWebRequest $request)
  {
    $this->forward400Unless($request['target'], 'foreign_table not specified.');
    $this->forward400Unless($request['target_id'], 'foreign_id not specified.');
    $foreignTable = $request['target'];
    $foreignId = $request['target_id'];

    $memberId = $this->getUser()->getMemberId();

    $nice = Doctrine::getTable('Nice')->isAlreadyNiced($memberId, $foreignTable, $foreignId);
    
    if (count($nice))
    {
      $con = Doctrine_Manager::connection();
      $this->con = $con->execute('delete from nice where member_id = ? and foreign_table = ? and foreign_id = ?', array($memberId, $foreignTable, $foreignId));
    }
    else
    {
      $this->forward400('There is no data');
    }
  }

  public function executeList(sfWebRequest $request)
  {
    $this->forward400Unless($request['target'], 'foreign_table not specified.');
    $this->forward400Unless($request['target_id'], 'foreign_id not specified.');
    $foreignTable = $request['target'];
    $foreignId = $request['target_id'];

    $this->members = Doctrine::getTable('Nice')->getNiceMemberList($foreignTable, $foreignId);
  }
}
