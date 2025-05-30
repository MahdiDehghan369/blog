CREATE TABLE articles_tags (
    article_id INT(10) UNSIGNED NOT NULL,
    tag_id INT(10) UNSIGNED NOT NULL,
    
    PRIMARY KEY(article_id, tag_id),
    
    KEY articles_tags_tags_fs (tag_id),
    CONSTRAINT articles_tags_tags_fs FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE,
    
    KEY articles_tags_articles_fs (article_id),
    CONSTRAINT articles_tags_articles_fs FOREIGN KEY(article_id) REFERENCES articles(id) ON DELETE CASCADE
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
