package com.example.snsApp

import java.sql.Timestamp

data class PostRequest(
                       val userId: Long,
                       val createdAt: Timestamp,
                       val content: String,
                       val good: Long)
