package com.pvp.eshop.controller;

import java.util.List;

import com.pvp.eshop.model.Location;
import com.pvp.eshop.service.LocationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/locations")
public class LocationController {
    LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping
    public ResponseEntity<List<Location>> getAllLocations() {
        return new ResponseEntity<>(locationService.getAllLocations(), HttpStatus.OK);
    }

    @GetMapping("/firms")
    public ResponseEntity<List<Location>> getAllFirms() {
        return new ResponseEntity<>(locationService.getAllFirms(), HttpStatus.OK);
    }

    @GetMapping("/sites")
    public ResponseEntity<List<Location>> getAllSites() {
        return new ResponseEntity<>(locationService.getAllSites(), HttpStatus.OK);
    }
}