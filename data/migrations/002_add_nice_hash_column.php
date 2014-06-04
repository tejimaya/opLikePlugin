<?php

class opLikePluginMigrationVersion2 extends opMigration
{
  public function migrate($direction)
  {
    $conn = $this->getConnection();
    $import = $conn->import;
    if (!$import->tableColumnExists('foreign_hash', 'nice'))
    {
      $conn->execute('ALTER TABLE nice ADD COLUMN foreign_hash VARCHAR(32) NOT NULL AFTER foreign_id');
    }

    $indexes = $import->listTableIndexes('nice');
    if (!in_array('foreign_hash_id_idx', $indexes))
    {
      $definition = array('fields' => array('foreign_hash', 'id'));
      $this->index($direction, 'nice', 'foreign_hash_id_idx', $definition);
    }
  }

  public function postUp()
  {
    Doctrine_Query::create()
      ->update('nice')
      ->set('foreign_hash', new Doctrine_Expression('MD5(CONCAT(`foreign_table`, ",", `foreign_id`))'))
      ->execute();
  }
}
