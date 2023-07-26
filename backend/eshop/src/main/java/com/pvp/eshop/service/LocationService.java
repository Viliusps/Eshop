package com.pvp.eshop.service;

import java.util.List;

import com.pvp.eshop.model.Location;
import com.pvp.eshop.repository.LocationRepository;
import org.springframework.stereotype.Service;


@Service
public class LocationService {
    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public List<Location> getAllFirms() {
        return locationRepository.findAllFirms();
    }

    public List<Location> getAllSites() {
        return locationRepository.findAllSites();
    }
}