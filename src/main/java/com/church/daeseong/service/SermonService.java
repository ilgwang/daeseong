package com.church.daeseong.service;

import com.church.daeseong.domain.Sermon;
import com.church.daeseong.mapper.SermonMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SermonService {

    private final SermonMapper sermonMapper;
    private static final int PAGE_SIZE = 6;

    public List<Sermon> getSermons(String type, int page) {
        int offset = (page - 1) * PAGE_SIZE;
        return sermonMapper.selectSermons(type, offset, PAGE_SIZE);
    }

    public List<Sermon> getSermons(String type, int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        return sermonMapper.selectSermons(type, offset, pageSize);
    }

    public int getTotalPages(String type) {
        int total = sermonMapper.countSermons(type);
        return (int) Math.ceil((double) total / PAGE_SIZE);
    }

    public int getTotalPages(String type, int pageSize) {
        int total = sermonMapper.countSermons(type);
        return (int) Math.ceil((double) total / pageSize);
    }

    public Sermon getSermon(Long id) {
        return sermonMapper.selectById(id);
    }

    public void register(Sermon sermon) {
        sermonMapper.insertSermon(sermon);
    }

    public void update(Sermon sermon) {
        sermonMapper.updateSermon(sermon);
    }

    public void delete(Long id) {
        sermonMapper.deleteSermon(id);
    }
}
