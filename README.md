# SNS ライクなアプリ

#　概要

バックエンド　 Spring Boot (Kotlin)　を学ぶ一環で SNS アプリを作成しました。機能は以下です

1. 記事の投稿
2. コメントの投稿
3. お気に入り

## 今後追加したい機能

1. サーチ機能
2. 画像投稿機能
3.

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

inteliJ IDEA CE で snsApp フォルダを開き application.properties を変更:

```
spring.application.name=snsApp
spring.datasource.url=jdbc:postgresql://localhost/snsDB
spring.datasource.username=user
spring.datasource.password=
spring.datasource.driverClassName=org.postgresql.Driver
```

InteliJ 右上のメニューから snsApp[bootRun]を起動するとサーバーが立ち上がる。

####　フロントエンドの設定
frontend フォルダで必要パッケージのインストールをおこなう。

```
npm i
```

ビルドする。
