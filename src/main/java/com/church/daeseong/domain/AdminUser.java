package com.church.daeseong.domain;

import lombok.Data;

@Data
public class AdminUser {
    private Long id;
    private String username;
    private String password;
    private String name;
}
