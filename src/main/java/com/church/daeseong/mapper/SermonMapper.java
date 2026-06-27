package com.church.daeseong.mapper;

import com.church.daeseong.domain.Sermon;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface SermonMapper {
    List<Sermon> selectSermons(@Param("type") String type,
                               @Param("offset") int offset,
                               @Param("limit") int limit);
    int countSermons(@Param("type") String type);
    Sermon selectById(@Param("id") Long id);
    void insertSermon(Sermon sermon);
    void updateSermon(Sermon sermon);
    void deleteSermon(@Param("id") Long id);
}
