<?php

class opLikePluginLikeActions extends sfActions
{
  public function executeRegist(sfWebRequest $request)
  {
    $this->form = new LikeForm();
    $this->form->getObject()->setMemberId($this->getUser()->getMemberId());
    $this->form->bind($request->getParameter($this->form->getName()));
    if($this->form->isValid())
    {
      $like = $this->form->save();
    }
    else
    {
      $msgs = array();
      if($this->form->hasGlobalErrors())
      {
        foreach($this->form->getGlobalErrors() as $err)
        {
          $msgs[] = (string)$err;
        }
      }
      $this->getUser()->setFlash('error', implode("\n", $msgs));
    }
    $this->redirect( isset($like) ? $like->getForeignUrl() : '@homepage');
  }

  public function executeDelete(sfWebRequest $request)
  {
    $request->checkCSRFProtection();

    $this->like = $this->getRoute()->getObject();
    $this->forward404Unless($this->like->isDeletable($this->getUser()->getMemberId()));

    $url = $this->like->getForeignUrl();

    $this->like->delete();
 
    $this->redirect($url);
  }

  /**
   * list of members who liked to particular content
   */
  public function executeMemberList(sfWebRequest $request)
  {
    $this->forwardIf($request->isSmartphone(), 'like', 'smtMemberList');
    $this->forward('default', 'error');
  }

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
