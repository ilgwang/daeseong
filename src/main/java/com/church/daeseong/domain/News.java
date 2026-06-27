package com.church.daeseong.domain;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class News {
    private Long id;
    private String title;
    private String type;        // gospel, news, bulletin, poetry, column, study
    private String content;
    private String author;
    private LocalDate newsDate;
    private LocalDateTime createdAt;
    private List<NewsImage> images;
}
