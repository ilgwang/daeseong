package com.church.daeseong.mapper;

import com.church.daeseong.domain.AdminUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface AdminUserMapper {

    @Select("SELECT id, username, password, name FROM admin_user WHERE username = #{username}")
    AdminUser findByUsername(String username);
}
