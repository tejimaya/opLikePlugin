<?php

/**
 * @package    opLikePlugin
 * @subpackage migration
 * @author     Kaoru Nishizoe <nishizoe@tejimaya.com>
 */
class opLikePluginMigrationVersion4 extends opMigration
{
  /*
   * 下記の条件に一致する通知URLを一括で変更:
   *   * url に '/timeline/', '/diary/', '/communityEvent/', '/communityTopic/' が含まれ、
   *     且つ、これらの前に'/'で始まる何らかの文字列が含まれているもの
   */
  public function postUp()
  {
    $notificationObject = Doctrine::getTable('MemberConfig')
      ->findByName('notification_center');

    if ($notificationObject)
    {
      foreach ($notificationObject as $object)
      {
        $notifications = unserialize($object->getValue());

        $newNotifications = array();
        foreach ($notifications as $notificationItem)
        {
          $url = $notificationItem['url'];
          if ($url)
          {
            preg_match('/(\/timeline\/show\/id|\/diary|\/communityEvent|\/communityTopic)\/[0-9]+/', $url, $m);
            $url = $m[0];
            $notificationItem['url'] = $url;
          }
          array_push($newNotifications, $notificationItem);
        }

        $object->setValue(serialize($newNotifications));
        $object->save();
        $object->free(true);
      }
    }

  }
}
