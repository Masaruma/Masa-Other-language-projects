package com.example.snsApp

import java.sql.Timestamp

data class allPosts(    val postId: Long,
                        val userId: Long,
                        val username: String,
                        val createdAt: Timestamp,
                        val content: String,
                        val good: Long,
                        val commentAmount: Long)
