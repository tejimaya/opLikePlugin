function runTests(apiBase, apiKey) {
  QUnit.moduleStart(function(details) {
    $.ajax(apiBase + 'test/setup.json?force=1&target=opLikePlugin', { async: false });
  });

  module('like/search.json');

  asyncTest('APIキーが指定されない場合にエラーを返す', 1, function() {
    $.getJSON(apiBase + 'like/search.json')
      .complete(function(jqXHR){
        equal(jqXHR.status, 401, 'statusCode');
        start();
      });
  });

  asyncTest('レスポンスのフォーマット', 7, function() {
    $.getJSON(apiBase + 'like/search.json',
    {
      apiKey: apiKey['1'],
      target: 'A',
      target_id: '1'
    },
    function(data){
      equal(data.status, 'success', 'status');

      var obj = data.data[0];
      equal(obj.id, '1', 'data[0].id');
      equal(obj.member_id, '2', 'data[0].member_id');
      equal(obj.foreign_table, 'A', 'data[0].foreign_table');
      equal(obj.foreign_id, '1', 'data[0].foreign_id');
      equal(obj.total, 1, 'data[0].total');
      equal(obj.requestMemberId, '1', 'data[0].requestMemberId');

      start();
    });
  });

  module('like/list.json');

  asyncTest('APIキーが指定されない場合にエラーを返す', 1, function() {
    $.getJSON(apiBase + 'like/list.json')
      .complete(function(jqXHR){
        equal(jqXHR.status, 401, 'statusCode');
        start();
      });
  });

  asyncTest('レスポンスのフォーマット', 8, function() {
    $.getJSON(apiBase + 'like/list.json',
    {
      apiKey: apiKey['1'],
      target: 'A',
      target_id: '1'
    },
    function(data){
      equal(data.status, 'success', 'status');

      var member = data.data[0];
      equal(member.id, '2', 'data[0].member.id');
      equal(member.name, 'B', 'data[0].member.name');
      equal(member.self, false, 'data[0].member.self');
      equal(member.friend, true, 'data[0].member.friend');
      equal(member.blocking, false, 'data[0].member.blocking');
      ok(member.profile_url.match(/\/member\/2$/), 'data[0].member.profile_url');
      ok(member.profile_image.match(/\/no_image.gif$/), 'data[0].member.profile_image');

      start();
    });
  });

  asyncTest('max_idが数値でない場合にエラーを返す', 1, function() {
    $.getJSON(apiBase + 'like/list.json', { apiKey: apiKey['1'], max_id: 'aaaaa' })
      .complete(function(jqXHR){
        equal(jqXHR.status, 400, 'statusCode');
        start();
      });
  });
}

runTests(
  '../../api.php/',
  {
    '1': 'abcdef12345678900001', // member1
  }
);
