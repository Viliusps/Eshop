package com.pvp.eshop.service;

import com.pvp.eshop.model.Location;
import com.pvp.eshop.repository.LocationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class LocationServiceTest {

    LocationRepository locationRepository;
    LocationService locationService;

    @BeforeEach
    void setup() {
        locationRepository = mock(LocationRepository.class);
        locationService = new LocationService(locationRepository);
    }

    @Test
    void getAllLocations_returnsAllLocations() {
        when(locationRepository.findAll()).thenReturn(List.of(
                Location.builder().id(1).address("Studentu g. 50").company("UAB KTU").longitude("32").lattitude("43").city("Kaunas").state("Kauno raj.").build(),
                Location.builder().id(2).address("Autobusu g. 33B").company("UAB Vilniaus autobusai").longitude("87").lattitude("33").city("Vilnius").state("Vilniaus raj.").build(),
                Location.builder().id(3).address("Gedimino pr. 1").company("UAB Lietuvos prezidentura").longitude("12").lattitude("34").city("Vilnius").state("Vilniaus raj.").build()));

        var result = locationService.getAllLocations();

        assertThat(result.size()).isEqualTo(3);
        assertThat(result.get(0).getId()).isEqualTo(1);
        assertThat(result.get(1).getAddress()).isEqualTo("Autobusu g. 33B");
        assertThat(result.get(2).getCompany()).isEqualTo("UAB Lietuvos prezidentura");
    }

    @Test
    void getAllLocations_returnsEmptyListWhenNoLocations() {
        when(locationRepository.findAll()).thenReturn(List.of());

        var result = locationService.getAllLocations();

        assertThat(result.size()).isEqualTo(0);
    }

    @Test
    void getAllFirms_returnsAllFirms() {
        when(locationRepository.findAllFirms()).thenReturn(List.of(
                Location.builder().id(1).address("Didlaukio g. 47").company("UAB Vilniaus universitetas").longitude("12").lattitude("34").city("Vilnius").state("Vilniaus raj.").build(),
                Location.builder().id(2).address("K. Donelaicio g. 73").company("UAB Kauno technologijos universitetas").longitude("12").lattitude("34").city("Kaunas").state("Kauno raj.").build()));

        var result = locationService.getAllFirms();

        assertThat(result.size()).isEqualTo(2);
        assertThat(result.get(0).getId()).isEqualTo(1);
        assertThat(result.get(1).getAddress()).isEqualTo("K. Donelaicio g. 73");
        assertThat(result.get(1).getCompany()).isEqualTo("UAB Kauno technologijos universitetas");
    }

    @Test
    void getAllFirms_returnsEmptyListWhenNoFirms() {
        when(locationRepository.findAllFirms()).thenReturn(List.of());

        var result = locationService.getAllFirms();

        assertThat(result.size()).isEqualTo(0);
    }

    @Test
    void getAllSites_returnsAllSites() {
        when(locationRepository.findAllSites()).thenReturn(List.of(
                Location.builder().id(3).address("Ateities g. 20").company("UAB Vilniaus kolegija").longitude("12").lattitude("34").city("Vilnius").state("Vilniaus raj.").build(),
                Location.builder().id(7).address("Zirmunu g. 1").company("MB Turgaus prekyba").longitude("12").lattitude("34").city("Vilnius").state("Vilniaus raj.").build(),
                Location.builder().id(8).address("Savanoriu pr. 66").company("UAB Maxima LT").longitude("12").lattitude("34").city("Vilnius").state("Vilniaus raj.").build(),
                Location.builder().id(9).address("Ezero g. 2").company("UAB Lietuvos geležinkeliai").longitude("12").lattitude("34").city("Vilnius").state("Vilniaus raj.").build()));

        var result = locationService.getAllSites();

        assertThat(result.size()).isEqualTo(4);
        assertThat(result.get(0).getId()).isEqualTo(3);
        assertThat(result.get(1).getAddress()).isEqualTo("Zirmunu g. 1");
        assertThat(result.get(2).getCompany()).isEqualTo("UAB Maxima LT");
        assertThat(result.get(3).getCity()).isEqualTo("Vilnius");
    }

    @Test
    void getAllSites_returnsEmptyListWhenNoSites() {
        when(locationRepository.findAllSites()).thenReturn(List.of());

        var result = locationService.getAllSites();

        assertThat(result.size()).isEqualTo(0);
    }
}
