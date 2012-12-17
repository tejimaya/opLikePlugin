opLikePlugin概要
======================
「いいね！」機能を追加します。

「いいね！」をクリックするといいね！が付きます。  
自分のつけた「いいね！」は「いいね！を取り消す」をクリックすることで取り消すことができます。  

スマートフォンにも対応しています。


スクリーンショット
------
<img src="https://raw.github.com/ichikawatatsuya/opLikePlugin/gh-pages/images/001.png" height=200/>
<img src="https://raw.github.com/ichikawatatsuya/opLikePlugin/gh-pages/images/002.png" height=200/>
<img src="https://raw.github.com/ichikawatatsuya/opLikePlugin/gh-pages/images/003.png" height=200/>
<img src="https://raw.github.com/ichikawatatsuya/opLikePlugin/gh-pages/images/004.png" height=200/>
<img src="https://raw.github.com/ichikawatatsuya/opLikePlugin/gh-pages/images/005.png" height=200/>
<img src="https://raw.github.com/ichikawatatsuya/opLikePlugin/gh-pages/images/006.png" height=200/>
<img src="https://raw.github.com/ichikawatatsuya/opLikePlugin/gh-pages/images/007.png" height=200/>

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
    ./symfony opPlugin:install opLikePlugin -r 1.0.3


**「いいね！」に対応したプラグインのダウンロード**  

    cd path/to/OpenPNE  
    ./symfony opPlugin:install opCommunityTopicPlugin -r 1.0.5  
    ./symfony opPlugin:install opDiaryPlugin -r 1.4.2  
    ./symfony opPlugin:install opTimelinePlugin -r 1.0.1  

**OpnePNE本体側Bootstrapの変更・画像の差し替え**

    rm 'OpenPNE ディレクトリ'/web/img/*
    cp 'OpenPNE ディレクトリ'/plugins/opLikePlugin/web/img/* 'OpenPNE ディレクトリ'/web/img/


**CSSの編集**
 ‘OpenPNE ディレクトリ'/web/css/bootstrap.cssを開き、以下の3行を追加

    .icon-thumbs-up {
      background-position: -96px -144px;
    }


**プラグインのインストール**

    ./symfony openpne:migrate


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

