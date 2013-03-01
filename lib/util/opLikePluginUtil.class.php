<?php

class opLikePluginUtil
{
  public static function sendNotification($fromMember, $toMember, $url = null)
  {
    sfApplicationConfiguration::getActive()->loadHelpers(array('I18N'));
    $message = __('%member% says that it is Like.', array('%member%' => $fromMember->getName()));

    opNotificationCenter::notify($fromMember, $toMember, $message, array('category' => 'other', 'url' => $url, 'icon_url' => null));
  }
}

