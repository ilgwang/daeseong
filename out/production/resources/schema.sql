ALTER DATABASE daeseong CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sermon (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(200)    NOT NULL,
    pastor      VARCHAR(50)     NOT NULL,
    type        VARCHAR(20)     NOT NULL COMMENT 'sunday | wednesday | friday',
    verse       VARCHAR(200),
    sermon_date DATE            NOT NULL,
    youtube_id  VARCHAR(50)     NOT NULL,
    start_time  INT             DEFAULT 0,
    created_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS news (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(200)    NOT NULL,
    type        VARCHAR(20)     NOT NULL COMMENT 'gospel | news | bulletin | poetry | column | study',
    content     LONGTEXT,
    author      VARCHAR(50),
    news_date   DATE            NOT NULL,
    created_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS news_image (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    news_id     BIGINT          NOT NULL,
    image_path  VARCHAR(500)    NOT NULL,
    sort_order  INT             DEFAULT 0,
    FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 샘플 데이터 (최초 1회만)
INSERT INTO sermon (title, pastor, type, verse, sermon_date, youtube_id, start_time)
SELECT '낙심하지 말고 선을 행합시다', '손정열', 'sunday', '갈라디아서 6장 8절 ~ 10절', '2026-06-17', 'jlBSjgPmvYo', 2
WHERE NOT EXISTS (SELECT 1 FROM sermon WHERE youtube_id = 'jlBSjgPmvYo');
