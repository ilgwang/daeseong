package com.church.daeseong.domain;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Data
public class Sermon {
    private Long id;
    private String title;
    private String pastor;
    private String type;        // sunday, wednesday, friday
    private String verse;
    private LocalDate sermonDate;
    private String youtubeUrl;
    private Integer startTime;
    private LocalDateTime createdAt;

    public String getYoutubeId() {
        if (youtubeUrl == null) return null;
        Matcher m = Pattern.compile("[?&]v=([^&\\s]+)").matcher(youtubeUrl);
        return m.find() ? m.group(1) : null;
    }
}
