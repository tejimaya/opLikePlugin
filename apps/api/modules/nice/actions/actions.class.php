<?php
class niceActions extends opJsonApiActions
{
  public function executeSearch(sfWebRequest $request)
  {
    if (isset($request['target']))
    {
      if ('A' === $request['target'])
      {
        $memberId = $this->getUser()->getMemberId();
        $this->forward400Unless($request['target_id'], 'target_id parameter not specified.');
/*
        $query = Doctrine::getTable('Nice')->createQuery()
          ->where('member_id = ? and foreign_table = ? and foreign_id = ?', array($memberId, $request['target'], $request['target_id']));
        $this->nices = $query->execute();

        $total_q = Doctrine::getTable('Nice')->createQuery()
          ->where('foreign_table = ? and foreign_id = ?', array($request['target'], $request['target_id']));
        $this->total = $total_q->count();
        $this->requestMemberId = $memberId;
*/
        $query = Doctrine::getTable('Nice')->createQuery()
          ->where('foreign_table = ? and foreign_id = ?', array($request['target'], $request['target_id']));
        $this->nices = $query->execute();
        $this->total = $query->count();
        $this->requestMemberId = $memberId;
      }
      else
      {
        $this->forward400('target parameter is invalid.');
      }
    }
    else
    {
      $this->forward400('target is invalid.');
    }
  }

  public function executePost(sfWebRequest $request)
  {
    $this->forward400Unless($request['target'], 'foreign_table not specified.');
    $this->forward400Unless($request['target_id'], 'foreign_id not specified.');
    $foreignTable = $request['target'];
    $foreignId = $request['target_id'];

    $memberId = $this->getUser()->getMemberId();

    $query = Doctrine::getTable('Nice')->createQuery()
      ->where('member_id = ? and foreign_table = ? and foreign_id = ?', array($memberId, $foreignTable, $foreignId));

    if (count($query->execute()))
    {
      $this->forward400('It has already been registered');
    }
    else
    {
      $nice = new Nice();
      $nice->setMemberId($memberId);
      $nice->setforeignTable($foreignTable);
      $nice->setforeignId($foreignId);

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

    $query = Doctrine::getTable('Nice')->createQuery()
      ->where('member_id = ? and foreign_table = ? and foreign_id = ?', array($memberId, $request['target'], $request['target_id']));
    $nice = $query->execute();
    
    if (count($nice))
    {
      $con = Doctrine_Manager::connection();
      $this->con = $con->execute('delete from nice where member_id = ? and foreign_table = ? and foreign_id = ?', array($memberId, $foreignTable, $foreignId));
    }
    else
    {
      $this->forward400('There is no data');
    }
    //Doctrineを使ってみたがなぜかmember_idが無視されて削除されたので生SQL発行。調査 TODO
    /*$query = Doctrine::getTable('Nice')->createQuery()
      ->where('member_id = ?', $memberId)
      ->where('foreign_table = "?"', $foreignTable)
      ->where('foreign_id = ?', $foreignId);
      */
  }

  public function executeList(sfWebRequest $request)
  {
    $this->forward400Unless($request['target'], 'foreign_table not specified.');
    $this->forward400Unless($request['target_id'], 'foreign_id not specified.');
    $foreignTable = $request['target'];
    $foreignId = $request['target_id'];

    $nices = Doctrine::getTable('Nice')->createQuery()->select('member_id')
      ->where('foreign_table = ? and foreign_id = ?', array($request['target'], $request['target_id']))
      ->execute();

    foreach ($nices as $nice)
    {
      $memberIds[] = (int)$nice['member_id'];
    }
    $this->members = Doctrine::getTable('Member')->createQuery()->whereIn('id', $memberIds)->execute();
  }
}
