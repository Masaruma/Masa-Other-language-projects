package com.example.snsApp

import java.sql.Timestamp

data class CommentRequest(val postId: Long,
                          val userId: Long,
                          val createdAt: Timestamp,
                          val content: String,
                          val good: Long)
