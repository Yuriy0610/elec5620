package com.project.main.utils;

import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import java.util.ArrayList;
import java.util.List;

public class NDJsonHttpMessageConverter extends MappingJackson2HttpMessageConverter {
    public NDJsonHttpMessageConverter() {
        List<MediaType> mediaTypes = new ArrayList<>();
        mediaTypes.add(MediaType.APPLICATION_JSON);
        mediaTypes.add(MediaType.valueOf("application/x-ndjson"));
        setSupportedMediaTypes(mediaTypes);
    }
}