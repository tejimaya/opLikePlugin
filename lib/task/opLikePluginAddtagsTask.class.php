<?php

/**
 * This file is part of the OpenPNE package.
 * (c) OpenPNE Project (http://www.openpne.jp/)
 *
 * For the full copyright and license information, please view the LICENSE
 * file and the NOTICE file that were distributed with this source code.
 */

/**
 * opLikePluginAddtagsTask
 *
 * @package    opLikePlugin
 * @subpackage task
 * @author     tatsuya ichikawa <ichikawa@tejimaya.com>
 */

class opLikePluginAddtagsTask extends sfBaseTask
{
  protected function configure()
  {
    $this->namespace        = 'opLikePlugin';
    $this->name             = 'addtags';
    $this->briefDescription = 'Addtags Command for "opLikePlugin".';

    $this->detailedDescription = <<<EOF
Use this command to addtags "opLikePlugin".
EOF;
  }

  protected function execute($arguments = array(), $options = array())
  {
    $pluginPath = sfConfig::get('sf_plugins_dir').'/';
    $file = $pluginPath.'opLikePlugin/addtags.lock';
    $targetPlugins = array(
      'opTimelinePlugin' => $pluginPath.'opLikePlugin/lib/task/opTimelinePlugin.sh',
      'opDiaryPlugin' => $pluginPath.'opLikePlugin/lib/task/opDiaryPlugin.sh',
      'opCommunityTopicPlugin' => $pluginPath.'opLikePlugin/lib/task/opCommunityTopicPlugin.sh'
    );

    foreach ($targetPlugins as $key => $value)
    {
      chmod($value, 0755);
    }

    $isReverse = false;
    if (!file_exists($file))
    {
      touch($file);
      chmod($file, 0666);

      $this->logSection('opLikePlugin', 'パッチを実行します。');
    }
    else
    {
      unlink($file);

      $isReverse = true;
      $this->logSection('opLikePlugin', 'リバースパッチを実行します。');
      foreach ($targetPlugins as $key => $value)
      {
        $targetPlugins[$key] .= ' -R';
      }
    }

    $dirList = array();
    $fileList = scandir($pluginPath);
    foreach($fileList as $value)
    {
      if (is_dir($pluginPath.$value) && isset($targetPlugins[$value]))
      {
        exec($targetPlugins[$value].' --dry-run', $tempOutput, $execResult);
        if (0 === $execResult)
        {
          exec($targetPlugins[$value], $shOutput);
          foreach ($shOutput as $output)
          {
            echo $output."\n";
          }
        }
        else
        {
          $this->logSection('opLikePlugin', 'パッチの適用に失敗しました。');
        }
      }
    }

    $code = $this->patchDiaryPluginSmt($isReverse);

    // execute ./symfomy cc
    $sfCacheClearTask = new sfCacheClearTask($this->dispatcher, $this->formatter);
    $sfCacheClearTask->run($arguments = array(), $options = array('type' => 'all'));

    return $code;
  }

  protected function patchDiaryPluginSmt($isReverse = false)
  {
    $code = 0;
    $diaryPlugin = opPlugin::getInstance('opDiaryPlugin', $this->dispatcher);
    // for smartphone version.
    if (version_compare($diaryPlugin->getVersion(), '1.5.0', '>='))
    {
      $this->logSection('opLikePlugin', 'スマートフォン対応の opDiaryPlugin にスマートフォン向けパッチを適用します。');

      $patchFile = 'opDiaryPlugin-smt.patch';
      $code = $this->cmdExecute($this->buildCmd($diaryPlugin->getName(), $patchFile, $isReverse, true));

      if ($code !== 0)
      {
        $this->logSection('opLikePlugin', 'スマートフォン対応の opDiaryPlugin にスマートフォン向けパッチの適用に失敗しました。');

        return $code;
      }

      $code = $this->cmdExecute($this->buildCmd($diaryPlugin->getName(), $patchFile, $isReverse));
    }

    return $code;
  }

  protected function buildCmd($pluginName, $patchFile, $isReverse = false, $isDryRun = false)
  {
    $pluginPath = sfConfig::get('sf_plugins_dir');

    return sprintf('cd %s; patch -p0 %s %s < %s',
      escapeshellarg(realpath($pluginPath.'/'.$pluginName)), // cd to dir.
      $isReverse ? '-R' : '',
      $isDryRun ? '--dry-run' : '',
      escapeshellarg(realpath($pluginPath.'/opLikePlugin/data/patches/'.$patchFile))
    );
  }

  public function cmdExecute($cmd)
  {
    try
    {
      $filesystem = $this->getFilesystem();
      $filesystem->execute($cmd, array($this, 'outputMessage'), array($this, 'outputMessage'));
    }
    catch (Exception $e)
    {
      $this->outputMessage($e->getMessage());

      return $e->getCode();
    }

    return 0;
  }

  public function outputMessage($output)
  {
    echo $output;
  }
}
