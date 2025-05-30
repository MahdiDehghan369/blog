CREATE TABLE tags (
	id int(10) unsigned NOT NULL AUTO_INCREMENT,
    title varchar(100) NOT NULL ,
    slug varchar(100) NOT NULL ,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY(id),
    UNIQUE KEY tags_unique_title (title),
    UNIQUE KEY tags_unique_slug (slug)
) DEFAULT charset = utf8mb4 COLLATE = utf8mb4_unicode_ci;