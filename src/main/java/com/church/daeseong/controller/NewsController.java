package com.church.daeseong.controller;

import com.church.daeseong.domain.News;
import com.church.daeseong.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;

    @GetMapping("/news")
    public String newsPage(@RequestParam(defaultValue = "gospel") String type,
                           @RequestParam(defaultValue = "1") int page,
                           Model model) {
        model.addAttribute("newsList", newsService.getNews(type, page));
        model.addAttribute("totalPages", newsService.getTotalPages(type));
        model.addAttribute("currentType", type);
        model.addAttribute("currentPage", page);
        return "news";
    }

    @GetMapping("/api/news")
    @ResponseBody
    public Map<String, Object> apiGetNews(@RequestParam(defaultValue = "gospel") String type,
                                          @RequestParam(defaultValue = "1") int page) {
        Map<String, Object> result = new HashMap<>();
        result.put("news", newsService.getNews(type, page));
        result.put("totalPages", newsService.getTotalPages(type));
        result.put("currentPage", page);
        return result;
    }

    @PostMapping("/api/news")
    @ResponseBody
    public Map<String, Object> apiRegister(@RequestBody News news) {
        newsService.register(news, null);
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("id", news.getId());
        return result;
    }

    @DeleteMapping("/api/news/{id}")
    @ResponseBody
    public Map<String, Object> apiDelete(@PathVariable Long id) {
        newsService.delete(id);
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        return result;
    }
}
