package com.example.snsApp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SnsAppApplication

fun main(args: Array<String>) {
	runApplication<SnsAppApplication>(*args)
}
