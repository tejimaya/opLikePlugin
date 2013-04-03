<?php

/**
 * This file is part of the OpenPNE package.
 * (c) OpenPNE Project (http://www.openpne.jp/)
 *
 * For the full copyright and license information, please view the LICENSE
 * file and the NOTICE file that were distributed with this source code.
 */

/**
 * like actions.
 *
 * @package    OpenPNE
 * @subpackage like
 * @author     H. Hishida<info@77-web.com>
 * @author     tatsuya ichikawa <ichikawa@tejimaya.com>
 * @version    SVN: $Id: actions.class.php 9301 2008-05-27 01:08:46Z dwhittle $
 */
class likeActions extends sfActions
{
  public function executeMemberList(sfWebRequest $request)
  {
    $this->forwardIf($request->isSmartphone(), 'like', 'smtMemberList');
    $this->forward('default', 'error');
  }

  public function executeSmtMemberList(sfWebRequest $request)
  {
  }
}
