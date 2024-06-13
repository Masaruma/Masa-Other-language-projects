package com.example.snsApp

import org.hamcrest.CoreMatchers.equalTo
import org.hamcrest.MatcherAssert.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpStatus
import org.springframework.http.RequestEntity
import org.springframework.test.context.jdbc.Sql
import java.sql.Timestamp

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql("/insert_test_data.sql")
class SnsAppApplicationTests(
    @Autowired val restTemplate: TestRestTemplate,
    @LocalServerPort val port: Int
) {

    @Test
    fun contextLoads() {
    }

    @Test
    fun `最初のテスト`() {
        assertThat(1 + 2, equalTo(3))
    }

    @Test
    fun `GETリクエストはOKステータスを返す`() {
        // localhost/todos に GETリクエストを発行する。
        val response = restTemplate.getForEntity("http://localhost:$port/api/users", String::class.java)
        // レスポンスのステータスコードは OK である
        println(response.statusCode)
        println(HttpStatus.OK)
        assertThat(response.statusCode, equalTo(HttpStatus.OK))
    }

    @Test
    fun `GETリクエストはusersオブジェクトのリストを返す`() {
        val response = restTemplate.getForEntity("http://localhost:$port/api/users", Array<User>::class.java)
        val users = response.body!!
//		assertThat(users.size, equalTo(4))
        assertThat(users[0].id, equalTo(1))
        assertThat(users[0].username, equalTo("john"))
    }

    //	postTable
    @Test
    fun `postテーブルへのGETリクエストはOKステータスを返す`() {
        val response = restTemplate.getForEntity("http://localhost:$port/api/postTable", String::class.java)
        assertThat(response.statusCode, equalTo(HttpStatus.OK))
    }

    @Test
    fun `postテーブルへのGETリクエストはpostsオブジェクトのリストを返す`() {
        val response =
            restTemplate.getForEntity("http://localhost:$port/api/postTable", Array<GetfromPostTable>::class.java)
        val posts = response.body!!
//		println("*****")
//		println(posts)
        assertThat(posts[0].id, equalTo(1))
        assertThat(posts[0].content, equalTo("今日は頭が痛い。"))
    }


    @Test
    fun `PostリクエストはOKステータスを返す`() {
//		val timestamp = Timestamp(System.currentTimeMillis())
        val request = PostRequest(1, Timestamp(System.currentTimeMillis()), "wwwwwwww", 2)
        val response = restTemplate.postForEntity("http://localhost:$port/api/postTable", request, String::class.java)
        assertThat(response.statusCode, equalTo(HttpStatus.OK))
    }

    @Test
    fun `Postリクエストはpostオブジェクトを格納する`() {
        val response1 =
            restTemplate.getForEntity("http://localhost:$port/api/postTable", Array<GetfromPostTable>::class.java)
        val post1 = response1.body!!
//		投稿を行う
        val request = PostRequest(1, Timestamp(System.currentTimeMillis()), "やあ", 2)
        restTemplate.postForEntity("http://localhost:$port/api/postTable", request, String::class.java)

        val response2 =
            restTemplate.getForEntity("http://localhost:$port/api/postTable", Array<GetfromPostTable>::class.java)
        val post2 = response2.body!!
//		postしたので1多い
        assertThat(post2.size, equalTo(post1.size + 1))

    }

    //commentへのテストはOKだけ。
    @Test
    fun `Postリクエスト(comment)はOKステータスをだす`() {
        var request = CommentRequest(1, 5, Timestamp(System.currentTimeMillis()), "やあ", 2)
        var response = restTemplate.postForEntity("http://localhost:$port/api/comments", request, String::class.java)
        assertThat(response.statusCode, equalTo(HttpStatus.OK))
    }

    //	delete
    @Test
    fun `DeleteリクエストはOKステータスを返す`() {
        val requestEntity = RequestEntity.delete("http://localhost:$port/api/postTable/5", String::class.java).build()
        val responseEntity = restTemplate.exchange(requestEntity, Void::class.java)
        assertThat(responseEntity.statusCode, equalTo(HttpStatus.OK))
    }

    @Test
    fun `Deleteリクエストは指定したPostを削除する`() {
        val request = PostRequest(1, Timestamp(System.currentTimeMillis()), "やあ", 2)
        restTemplate.postForEntity("http://localhost:$port/api/postTable", request, String::class.java)
//		取得する
        val response1 =
            restTemplate.getForEntity("http://localhost:$port/api/postTable", Array<GetfromPostTable>::class.java)
        val post1 = response1.body!!
//		削除する
        restTemplate.delete("http://localhost:$port/api/postTable/{id}", post1[post1.size - 1].id)
//		再び取得する
        val response2 =
            restTemplate.getForEntity("http://localhost:$port/api/postTable", Array<GetfromPostTable>::class.java)
        val post2 = response2.body!!
//		削除後は配列の長さが1短くなる
        assertThat(post2.size, equalTo(post1.size - 1))
    }

    @Test
    fun `PutリクエストはOKステータスを返す`() {
        val requestEntity = RequestEntity.put("http://localhost:$port/api/posts/3/good", String::class.java)
            .body(PostGoodRequest(10))
//			.build()
        val responseEntity = restTemplate.exchange(requestEntity, Void::class.java)
        assertThat(responseEntity.statusCode, equalTo(HttpStatus.OK))
    }

}
