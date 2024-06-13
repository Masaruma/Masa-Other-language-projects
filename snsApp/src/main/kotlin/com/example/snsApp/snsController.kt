package com.example.snsApp

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.FileNotFoundException
import java.util.*


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = ["*"])
class SnsController(
    @Autowired val userRepository: UserRepository,
    @Autowired val postRepository: PostRepository,
    @Autowired val deleteRepository: DeleteRepository
) {
    @GetMapping("/users")
    fun getUsers(): Array<User> {
        return userRepository.fetchUsers()
    }
    // TODO postTable　改変しないと

    //    全ポスト取得usersとpostsの2角テーブルを合体して取得
    @GetMapping("/posts")
    fun getPosts(): Array<allPosts> {
        return userRepository.fetchAllPosts()
    }

    //    ポストに関連したコメントをpost Idで取得
    @GetMapping("/comments/{postId}")
    fun getComments(@PathVariable postId: Long): Array<Comment> {
        return userRepository.fetchComments(postId)
    }

    //    !!Postテーブル関連
    @GetMapping("/postTable")
    fun getPostTable(): Array<GetfromPostTable> {
        return postRepository.fetchPostTable()
    }

    //    新規投稿する(廃止)
    @PostMapping("/postTable")
    fun savePost(@RequestBody postRequest: PostRequest): String {
        return postRepository.savePost(postRequest)
    }

    //    後から画像追加したくなったので新しい新規投稿エンドポイント
    @PostMapping("/formData")
    fun insert(
        @RequestPart("user") user: PostRequest,
        @RequestPart("file") file: MultipartFile?
    ): String {
        println("***")
        println(user)
        println(file)
        var base64FileString: String?
        if (file != null) {
//        base64変換処理
            var fileEntension: String? = null
//        拡張子の取得
            try {
                fileEntension = getEntension(file.originalFilename)
            } catch (e: Exception) {
                e.printStackTrace()
            }
//        base64文字列に変換
            base64FileString = Base64.getEncoder().encodeToString(file.bytes)
            if ("jpg" == fileEntension || "jpeg" == fileEntension) {
                base64FileString = "data:image/jpeg;base64,$base64FileString"
            } else if ("png" == fileEntension) {
                base64FileString = "data:image/png;base64,$base64FileString"
            } else {
                base64FileString = "data:image;base64,$base64FileString"
            }

            user.image = base64FileString
        }

        println(user)
        return postRepository.saveImagePost(user)
    }

    //    拡張子取得の関数
    @Throws(java.lang.Exception::class)
    private fun getEntension(fileName: String?): String? {
        if (fileName == null) {
            throw FileNotFoundException()
        }

        val point = fileName.lastIndexOf(".")
        if (point == -1) {
            throw FileNotFoundException()
        }
        return fileName.substring(point + 1)
    }


    //    コメントの投稿
    @PostMapping("/comments")
    fun saveComment(@RequestBody commentRequest: CommentRequest): String {
        println("****")
        println(commentRequest)
        return postRepository.saveComment(commentRequest)
    }


    //Delete
//
    @DeleteMapping("/postTable/{postId}")
    fun deletePost(@PathVariable postId: Long): String {
        return deleteRepository.deletePostTable(postId)
    }

    //   put
    @PutMapping("/posts/{postId}/good")
    fun postGoodUpdate(@PathVariable postId: Long, @RequestBody postGoodRequest: PostGoodRequest): String {
        println("********")
        println(postId)
        println(postGoodRequest)
        return postRepository.postGoodUpdate(postId, postGoodRequest)
    }
}