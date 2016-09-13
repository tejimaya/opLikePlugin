<?php

require_once __DIR__.'/../../bootstrap/unit.php';
require_once __DIR__.'/../../bootstrap/database.php';
sfContext::createInstance($configuration);

$t = new lime_test(9);

$testcases = array();

$testcases[] = function($t)
{
  $t->diag('opLikePluginConfiguration::listenToDoctrinePreDelete() [ActivityData]');

  $activity = Doctrine_Core::getTable('ActivityData')->create(array(
    'member_id' => 1,
    'body' => 'tetete',
  ));
  $activity->save();

  $nice = NiceTable::getInstance()->create(array(
    'member_id' => 2,
    'foreign_table' => 'A',
    'foreign_id' => $activity->id,
  ));
  $nice->save();

  $activity->delete();

  $t->ok(!NiceTable::getInstance()->find($nice->id));
};

$testcases[] = function($t)
{
  $t->diag('opLikePluginConfiguration::listenToDoctrinePreDelete() [Diary]');

  if (!class_exists('Diary'))
  {
    $t->skip(2);
    return;
  }

  $diary = Doctrine_Core::getTable('Diary')->create(array(
    'member_id' => 1,
    'title' => 'hogehoge',
    'body' => 'tetete',
  ));
  $diary->save();

  $diaryComment = Doctrine_Core::getTable('DiaryComment')->create(array(
    'diary_id' => $diary->id,
    'member_id' => 1,
    'body' => 'tetete',
  ));
  $diaryComment->save();

  $niceDiary = NiceTable::getInstance()->create(array(
    'member_id' => 2,
    'foreign_table' => 'D',
    'foreign_id' => $diary->id,
  ));
  $niceDiary->save();

  $niceDiaryComment = NiceTable::getInstance()->create(array(
    'member_id' => 2,
    'foreign_table' => 'd',
    'foreign_id' => $diaryComment->id,
  ));
  $niceDiaryComment->save();

  $diary->delete();

  $t->ok(!NiceTable::getInstance()->find($niceDiary->id));
  $t->ok(!NiceTable::getInstance()->find($niceDiaryComment->id));
};

$testcases[] = function($t)
{
  $t->diag('opLikePluginConfiguration::listenToDoctrinePreDelete() [DiaryComment]');

  if (!class_exists('Diary'))
  {
    $t->skip(1);
    return;
  }

  $diary = Doctrine_Core::getTable('Diary')->create(array(
    'member_id' => 1,
    'title' => 'hogehoge',
    'body' => 'tetete',
  ));
  $diary->save();

  $diaryComment = Doctrine_Core::getTable('DiaryComment')->create(array(
    'diary_id' => $diary->id,
    'member_id' => 1,
    'body' => 'tetete',
  ));
  $diaryComment->save();

  $niceDiary = NiceTable::getInstance()->create(array(
    'member_id' => 2,
    'foreign_table' => 'D',
    'foreign_id' => $diary->id,
  ));
  $niceDiary->save();

  $niceDiaryComment = NiceTable::getInstance()->create(array(
    'member_id' => 2,
    'foreign_table' => 'd',
    'foreign_id' => $diaryComment->id,
  ));
  $niceDiaryComment->save();

  $diaryComment->delete();

  $t->ok(NiceTable::getInstance()->find($niceDiary->id));
  $t->ok(!NiceTable::getInstance()->find($niceDiaryComment->id));
};

$testcases[] = function($t)
{
  $t->diag('opLikePluginConfiguration::listenToDoctrinePreDelete() [CommunityTopic]');

  if (!class_exists('CommunityTopic'))
  {
    $t->skip(1);
    return;
  }

  $topic = Doctrine_Core::getTable('CommunityTopic')->create(array(
    'community_id' => 1,
    'member_id' => 1,
    'title' => 'hogehoge',
    'body' => 'tetete',
  ));
  $topic->save();

  $topicComment = Doctrine_Core::getTable('CommunityTopicComment')->create(array(
    'community_topic_id' => $topic->id,
    'member_id' => 1,
    'body' => 'tetete',
  ));
  $topicComment->save();

  $niceTopicComment = NiceTable::getInstance()->create(array(
    'member_id' => 2,
    'foreign_table' => 't',
    'foreign_id' => $topicComment->id,
  ));
  $niceTopicComment->save();

  $topic->delete();

  $t->ok(!NiceTable::getInstance()->find($niceTopicComment->id));
};

$testcases[] = function($t)
{
  $t->diag('opLikePluginConfiguration::listenToDoctrinePreDelete() [CommunityTopicComment]');

  if (!class_exists('CommunityTopic'))
  {
    $t->skip(1);
    return;
  }

  $topic = Doctrine_Core::getTable('CommunityTopic')->create(array(
    'community_id' => 1,
    'member_id' => 1,
    'title' => 'hogehoge',
    'body' => 'tetete',
  ));
  $topic->save();

  $topicComment = Doctrine_Core::getTable('CommunityTopicComment')->create(array(
    'community_topic_id' => $topic->id,
    'member_id' => 1,
    'body' => 'tetete',
  ));
  $topicComment->save();

  $niceTopicComment = NiceTable::getInstance()->create(array(
    'member_id' => 2,
    'foreign_table' => 't',
    'foreign_id' => $topicComment->id,
  ));
  $niceTopicComment->save();

  $topicComment->delete();

  $t->ok(!NiceTable::getInstance()->find($niceTopicComment->id));
};

$testcases[] = function($t)
{
  $t->diag('opLikePluginConfiguration::listenToDoctrinePreDelete() [CommunityEvent]');

  if (!class_exists('CommunityTopic'))
  {
    $t->skip(1);
    return;
  }

  $event = Doctrine_Core::getTable('CommunityEvent')->create(array(
    'community_id' => 1,
    'member_id' => 1,
    'title' => 'hogehoge',
    'body' => 'tetete',
    'open_date' => '2020-01-01 00:00:00',
    'open_date_comment' => '',
    'area' => '',
  ));
  $event->save();

  $eventComment = Doctrine_Core::getTable('CommunityEventComment')->create(array(
    'community_event_id' => $event->id,
    'member_id' => 1,
    'body' => 'tetete',
  ));
  $eventComment->save();

  $niceEventComment = NiceTable::getInstance()->create(array(
    'member_id' => 2,
    'foreign_table' => 'e',
    'foreign_id' => $eventComment->id,
  ));
  $niceEventComment->save();

  $event->delete();

  $t->ok(!NiceTable::getInstance()->find($niceEventComment->id));
};

$testcases[] = function($t)
{
  $t->diag('opLikePluginConfiguration::listenToDoctrinePreDelete() [CommunityEventComment]');

  if (!class_exists('CommunityTopic'))
  {
    $t->skip(1);
    return;
  }

  $event = Doctrine_Core::getTable('CommunityEvent')->create(array(
    'community_id' => 1,
    'member_id' => 1,
    'title' => 'hogehoge',
    'body' => 'tetete',
    'open_date' => '2020-01-01 00:00:00',
    'open_date_comment' => '',
    'area' => '',
  ));
  $event->save();

  $eventComment = Doctrine_Core::getTable('CommunityEventComment')->create(array(
    'community_event_id' => $event->id,
    'member_id' => 1,
    'body' => 'tetete',
  ));
  $eventComment->save();

  $niceEventComment = NiceTable::getInstance()->create(array(
    'member_id' => 2,
    'foreign_table' => 'e',
    'foreign_id' => $eventComment->id,
  ));
  $niceEventComment->save();

  $eventComment->delete();

  $t->ok(!NiceTable::getInstance()->find($niceEventComment->id));
};

$conn = Doctrine_Manager::connection();

foreach ($testcases as $testcase)
{
  $conn->beginTransaction();
  $testcase($t);
  $conn->rollback();
}
