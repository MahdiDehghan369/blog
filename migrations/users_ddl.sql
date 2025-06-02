CREATE TABLE users (
	id int unsigned NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    avator varchar(255) DEFAULT NULL,
    password varchar(255) DEFAULT NULL,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    provider ENUM("local" , "google" , "meta") NOT NULL DEFAULT "local",
    role ENUM("user" , "admin") NOT NULL DEFAULT "user",
    bio varchar(255) DEFAULT NULL,
    gender ENUM("male" , "female" , "other"),
    birthday Date DEFAULT NULL,
    x_profile varchar(255) DEFAULT NULL,
    linkedin_profile varchar(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    
    PRIMARY KEY(id),
    UNIQUE KEY users_unique_username (username),
    UNIQUE KEY users_unique_email (email)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci