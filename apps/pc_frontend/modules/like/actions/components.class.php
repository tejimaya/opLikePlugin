<?php

/**
 * This file is part of the OpenPNE package.
 * (c) OpenPNE Project (http://www.openpne.jp/)
 *
 * For the full copyright and license information, please view the LICENSE
 * file and the NOTICE file that were distributed with this source code.
 */

/**
 * like actions.
 *
 * @package    OpenPNE
 * @subpackage like
 * @author     H. Hishida<info@77-web.com>
 */
class likeComponents extends opLikePluginLikeComponents
{
  public function executeShow($request)
  {
    parent::executeShow($request);
    
    $this->getResponse()->addStylesheet('/opLikePlugin/css/like.css');
  }
}
