package com.pvp.eshop.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.pvp.eshop.model.Location;
import com.pvp.eshop.repository.LocationRepository;
import com.pvp.eshop.testutils.DatabaseTestDataCleaner;
import com.pvp.eshop.testutils.IntegrationTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;

import java.util.List;

@IntegrationTest
public class LocationsControllerTest {
    @Autowired TestRestTemplate restTemplate;
    @Autowired DatabaseTestDataCleaner databaseTestDataCleaner;
    @Autowired LocationRepository locationRepository;
    @BeforeEach
    public void init() {
        databaseTestDataCleaner.cleanUpTestData();
    }

    @Test
    void getAllLocations_whenLocationsArePresent_shouldCorrectlyReturnLocations() {
        var locations = List.of(
                Location.builder().address("Test address1").company("Test company1").longitude("1").lattitude("11").city("Test city1").state("Test state1").build(),
                Location.builder().address("Test address2").company("Test company2").longitude("2").lattitude("22").city("Test city2").state("Test state2").build(),
                Location.builder().address("Test address3").company("Test company3").longitude("3").lattitude("33").city("Test city3").state("Test state3").build()
        );
        locationRepository.saveAll(locations);

        var response = restTemplate.getForEntity("/api/v1/locations", Location[].class);
        var object = response.getBody();

        assertThat(object).isNotNull();
        assertThat(object.length).isEqualTo(3);
    }

    @Test
    void getAllFirms_whenFirmsArePresent_shouldCorrectlyReturnAllFirms() {
        var locations = List.of(
                Location.builder().address("Test address1").company("Test company1").longitude("1").lattitude("11").city("Test city1").state("Test state1").build(),
                Location.builder().address("Test address2").company("Test company2 (GYVENTOJAMS)").longitude("2").lattitude("22").city("Test city2").state("Test state2").build(),
                Location.builder().address("Test address3").company("Test company3").longitude("3").lattitude("33").city("Test city3").state("Test state3").build()
        );
        locationRepository.saveAll(locations);

        var response = restTemplate.getForEntity("/api/v1/locations/firms", Location[].class);
        var object = response.getBody();

        assertThat(object).isNotNull();
        assertThat(object.length).isEqualTo(2);
    }

    @Test
    void getAllSites_whenSitesArePresent_shouldCorrectlyReturnAllSites() {
        var locations = List.of(
                Location.builder().address("Test address1").company("Test company1").longitude("1").lattitude("11").city("Test city1").state("Test state1").build(),
                Location.builder().address("Test address2").company("Test company2 (GYVENTOJAMS)").longitude("2").lattitude("22").city("Test city2").state("Test state2").build(),
                Location.builder().address("Test address3").company("Test company3").longitude("3").lattitude("33").city("Test city3").state("Test state3").build()
        );
        locationRepository.saveAll(locations);

        var response = restTemplate.getForEntity("/api/v1/locations/sites", Location[].class);
        var object = response.getBody();

        assertThat(object).isNotNull();
        assertThat(object.length).isEqualTo(1);
    }

}
