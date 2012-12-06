opLikePlugin概要
======================
「いいね！」機能を追加します。

「いいね！」ボタン（親指を立てた画像）をクリックするといいね！が付きます。  
自分のつぶやきやコメントには「いいね！」出来ません。  
自分のつけた「いいね！」は「いいね！を取り消す」をクリックすることで取り消すことができます。  
「いいね！」をクリックすると「いいね！」した人のメンバーリストを表示できます  

スマートフォンにも対応しています。


スクリーンショット
------
<a href="http://tejimaya.github.com/opNicePlugin/images/nice_01_rm_01.png" target=brank>
<img src="http://tejimaya.github.com/opNicePlugin/images/nice_01_rm_01.png" height=150/></a>
<a href="http://tejimaya.github.com/opNicePlugin/images/nice_01_rm_03.png" target=brank>
<img src="http://tejimaya.github.com/opNicePlugin/images/nice_01_rm_03.png" height=150/></a>
<a href="http://tejimaya.github.com/opNicePlugin/images/nice_01_rm_02.png" target=brank>
<img src="http://tejimaya.github.com/opNicePlugin/images/nice_01_rm_02.png" height=150/></a>
<a href="http://tejimaya.github.com/opNicePlugin/images/nice_01_rm_04.png" target=brank>
<img src="http://tejimaya.github.com/opNicePlugin/images/nice_01_rm_04.png" height=150/></a>

対応プラグイン
-------------
opTimelinePlugin  
opDiaryPlugin  
opCommunityTopicPlugin  

インストール方法
----------------
**「いいね！」プラグラインのダウンロード**  
symfonyコマンドを使って、直接DLします。

    cd path/to/OpenPNE
    ./symfony opPlugin:install opLikePlugin -r 1.0.1


**「いいね！」に対応したプラグインのダウンロード**
通常のプラグインでは動作しないため、対応したプラグインを以下のコマンドでダウンロードします。  

    cd path/to/OpnePNE
    php plugins/opLikePlugin/task/pluginInstallTask.php -cdt


"-cdt"の部分はインストールしたいプラグインにより変更します。  
opCommunityTopicPluginだけのインストールしたい場合は "-c"  
opDiaryPluginとopTimelinePluginをインストールしたい場合は"-dt"  
上記のようにハイフンの後にプラグインの頭文字を指定します。  


**OpnePNE本体側Bootstrapの変更・画像の差し替え**

    rm 'OpenPNE ディレクトリ'/web/img/*
    cp 'OpenPNE ディレクトリ'/plugins/opLikePlugin/web/img/* 'インストールディレクトリ'/web/img/


**CSSの編集**
 ‘OpenPNE ディレクトリ'/web/css/bootstrap.cssを開き、以下の3行を追加

    .icon-thumbs-up {
      background-position: -96px -144px;
    }


**プラグインのインストール**

    ./symfony opPlugin:migrate


**アセット**

    ./symfony plugin:publish-assets
    

動作環境
--------
OpnePNE3.8.0以上  
    
  
更新履歴
--------

 * 2012/11/16 Ver.0.0.3  opDiaryPlugin及び、opCommunityTopicPluginに対応。 
 * 2012/11/16 Ver.0.0.2  opNicePlugin → opLikePlugin に名称変更 
 * 2012/11/08 Ver.0.0.1 「いいね！」機能を追加 


  
要望・フィードバック
----------

https://github.com/ichikawatatsuya/opLikePlugin/issues

