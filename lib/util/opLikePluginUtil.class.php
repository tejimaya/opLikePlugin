<?php

class opLikePluginUtil
{
  public static function sendNotification($fromMember, $toMember, $url = null)
  {
    sfApplicationConfiguration::getActive()->loadHelpers(array('I18N'));
    $message = __('%member% says that it is Like.', array('%member%' => $fromMember->getName()));

    opNotificationCenter::notify($fromMember, $toMember, $message, array('category' => 'other', 'url' => $url, 'icon_url' => null));
  }

  public static function deleteNotification($member)
  {
    if (is_null($member))
    {   
      $member = sfContext::getInstance()->getUser()->getMember();
    }   

    $notificationObject = Doctrine::getTable('MemberConfig')
      ->findOneByMemberIdAndName($member->getId(), 'notification_center');

    if (!$notificationObject)
    {   
      $notifications = array();
    }   
    else
    {   
      $notifications = unserialize($notificationObject->getValue());
      $notificationObject->free(true);
    }   

    return $notifications;
  }
}

