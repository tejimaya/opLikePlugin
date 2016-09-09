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

  public function generateForeignHash($foreignTable, $foreignId)
  {
    return md5($foreignTable.','.$foreignId);
  }

  public function getNicedList($tableChar, $id, $limit = 0)
  {
    $q = $this->createQuery()
      ->where('foreign_hash = ?', $this->generateForeignHash($tableChar, $id))
      ->orderBy('id DESC');

    if (0 < $limit)
    {
      $q->limit($limit);
    }

    return $q->execute();
  }

  public function getNicedCount($tableChar, $id)
  {
    return $this->createQuery()
      ->where('foreign_hash = ?', $this->generateForeignHash($tableChar, $id))
      ->count();
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
    $hashes = array();
    foreach ($dataList as $data)
    {
      $hashes[] = $this->generateForeignHash($data['target'], $data['likeId']);
    }

    $results = $this->createQuery()
      ->select('id')
      ->addSelect('foreign_table')
      ->addSelect('foreign_id')
      ->addSelect('foreign_hash')
      ->addSelect('member_id')
      ->whereIn('foreign_hash', $hashes)
      ->orderBy('id DESC')
      ->execute(array(), Doctrine_Core::HYDRATE_NONE);

    $list = array();
    $members = array();
    foreach ($results as $result)
    {
      list($id, $foreignTable, $foreignId, $foreignHash, $memberId) = $result;

      if (!isset($members[$memberId]))
      {
        $members[$memberId] = Doctrine_Core::getTable('Member')->find($memberId);
      }

      $list[$foreignHash][] = array(
        'id' => $id,
        'foreign_table' => $foreignTable,
        'foreign_id' => $foreignId,
        'member' => $members[$memberId],
      );
    }

    // update sort order by argments array.
    $likeList = array();
    foreach ($hashes as $hash)
    {
      if (isset($list[$hash]))
      {
        $likeList[] = $list[$hash];
      }
    }

    return $likeList;
  }

  public function cascadeForeignRecord(Doctrine_Record $record)
  {
    $conn = $this->getConnection();

    if ($record instanceof ActivityData)
    {
      $query = <<<'SQL'
DELETE n FROM nice n
 WHERE n.foreign_table = "A" AND n.foreign_id = :activity_data_id
SQL;
      $conn->execute($query, array('activity_data_id' => $record->id));
    }
    elseif ($record instanceof Diary)
    {
      $query = <<<'SQL'
DELETE n FROM nice n
 WHERE n.foreign_table = "D" AND n.foreign_id = :diary_id
SQL;
      $conn->execute($query, array('diary_id' => $record->id));

      $query = <<<'SQL'
DELETE n FROM nice n
 INNER JOIN diary_comment dc ON n.foreign_table = "d" AND n.foreign_id = dc.id
 WHERE dc.diary_id = :diary_id
SQL;
      $conn->execute($query, array('diary_id' => $record->id));
    }
    elseif ($record instanceof DiaryComment)
    {
      $query = <<<'SQL'
DELETE n FROM nice n
 WHERE n.foreign_table = "d" AND n.foreign_id = :diary_comment_id
SQL;
      $conn->execute($query, array('diary_comment_id' => $record->id));
    }
    elseif ($record instanceof CommunityTopic)
    {
      $query = <<<'SQL'
DELETE n FROM nice n
 INNER JOIN community_topic_comment tc ON n.foreign_table = "t" AND n.foreign_id = tc.id
 WHERE tc.community_topic_id = :community_topic_id
SQL;
      $conn->execute($query, array('community_topic_id' => $record->id));
    }
    elseif ($record instanceof CommunityTopicComment)
    {
      $query = <<<'SQL'
DELETE n FROM nice n
 WHERE n.foreign_table = "t" AND n.foreign_id = :community_topic_comment_id
SQL;
      $conn->execute($query, array('community_topic_comment_id' => $record->id));
    }
    elseif ($record instanceof CommunityEvent)
    {
      $query = <<<'SQL'
DELETE n FROM nice n
 INNER JOIN community_event_comment ec ON n.foreign_table = "e" AND n.foreign_id = ec.id
 WHERE ec.community_event_id = :community_event_id
SQL;
      $conn->execute($query, array('community_event_id' => $record->id));
    }
    elseif ($record instanceof CommunityEventComment)
    {
      $query = <<<'SQL'
DELETE n FROM nice n
 WHERE n.foreign_table = "e" AND n.foreign_id = :community_event_comment_id
SQL;
      $conn->execute($query, array('community_event_comment_id' => $record->id));
    }
  }
}
