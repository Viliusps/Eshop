package com.pvp.eshop.repository;

import java.util.List;

import com.pvp.eshop.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    @Query(
            value = "SELECT * FROM locations WHERE company NOT LIKE '%GYVENTOJAMS%'",
            nativeQuery = true
    )
    List<Location> findAllFirms();

    @Query(
            value = "SELECT * FROM locations WHERE company LIKE '%GYVENTOJAMS%'",
            nativeQuery = true
    )
    List<Location> findAllSites();
}