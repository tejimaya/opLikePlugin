<?php
/**
 * This file is part of the OpenPNE package.
 * (c) OpenPNE Project (http://www.openpne.jp/)
 *
 * For the full copyright and license information, please view the LICENSE
 * file and the NOTICE file that were distributed with this source code.
 */

class Revision2_OpLikePlugin extends Doctrine_Migration_Base
{
  public function up()
  {
    $conn = Doctrine_Manager::connection();
    $export->alterTable('nice', array(
      'change' => array(
        'foreign_table' => array(
          'definition' => array(
            'type' => 'char',
            'length'  => 1,
            'notnull' => false,
            'collate' => 'utf8-bin'
          )
        )
      )
    ));
  }
}

