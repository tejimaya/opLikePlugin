<?php

/**
 * This file is part of the OpenPNE package.
 * (c) OpenPNE Project (http://www.openpne.jp/)
 *
 * For the full copyright and license information, please view the LICENSE
 * file and the NOTICE file that were distributed with this source code.
 */

class opLikeEvent
{
  public static function useAssets(sfEvent $event)
  {
    $repuest = sfContext::getInstance()->getRequest();
    $response = sfContext::getInstance()->getResponse();

    if ('pc_frontend' === sfConfig::get('sf_app'))
    {
      if (!$memberInstance instanceof opAnonymousMember)
      {
        if ($repuest->isSmartphone())
        {
          sfContext::getInstance()->getResponse()->addSmtStylesheet('/opLikePlugin/css/like-smartphone.css', '', array());
          sfContext::getInstance()->getResponse()->addSmtJavascript('/opLikePlugin/js/like-smartphone.js', 'last', array());
        }
        else
        {
          $response->addStylesheet('/opLikePlugin/css/like.css');
          $response->addStylesheet('/opLikePlugin/css/bootstrap.css');
          $response->addJavascript('/opLikePlugin/js/like.js', 'last');
          $response->addJavascript('/opLikePlugin/js/bootstrap-modal.js', 'last');
        }
      }
    }
  }
}
