package com.church.daeseong.domain;

import lombok.Data;

@Data
public class NewsImage {
    private Long id;
    private Long newsId;
    private String imagePath;
    private Integer sortOrder;
}
