package com.church.daeseong.mapper;

import com.church.daeseong.domain.News;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface NewsMapper {
    List<News> selectNews(@Param("type") String type,
                          @Param("offset") int offset,
                          @Param("limit") int limit);
    int countNews(@Param("type") String type);
    News selectById(@Param("id") Long id);
    void insertNews(News news);
    void updateNews(News news);
    void deleteNews(@Param("id") Long id);
    void insertNewsImage(@Param("newsId") Long newsId,
                         @Param("imagePath") String imagePath,
                         @Param("sortOrder") int sortOrder);
    void deleteNewsImages(@Param("newsId") Long newsId);
}
