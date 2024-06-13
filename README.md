# SNS ライクなアプリ

#　概要

バックエンド　 Spring Boot (Kotlin)　を学ぶ一環で SNS アプリを作成しました。

- UI の構築は tailwind css + shadn cn , chakraUI, material UI のどれにしようか悩みました。
  tailwind css +shadn cn はうまく動かなかったので material UI よりも中規模アプリに的した chakra にしました。

- SNS は簡単に作れるのかと思っていましたが、投稿とコメント、いいねの DB が相互に関連していて結構作成するのに苦労しました。X は機能が豊富ですげえなあとしみじみ思いました。
## 主要機能
1. 記事の投稿
2. 画像投稿
3. コメントの投稿
4. お気に入り
※投稿主のIDは現在固定になってしまう。

## 今後追加したい機能
1. プロフィール登録
2. ログイン機能
3. サーチ機能
4. AI 連携

# 使用技術

- React 18.3.1
  - Vite 5.1
  - ChakraUI 2.8.2
- PostgreSQL 14.12
- Spring Boot 3.3.0 　[Spring Initializer](https://start.spring.io/#!type=gradle-project-kotlin&language=kotlin&packaging=jar&jvmVersion=21&groupId=com.example&artifactId=todoApp&name=todoApp&description=Sample%20Spring%20Boot%20Todo%20app&packageName=com.example.todoApp&dependencies=web,data-jdbc,flyway,postgresql)
  - Language
    - Gradle - Kotlin
    - Java 21
  - Dependencies
    - Spring Web
    - Spring Data JDBC
    - Flyway Migration
    - PostgreSQL Driver

#　セットアップ手順

#### データベースの作成

データベースの作成を行います。 ターミナルでコマンドを実行してください！

```
createdb snsdb
```

#### バックエンドの設定

inteliJ IDEA CE で snsApp フォルダを開き snsApp/src/main/resources/application.properties
application.properties を作成し下記を記述:

```
spring.application.name=snsApp
spring.datasource.url=jdbc:postgresql://localhost/snsdb
spring.datasource.username=user
spring.datasource.password=
spring.datasource.driverClassName=org.postgresql.Driver
spring.servlet.multipart.max-file-size=3MB
spring.servlet.multipart.max-request-size=3MB
```
username と password は自分の設定に変更する。
InteliJ 右上のメニューから snsApp[bootRun]を起動するとサーバーが立ち上がることを確認し、一度停止する.

####　フロントエンドの設定
frontend ディレクトリで必要パッケージのインストールをおこなう。その後 build を行う

```
npm i
npm run build
```

#### アプリの起動

inteliJ IDEA CE で boot run を実行し,http://localhost:8080 にアクセスする。
