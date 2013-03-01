<?php

class opLikePluginLikeActions extends sfActions
{
  /**
   * list of contens liked by particular member
   */
  public function executeContentList(sfWebRequest $request)
  {
    $this->member = $this->getUser()->getMember();
    $this->page = $request->getParameter('page', 1);
    $size = 30;

    $this->pager = Doctrine::getTable('Nice')->getContentPager($this->member->getId(), $size, $this->page);
  }
}
