package com.church.daeseong.controller;

import com.church.daeseong.domain.News;
import com.church.daeseong.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;

    @Value("${app.upload-dir}")
    private String uploadDir;

    private static final int PUBLIC_SIZE = 5;

    @GetMapping("/news")
    public String newsPage(@RequestParam(defaultValue = "gospel") String type,
                           @RequestParam(defaultValue = "1") int page,
                           Model model) {
        model.addAttribute("newsList", newsService.getNews(type, page, PUBLIC_SIZE));
        model.addAttribute("totalPages", newsService.getTotalPages(type, PUBLIC_SIZE));
        model.addAttribute("currentType", type);
        model.addAttribute("currentPage", page);
        return "news";
    }

    @GetMapping("/api/news")
    @ResponseBody
    public Map<String, Object> apiGetNews(@RequestParam(defaultValue = "gospel") String type,
                                          @RequestParam(defaultValue = "1") int page,
                                          @RequestParam(defaultValue = "5") int size) {
        Map<String, Object> result = new HashMap<>();
        result.put("news", newsService.getNews(type, page, size));
        result.put("totalPages", newsService.getTotalPages(type, size));
        result.put("currentPage", page);
        return result;
    }

    @PostMapping(value = "/api/news", consumes = "multipart/form-data")
    @ResponseBody
    public Map<String, Object> apiRegister(
            @RequestParam String title,
            @RequestParam String type,
            @RequestParam(required = false) String content,
            @RequestParam(required = false) String author,
            @RequestParam String newsDate,
            @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {

        News news = new News();
        news.setTitle(title);
        news.setType(type);
        news.setContent(content);
        news.setAuthor(author);
        news.setNewsDate(LocalDate.parse(newsDate));

        List<String> savedPaths = newsService.saveFiles(files, uploadDir);
        newsService.register(news, savedPaths.isEmpty() ? null : savedPaths);

        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("id", news.getId());
        return result;
    }

    @GetMapping("/api/news/{id}")
    @ResponseBody
    public News apiGetNews(@PathVariable Long id) {
        return newsService.getNews(id);
    }

    @PutMapping(value = "/api/news/{id}", consumes = "multipart/form-data")
    @ResponseBody
    public Map<String, Object> apiUpdate(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam String type,
            @RequestParam(required = false) String content,
            @RequestParam(required = false) String author,
            @RequestParam String newsDate,
            @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {

        News news = new News();
        news.setId(id);
        news.setTitle(title);
        news.setType(type);
        news.setContent(content);
        news.setAuthor(author);
        news.setNewsDate(LocalDate.parse(newsDate));

        List<String> savedPaths = newsService.saveFiles(files, uploadDir);
        newsService.update(news, savedPaths.isEmpty() ? null : savedPaths);

        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
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
