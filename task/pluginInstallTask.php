<?php
$options = getopt('cdt');
if (!isset($options['c']) && !isset($options['d']) && !isset($options['t']))
{
  echo 'options : 
    -c : opCommunityTopicPlugin
    -d : opDiaryPlugin
    -t : opTimelinePlugin'."\n"; 
  exit;
}

$command = array();
if (isset($options['c']))
{
  $command[] = 'cd plugins; git clone git://github.com/ichikawatatsuya/opCommunityTopicPlugin.git; cd opCommunityTopicPlugin; git checkout -b like origin/like';
}

if (isset($options['d']))
{
  $command[] = 'cd plugins; git clone git://github.com/ichikawatatsuya/opDiaryPlugin.git; cd opDiaryPlugin; git checkout -b like origin/like';
}

if (isset($options['t']))
{
  $command[] = 'cd plugins; git clone git://github.com/ichikawatatsuya/opTimelinePlugin.git; cd opTimelinePlugin; git checkout -b like origin/like';
}

foreach($command as $line)
{
  echo `$line`;
}
