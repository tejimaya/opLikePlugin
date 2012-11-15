opNicePlugin概要
======================
opTimelinePluginにいいね！機能を追加します。

「いいね！」ボタン（親指を立てた画像）をクリックするといいね！が付きます。  
自分のつぶやきやコメントには「いいね！」出来ません。  
自分のつけた「いいね！」は「いいね！を取り消す」をクリックすることで取り消すことができます。  
「いいね！」をクリックすると「いいね！」した人のメンバーリストを表示できます  

Ajaxでスマートフォンにも対応しています。


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


インストール方法
----------------
opTimelinePlugin側にも修正を行っています。  
通常のopTimelinePluginでは動きません。  
https://github.com/ichikawatatsuya/opTimelinePlugin.git を使用してください。  
[iine]というブランチで開発したため、git checkout iineでブランチを切り替えてください。  
Bootstrap、CSSファイルを下記のように編集・変更してください。  
（これらは各次バージョンで修正する予定です）

**「いいね！」プラグラインのインストール**  
*通常インストール*  
symfonyコマンドを使って、直接DLします

    cd path/to/OpenPNE
    ./symfony opPlugin:install opNicePlugin

*ZIPからインストール*  
https://github.com/tejimaya/opNicePlugin/archive/master.zip  
からダウンロードして手動でインストールします。

    ./symfony opPlugin:migrate 


**タイムラインのインストール**

ZIPでダウンロード、またはgit cloneでインストールしてください。  
https://github.com/ichikawatatsuya/opTimelinePlugin/archive/master.zip  
からダウンロードしてインストールしてください。

    ./symfony opPlugin:migrate
    ./symfony opTimelinePlugin:install


**ブランチを切り替える**

    cd opTimelinePlugin
    git checkout -b iine remotes/origin/iine


**OpnePNE本体側Bootstrapの変更・画像の差し替え**

    rm 'OpenPNE ディレクトリ'/web/img/*
    cp  'OpenPNE ディレクトリ'/plugins/opTimelinePlugin/web/img/* 'インストールディレクトリ'/web/img/


**CSSの編集**

 ‘OpenPNE ディレクトリ'/web/css/bootstrap.cssを開き、以下の3行を追加

    .icon-thumbs-up {
      background-position: -96px -144px;
    }


**データベース追加**

    ./symfony openpne:migrate --target=opNicePlugin


**アセット**

    ./symfony plugin:publish-assets
    

動作環境
--------
OpnePNE3.8.0以上  
opTimelinePluginに依存  
  
    
更新履歴
--------

 * 2012/11/08 Ver.0.0.1 「いいね！」機能を追加 


  
要望・フィードバック
----------

https://github.com/tejimaya/opNicePlugin/issues

