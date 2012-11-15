<?php

class opLikePluginLikeComponents extends sfComponents
{
  public function executeShow($request)
  {
    if(isset($this->diary))
    {
      $this->target = $this->diary;
    }
    elseif(isset($this->communityEvent))
    {
      $this->target = $this->communityEvent;
    }
    elseif(isset($this->communityTopic))
    {
      $this->target = $this->communityTopic;
    }
    
    $this->foreignTable = get_class($this->target);
    $this->foreignId = $this->target->getId();
    
    $this->likedCount = Doctrine::getTable('Nice')->getNicedCount($this->foreignTable, $this->foreignId);
    $this->likedList = Doctrine::getTable('Nice')->getNicedList($this->foreignTable, $this->foreignId, 5);
    
    $this->isMine = $this->target->getMemberId() == $this->getUser()->getMemberId();
    $this->isAlreadyLiked = $this->getUser()->getMemberId()?Doctrine::getTable('Nice')->isAlreadyNiced($this->getUser()->getMemberId(), $this->foreignTable, $this->foreignId):false;
    
    $this->isLikeable = $this->getUser()->getMemberId() > 0 ? (!$this->isMine && !$this->isAlreadyLiked) : false;
    
    if($this->isLikeable)
    {
      //new form
      $this->newForm = new LikeForm();
      $this->newForm->getObject()->getMemberId($this->getUser()->getMemberId());
      $this->newForm->setDefaults(array('foreign_table'=>$this->foreignTable, 'foreign_id'=>$this->foreignId));
    }
    if($this->isAlreadyLiked)
    {
      //for delete
      $this->deleteForm = new BaseForm();
    }
  }
}
