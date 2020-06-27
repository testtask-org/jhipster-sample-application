package com.mycompany.recipe.web.rest;

import com.mycompany.recipe.domain.UnitofMeasure;
import com.mycompany.recipe.repository.UnitofMeasureRepository;
import com.mycompany.recipe.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.recipe.domain.UnitofMeasure}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UnitofMeasureResource {

    private final Logger log = LoggerFactory.getLogger(UnitofMeasureResource.class);

    private static final String ENTITY_NAME = "unitofMeasure";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UnitofMeasureRepository unitofMeasureRepository;

    public UnitofMeasureResource(UnitofMeasureRepository unitofMeasureRepository) {
        this.unitofMeasureRepository = unitofMeasureRepository;
    }

    /**
     * {@code POST  /unitof-measures} : Create a new unitofMeasure.
     *
     * @param unitofMeasure the unitofMeasure to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new unitofMeasure, or with status {@code 400 (Bad Request)} if the unitofMeasure has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/unitof-measures")
    public ResponseEntity<UnitofMeasure> createUnitofMeasure(@RequestBody UnitofMeasure unitofMeasure) throws URISyntaxException {
        log.debug("REST request to save UnitofMeasure : {}", unitofMeasure);
        if (unitofMeasure.getId() != null) {
            throw new BadRequestAlertException("A new unitofMeasure cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UnitofMeasure result = unitofMeasureRepository.save(unitofMeasure);
        return ResponseEntity.created(new URI("/api/unitof-measures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /unitof-measures} : Updates an existing unitofMeasure.
     *
     * @param unitofMeasure the unitofMeasure to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated unitofMeasure,
     * or with status {@code 400 (Bad Request)} if the unitofMeasure is not valid,
     * or with status {@code 500 (Internal Server Error)} if the unitofMeasure couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/unitof-measures")
    public ResponseEntity<UnitofMeasure> updateUnitofMeasure(@RequestBody UnitofMeasure unitofMeasure) throws URISyntaxException {
        log.debug("REST request to update UnitofMeasure : {}", unitofMeasure);
        if (unitofMeasure.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UnitofMeasure result = unitofMeasureRepository.save(unitofMeasure);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, unitofMeasure.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /unitof-measures} : get all the unitofMeasures.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of unitofMeasures in body.
     */
    @GetMapping("/unitof-measures")
    public List<UnitofMeasure> getAllUnitofMeasures() {
        log.debug("REST request to get all UnitofMeasures");
        return unitofMeasureRepository.findAll();
    }

    /**
     * {@code GET  /unitof-measures/:id} : get the "id" unitofMeasure.
     *
     * @param id the id of the unitofMeasure to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the unitofMeasure, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/unitof-measures/{id}")
    public ResponseEntity<UnitofMeasure> getUnitofMeasure(@PathVariable Long id) {
        log.debug("REST request to get UnitofMeasure : {}", id);
        Optional<UnitofMeasure> unitofMeasure = unitofMeasureRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(unitofMeasure);
    }

    /**
     * {@code DELETE  /unitof-measures/:id} : delete the "id" unitofMeasure.
     *
     * @param id the id of the unitofMeasure to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/unitof-measures/{id}")
    public ResponseEntity<Void> deleteUnitofMeasure(@PathVariable Long id) {
        log.debug("REST request to delete UnitofMeasure : {}", id);
        unitofMeasureRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
