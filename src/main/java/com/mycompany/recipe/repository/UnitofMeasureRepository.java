package com.mycompany.recipe.repository;

import com.mycompany.recipe.domain.UnitofMeasure;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the UnitofMeasure entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UnitofMeasureRepository extends JpaRepository<UnitofMeasure, Long> {
}
