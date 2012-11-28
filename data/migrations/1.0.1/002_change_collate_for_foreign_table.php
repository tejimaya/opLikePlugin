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
    $conn->execute('ALTER TABLE nice modify foreign_table char(1) COLLATE utf8_bin');
  }
}

