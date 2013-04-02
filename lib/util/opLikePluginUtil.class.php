<?php

class opLikePluginUtil
{
  public static function sendNotification($fromMember, $toMember, $url = null)
  {
    $message = sfContext::getInstance()->getI18n()->__('%member% says that it is Like.', array('%member%' => $fromMember->getName()));

    opNotificationCenter::notify($fromMember, $toMember, $message, array('category' => 'other', 'url' => $url, 'icon_url' => null));
  }
}

