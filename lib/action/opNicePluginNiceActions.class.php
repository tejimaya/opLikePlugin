<?php

class opNicePluginNiceActions extends sfActions
{
  public function executeRegist(sfWebRequest $request)
  {
    $this->form = new NiceForm();
    $this->form->getObject()->setMemberId($this->getUser()->getMemberId());
    $this->form->bind($request->getParameter($this->form->getName()));
    if($this->form->isValid())
    {
      $nice = $this->form->save();
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
    $this->redirect( isset($nice) ? $nice->getForeignUrl() : '@homepage');
  }

  public function executeDelete(sfWebRequest $request)
  {
    $request->checkCSRFProtection();

    $this->nice = $this->getRoute()->getObject();
    $this->forward404Unless($this->nice->isDeletable($this->getUser()->getMemberId()));

    $url = $this->nice->getForeignUrl();

    $this->nice->delete();
 
    $this->redirect($url);
  }

  /**
   * list of members who niced to particular content
   */
  public function executeMemberList(sfWebRequest $request)
  {
    $this->forwardIf($request->isSmartphone(), 'nice', 'smtMemberList');
    $this->forward('default', 'error');
  }

  /**
   * list of contens niced by particular member
   */
  public function executeContentList(sfWebRequest $request)
  {
    $this->member = $this->getUser()->getMember();
    $this->page = $request->getParameter('page', 1);
    $size = 30;

    $this->pager = Doctrine::getTable('Nice')->getContentPager($this->member->getId(), $size, $this->page);
  }
}
