package com.example.snsApp

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*


@RestController
@CrossOrigin(origins = ["*"])
class SnsController (@Autowired val userRepository: UserRepository, @Autowired val postRepository: PostRepository, @Autowired val deleteRepository: DeleteRepository){
    @GetMapping ("/users")
    fun getUsers(): Array<User> {
        return userRepository.fetchUsers()
    }
//    全ポスト取得usersとpostsの2角テーブルを合体して取得
    @GetMapping ("/posts")
    fun getPosts(): Array<allPosts> {
        return userRepository.fetchAllPosts()
    }
//    ポストに関連したコメントをpost Idで取得
    @GetMapping ("/comments/{postId}")
    fun getComments(@PathVariable postId:Long): Array<Comment> {
        return userRepository.fetchComments(postId)
    }
//    !!Postテーブル関連
    @GetMapping("/postTable")
    fun getPostTable():Array<GetfromPostTable> {
        return postRepository.fetchPostTable()
    }
//    新規投稿すると。
    @PostMapping("/postTable")
    fun savePost(@RequestBody postRequest: PostRequest):String {
        return postRepository.savePost(postRequest)
    }

//    コメントの投稿
    @PostMapping("/comments")
    fun saveComment(@RequestBody commentRequest: CommentRequest):String {
    println("****")
    println(commentRequest)
        return postRepository.saveComment(commentRequest)
    }


//Delete
//
    @DeleteMapping("/postTable/{postId}")
    fun deletePost(@PathVariable postId:Long):String {
        return deleteRepository.deletePostTable(postId)
    }

//   put
    @PutMapping("/posts/{postId}/good")
    fun postGoodUpdate(@PathVariable postId: Long,@RequestBody postGoodRequest: PostGoodRequest):String {
        println("********")
        println(postId)
        println(postGoodRequest)
        return postRepository.postGoodUpdate(postId, postGoodRequest)
    }
}