CREATE TABLE articles (
	id int(10) unsigned NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    content longtext NOT NULL,
    slug varchar(255) NOT NULL,
    author_id int(10) unsigned NOT NULL,
    status ENUM('draft', 'published') DEFAULT 'draft',
    summary TEXT DEFAULT NULL,
    cover varchar(255) DEFAULT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY(id),
    
    UNIQUE KEY articles_unique_slug (slug),
    KEY article_author_fs (author_id),
    CONSTRAINT article_author_fs FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE
) DEFAULT charset = utf8mb4 COLLATE = utf8mb4_unicode_ci