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

  public function executeLikeAll(sfWebRequest $request)
  {
    $this->getResponse()->addStylesheet('/opLikePlugin/css/like.css');
    $this->getResponse()->addjavascript('/opLikePlugin/js/like.js', 'last');
  }

  public function executeLikeCommunity(sfWebRequest $request)
  {
    $this->getResponse()->addStylesheet('/opLikePlugin/css/like.css');
    $this->getResponse()->addjavascript('/opLikePlugin/js/like.js', 'last');
  }

  public function executeSmtLikeCommunity(sfWebRequest $request)
  {
  }

  public function executeLikeDiary(sfWebRequest $request)
  {
    $this->getResponse()->addStylesheet('/opLikePlugin/css/like.css');
    $this->getResponse()->addStylesheet('/opLikePlugin/css/bootstrap.css', 'last');
    $this->getResponse()->addjavascript('/opLikePlugin/js/like.js', 'last');
  }
}
