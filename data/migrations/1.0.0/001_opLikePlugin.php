<?php

/**
 * This file is part of the OpenPNE package.
 * (c) OpenPNE Project (http://www.openpne.jp/)
 *
 * For the full copyright and license information, please view the LICENSE
 * file and the NOTICE file that were distributed with this source code.
 */

class Revision1_OpLikePlugin extends Doctrine_Migration_Base
{
  public function up()
  {
    // create table
    $conn = Doctrine_Manager::connection();

    // nice create table
    $conn->export->createTable('nice', array(
          'id' => array('type' => 'integer', 'primary' => true, 'autoincrement' => true),
          'member_id' => array('type' => 'integer', 'notnull' => true),
          'foreign_table' => array('type' => 'char', 'notnull' => true),
          'foreign_id' => array('type' => 'integer', 'notnull' => true),
    ));

    $conn->export->createIndex('nice', 'id_number', array(
          'fields' => array('member_id', 'foreign_table', 'foreign_id'),
          'type'   => 'unique',
    ));
  }
}

