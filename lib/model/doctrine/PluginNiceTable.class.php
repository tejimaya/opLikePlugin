<?php

/**
 * PluginNiceTable
 *
 * @package    opNicePlugin
 * @subpackage lib
 * @author     Hiromi Hishida<info@77-web.com>
 * @author     tatsuya ichikawa <ichikawa@tejimaya.com>
 * @version    0.1
 */
class PluginNiceTable extends Doctrine_Table
{
  /**
   * Returns an instance of this class.
   *
   * @return object PluginNiceTable
   */
  public static function getInstance()
  {
    return Doctrine_Core::getTable('PluginNice');
  }

  public function getNicedList($tableChar, $id, $limit = 0)
  {
    $q = $this->createQuery('n')->where('foreign_table = binary ? AND foreign_id = ?', array($tableChar, $id))->orderBy('id DESC');

    if (0 < $limit)
    {
      $q->limit($limit);
    }

    return $q->execute();
  }

  public function getNicedCount($tableChar, $id)
  {
    return $this->createQuery('n')->where('foreign_table = binary ? AND foreign_id = ?', array($tableChar, $id))->count();
  }

  public function isAlreadyNiced($memberId, $tableChar, $id)
  {
    return $this->getAlreadyNiced($memberId, $tableChar, $id)->count()>0;
  }

  public function getAlreadyNiced($memberId, $tableChar, $id)
  {
    return $this->createQuery('n')
                ->addWhere('member_id = ?', $memberId)
                ->andWhere('foreign_table = binary ?', $tableChar)
                ->andWhere('foreign_id = ?', $id);
  }

  public function getNiceMemberList($tableChar, $id, $maxId = null)
  {
    if (is_null($maxId))
    {
      $maxId = 20;
    }
    $nices = $this->getNicedList($tableChar, $id, $maxId);

    foreach ($nices as $nice)
    {
      $memberIds[] = (int)$nice['member_id'];
    }
    return Doctrine::getTable('Member')->createQuery()->whereIn('id', $memberIds)->execute();
  }

  public function getPacketNiceMemberList($dataList)
  {
    $nices = array();

    foreach ($dataList as $data)
    {
      $nices[] = $this->getNicedList($data['target'], $data['likeId']);
    }

    return $nices;
  }
}
