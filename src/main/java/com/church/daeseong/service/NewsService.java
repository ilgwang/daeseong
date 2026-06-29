package com.church.daeseong.service;

import com.church.daeseong.domain.News;
import com.church.daeseong.mapper.NewsMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final NewsMapper newsMapper;
    public List<News> getNews(String type, int page, int size) {
        int offset = (page - 1) * size;
        return newsMapper.selectNews(type, offset, size);
    }

    public int getTotalPages(String type, int size) {
        int total = newsMapper.countNews(type);
        return (int) Math.ceil((double) total / size);
    }

    public News getNews(Long id) {
        return newsMapper.selectById(id);
    }

    @Transactional
    public void register(News news, List<String> imagePaths) {
        newsMapper.insertNews(news);
        if (imagePaths != null) {
            for (int i = 0; i < imagePaths.size(); i++) {
                newsMapper.insertNewsImage(news.getId(), imagePaths.get(i), i);
            }
        }
    }

    @Transactional
    public void update(News news, List<String> imagePaths) {
        newsMapper.updateNews(news);
        if (imagePaths != null) {
            newsMapper.deleteNewsImages(news.getId());
            for (int i = 0; i < imagePaths.size(); i++) {
                newsMapper.insertNewsImage(news.getId(), imagePaths.get(i), i);
            }
        }
    }

    public void delete(Long id) {
        newsMapper.deleteNews(id);
    }

    public List<String> saveFiles(List<MultipartFile> files, String uploadDir) throws IOException {
        List<String> paths = new ArrayList<>();
        if (files == null || files.isEmpty()) return paths;

        File dir = new File(uploadDir + "/news");
        if (!dir.exists()) dir.mkdirs();

        for (MultipartFile file : files) {
            if (file.isEmpty()) continue;
            String original  = file.getOriginalFilename();
            String ext       = original != null && original.contains(".")
                               ? original.substring(original.lastIndexOf("."))
                               : "";
            String fileName  = UUID.randomUUID().toString() + ext;
            file.transferTo(new File(dir, fileName));
            paths.add("/uploads/news/" + fileName);
        }
        return paths;
    }
}
