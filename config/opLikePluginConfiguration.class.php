<?php


class opLikePluginConfiguration extends sfPluginConfiguration
{
  public function initialize()
  {
    $this->dispatcher->connect('op_action.post_execute_diary_delete', array("opLikePluginLikeRemover", "listenToDiaryDelete"));
    
    $this->dispatcher->connect('op_action.post_execute_communityEvent_delete', array("opLikePluginLikeRemover", "listenToCommunityEventDelete"));
    
    $this->dispatcher->connect('op_action.post_execute_communityTopic_delete', array("opLikePluginLikeRemover", "listenToCommunityTopicDelete"));
  }

}
