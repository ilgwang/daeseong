package com.church.daeseong.controller;

import com.church.daeseong.mapper.AdminUserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminUserMapper adminUserMapper;

    @GetMapping
    public String adminPage(@AuthenticationPrincipal UserDetails userDetails, Model model) {
        if (userDetails != null) {
            var admin = adminUserMapper.findByUsername(userDetails.getUsername());
            model.addAttribute("adminName", admin != null ? admin.getName() : userDetails.getUsername());
        }
        return "admin";
    }
}
