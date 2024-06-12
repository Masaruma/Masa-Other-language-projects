package com.example.snsApp

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import org.springframework.web.bind.annotation.RequestBody
import java.sql.ResultSet

@Component
class UserRowMapper : RowMapper<User> {
    override fun mapRow(rs: ResultSet, rowNum: Int): User {
        return User(rs.getLong(1), rs.getString(2), rs.getString(3), rs.getString(4))
    }
}
//all posts用RowMapper
@Component
class AllpostsRowMapper : RowMapper<allPosts> {
    override fun mapRow(rs: ResultSet, rowNum: Int): allPosts {
        return allPosts(
            rs.getLong(1),
            rs.getLong(2),
            rs.getString(3),
            rs.getTimestamp(4),
            rs.getString(5),
            rs.getLong(6),
            rs.getLong(7)
        )
    }
}//all comment用RowMapper
@Component
class CommentsRowMapper : RowMapper<Comment> {
    override fun mapRow(rs: ResultSet, rowNum: Int): Comment {
        return Comment(
            rs.getString(1),
            rs.getLong(2),
            rs.getLong(3),
            rs.getLong(4),
            rs.getTimestamp(5),
            rs.getString(6),
            rs.getLong(7)
        )
    }
}
@Repository
class UserRepository(@Autowired val jdbcTemplate: JdbcTemplate, @Autowired val userRowMapper: UserRowMapper,@Autowired val allpostsRowMapper: AllpostsRowMapper, @Autowired val commentsRowMapper: CommentsRowMapper){
    fun fetchUsers(): Array<User> {
        val users = jdbcTemplate.query("SELECT id, username, bio, location FROM users", userRowMapper)
        return users.toTypedArray()
    }
//    全ポストとコメント数
    fun fetchAllPosts(): Array<allPosts> {
        val  allPosts = jdbcTemplate.query("SELECT p.id AS post_id, p.user_id, u.username, p.created_at, p.content,p.good, COUNT(c.id) AS comment_amount FROM posts p JOIN users u ON p.user_id = u.id LEFT JOIN comments c ON p.id = c.post_id GROUP BY p.id, p.user_id, u.username, p.created_at, p.content ORDER BY p.created_at DESC;", allpostsRowMapper)
        return allPosts.toTypedArray()
    }
//    投稿に関連したコメント
    fun fetchComments(postId:Long):Array<Comment> {
        val comments = jdbcTemplate.query("SELECT users.username, comments.* FROM comments LEFT JOIN users ON comments.user_id = users.id WHERE comments.post_id = ? ORDER BY comments.created_at_c DESC", commentsRowMapper, postId)
        return comments.toTypedArray()
    }

}



//Postテーブルの取得と投稿

@Component
class PostsTableRowMapper :RowMapper<GetfromPostTable> {
    override fun mapRow(rs: ResultSet, rowNum: Int): GetfromPostTable {
        return GetfromPostTable(
            rs.getLong(1),
            rs.getLong(2),
            rs.getTimestamp(3),
            rs.getString(4),
            rs.getLong(5)
        )
    }
}

@Repository
class PostRepository(@Autowired val jdbcTemplate: JdbcTemplate, @Autowired val postsTableRowMapper: PostsTableRowMapper){
    fun fetchPostTable(): Array<GetfromPostTable> {
        val postsTable = jdbcTemplate.query("SELECT * FROM posts", postsTableRowMapper)
        println("******")
        println(postsTable)
        return postsTable.toTypedArray()
    }
//    投稿
    fun savePost(@RequestBody postRequest: PostRequest): String {
        jdbcTemplate.update("INSERT INTO posts (user_id, created_at, content, good) VALUES (?, ?, ?, ?)", postRequest.userId,postRequest.createdAt,postRequest.content,postRequest.good)
        return "successful save"
    }
//    コメント投稿
    fun saveComment(@RequestBody commentRequest: CommentRequest):String {
        jdbcTemplate.update("INSERT INTO comments (post_id, user_id, created_at_c, content_c, good_c) VALUES (?, ?, ?, ?, ?)", commentRequest.postId,commentRequest.userId, commentRequest.createdAt, commentRequest.content, commentRequest.good)
        return "successful save comment"
    }
//    投稿のgood更新
    fun postGoodUpdate(postId: Long, postGoodRequest: PostGoodRequest):String {
        jdbcTemplate.update("UPDATE posts SET good = ? WHERE id = ?", postGoodRequest.good, postId)
        return "good update successful"
    }
}

//Delete関連
@Repository
class DeleteRepository(@Autowired val jdbcTemplate: JdbcTemplate) {
    fun deletePostTable(postId: Long) :String {
//       関連したコメントを削除
        jdbcTemplate.update("DELETE FROM comments WHERE post_id = ?", postId)
        jdbcTemplate.update("DELETE FROM posts WHERE id = ?", postId)
        return "postID $postId Deleted"
    }
}