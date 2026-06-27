package com.church.daeseong.controller;

import com.church.daeseong.domain.Sermon;
import com.church.daeseong.service.SermonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class SermonController {

    private final SermonService sermonService;

    @GetMapping("/sermons")
    public String sermonsPage(@RequestParam(defaultValue = "all") String type,
                              @RequestParam(defaultValue = "1") int page,
                              Model model) {
        model.addAttribute("sermons", sermonService.getSermons(type, page));
        model.addAttribute("totalPages", sermonService.getTotalPages(type));
        model.addAttribute("currentType", type);
        model.addAttribute("currentPage", page);
        return "sermons-gallery";
    }

    @GetMapping("/api/sermons")
    @ResponseBody
    public Map<String, Object> apiGetSermons(@RequestParam(defaultValue = "all") String type,
                                             @RequestParam(defaultValue = "1") int page,
                                             @RequestParam(defaultValue = "6") int size) {
        Map<String, Object> result = new HashMap<>();
        result.put("sermons", sermonService.getSermons(type, page, size));
        result.put("totalPages", sermonService.getTotalPages(type, size));
        result.put("currentPage", page);
        return result;
    }

    @GetMapping("/api/sermons/{id}")
    @ResponseBody
    public Sermon apiGetSermon(@PathVariable Long id) {
        return sermonService.getSermon(id);
    }

    @PostMapping("/api/sermons")
    @ResponseBody
    public Map<String, Object> apiRegister(@RequestBody Sermon sermon) {
        sermonService.register(sermon);
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("id", sermon.getId());
        return result;
    }

    @PutMapping("/api/sermons/{id}")
    @ResponseBody
    public Map<String, Object> apiUpdate(@PathVariable Long id, @RequestBody Sermon sermon) {
        sermon.setId(id);
        sermonService.update(sermon);
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        return result;
    }

    @DeleteMapping("/api/sermons/{id}")
    @ResponseBody
    public Map<String, Object> apiDelete(@PathVariable Long id) {
        sermonService.delete(id);
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        return result;
    }
}
