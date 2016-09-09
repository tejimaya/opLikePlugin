<?php


class opLikePluginConfiguration extends sfPluginConfiguration
{
  public function initialize()
  {
    $this->dispatcher->connect('op_action.post_execute', array('opLikeEvent', 'useAssets'));

    $this->dispatcher->connect('op_doctrine.pre_delete_ActivityData', array($this, 'listenToDoctrinePreDelete'));
    $this->dispatcher->connect('op_doctrine.pre_delete_Diary', array($this, 'listenToDoctrinePreDelete'));
    $this->dispatcher->connect('op_doctrine.pre_delete_DiaryComment', array($this, 'listenToDoctrinePreDelete'));
    $this->dispatcher->connect('op_doctrine.pre_delete_CommunityTopic', array($this, 'listenToDoctrinePreDelete'));
    $this->dispatcher->connect('op_doctrine.pre_delete_CommunityTopicComment', array($this, 'listenToDoctrinePreDelete'));
    $this->dispatcher->connect('op_doctrine.pre_delete_CommunityEvent', array($this, 'listenToDoctrinePreDelete'));
    $this->dispatcher->connect('op_doctrine.pre_delete_CommunityEventComment', array($this, 'listenToDoctrinePreDelete'));
  }

  public function listenToDoctrinePreDelete(opDoctrineEvent $event)
  {
    $record = $event->getDoctrineEvent()->getInvoker();
    NiceTable::getInstance()->cascadeForeignRecord($record);
  }
}
