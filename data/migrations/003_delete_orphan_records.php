<?php

/**
 * @package    opLikePlugin
 * @subpackage migration
 * @author     Kimura Youichi <yoichi.kimura@tejimaya.com>
 */
class opLikePluginMigrationVersion3 extends opMigration
{
  public function postUp()
  {
    // nice.foreign_id に対応するレコードが存在しないものを一括で削除
    $query = <<<'SQL'
DELETE n FROM nice n
 LEFT JOIN activity_data ad ON n.foreign_table = "A" AND n.foreign_id = ad.id
 LEFT JOIN diary d ON n.foreign_table = "D" AND n.foreign_id = d.id
 LEFT JOIN diary_comment dc ON n.foreign_table = "d" AND n.foreign_id = dc.id
 LEFT JOIN community_topic_comment tc ON n.foreign_table = "t" AND n.foreign_id = tc.id
 LEFT JOIN community_event_comment ec ON n.foreign_table = "e" AND n.foreign_id = ec.id
 WHERE COALESCE(ad.id, d.id, dc.id, tc.id, ec.id) IS NULL
SQL;

    $this->getConnection()->execute($query);
  }
}
