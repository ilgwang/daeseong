package com.church.daeseong.service;

import com.church.daeseong.domain.News;
import com.church.daeseong.mapper.NewsMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final NewsMapper newsMapper;
    private static final int PAGE_SIZE = 10;

    public List<News> getNews(String type, int page) {
        int offset = (page - 1) * PAGE_SIZE;
        return newsMapper.selectNews(type, offset, PAGE_SIZE);
    }

    public int getTotalPages(String type) {
        int total = newsMapper.countNews(type);
        return (int) Math.ceil((double) total / PAGE_SIZE);
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
}
