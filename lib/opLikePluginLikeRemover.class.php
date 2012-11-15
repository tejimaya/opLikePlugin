<?php

class opLikePluginLikeRemover
{
  public static function listenToDiaryDelete($args)
  {
    $obj = $args['actionInstance']->getVar("diary");
    self::removeLikes($obj);
  }
  
  public static function listenToCommunityEventDelete($args)
  {
    $obj = $args['actionInstance']->getVar("communityEvent");
    self::removeLikes($obj);
  }
  
  public static function listenToCommunityTopicDelete($args)
  {
    $obj = $args['actionInstance']->getVar("communityTopic");
    self::removeLikes($obj);
  }
  
  private function removeLikes($obj)
  {
    foreach(Doctrine::getTable('Nice')->getNicedList(get_class($obj), $obj->getId()) as $like)
    {
      $like->delete();
    }
  }
}
