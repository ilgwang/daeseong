package com.church.daeseong.config;

import com.church.daeseong.mapper.AdminUserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {

    private final AdminUserMapper adminUserMapper;
    private final PasswordEncoder passwordEncoder;
    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(ApplicationArguments args) {
        if (adminUserMapper.findByUsername("admin") == null) {
            String encoded = passwordEncoder.encode("daeseong2013");
            jdbcTemplate.update(
                "INSERT INTO admin_user (username, password, name) VALUES (?, ?, ?)",
                "admin", encoded, "관리자"
            );
            log.info("기본 관리자 계정 생성 완료 (admin / daeseong2013)");
        }
    }
}
