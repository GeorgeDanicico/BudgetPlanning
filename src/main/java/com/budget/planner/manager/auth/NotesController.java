package com.budget.planner.manager.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class NotesController {
    private static final Logger logger = LoggerFactory.getLogger(NotesController.class);

}
