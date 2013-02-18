<?php


class opLikePluginConfiguration extends sfPluginConfiguration
{
  public function initialize()
  {
    $this->dispatcher->connect('op_action.post_execute', array('opLikeEvent', 'useAssets'));
  }

}
