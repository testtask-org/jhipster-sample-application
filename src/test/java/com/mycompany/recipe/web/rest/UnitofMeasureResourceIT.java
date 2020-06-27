package com.mycompany.recipe.web.rest;

import com.mycompany.recipe.RecipeApp;
import com.mycompany.recipe.domain.UnitofMeasure;
import com.mycompany.recipe.repository.UnitofMeasureRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link UnitofMeasureResource} REST controller.
 */
@SpringBootTest(classes = RecipeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class UnitofMeasureResourceIT {

    private static final String DEFAULT_UOM = "AAAAAAAAAA";
    private static final String UPDATED_UOM = "BBBBBBBBBB";

    @Autowired
    private UnitofMeasureRepository unitofMeasureRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUnitofMeasureMockMvc;

    private UnitofMeasure unitofMeasure;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UnitofMeasure createEntity(EntityManager em) {
        UnitofMeasure unitofMeasure = new UnitofMeasure()
            .uom(DEFAULT_UOM);
        return unitofMeasure;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UnitofMeasure createUpdatedEntity(EntityManager em) {
        UnitofMeasure unitofMeasure = new UnitofMeasure()
            .uom(UPDATED_UOM);
        return unitofMeasure;
    }

    @BeforeEach
    public void initTest() {
        unitofMeasure = createEntity(em);
    }

    @Test
    @Transactional
    public void createUnitofMeasure() throws Exception {
        int databaseSizeBeforeCreate = unitofMeasureRepository.findAll().size();
        // Create the UnitofMeasure
        restUnitofMeasureMockMvc.perform(post("/api/unitof-measures")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unitofMeasure)))
            .andExpect(status().isCreated());

        // Validate the UnitofMeasure in the database
        List<UnitofMeasure> unitofMeasureList = unitofMeasureRepository.findAll();
        assertThat(unitofMeasureList).hasSize(databaseSizeBeforeCreate + 1);
        UnitofMeasure testUnitofMeasure = unitofMeasureList.get(unitofMeasureList.size() - 1);
        assertThat(testUnitofMeasure.getUom()).isEqualTo(DEFAULT_UOM);
    }

    @Test
    @Transactional
    public void createUnitofMeasureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = unitofMeasureRepository.findAll().size();

        // Create the UnitofMeasure with an existing ID
        unitofMeasure.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUnitofMeasureMockMvc.perform(post("/api/unitof-measures")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unitofMeasure)))
            .andExpect(status().isBadRequest());

        // Validate the UnitofMeasure in the database
        List<UnitofMeasure> unitofMeasureList = unitofMeasureRepository.findAll();
        assertThat(unitofMeasureList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUnitofMeasures() throws Exception {
        // Initialize the database
        unitofMeasureRepository.saveAndFlush(unitofMeasure);

        // Get all the unitofMeasureList
        restUnitofMeasureMockMvc.perform(get("/api/unitof-measures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(unitofMeasure.getId().intValue())))
            .andExpect(jsonPath("$.[*].uom").value(hasItem(DEFAULT_UOM)));
    }
    
    @Test
    @Transactional
    public void getUnitofMeasure() throws Exception {
        // Initialize the database
        unitofMeasureRepository.saveAndFlush(unitofMeasure);

        // Get the unitofMeasure
        restUnitofMeasureMockMvc.perform(get("/api/unitof-measures/{id}", unitofMeasure.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(unitofMeasure.getId().intValue()))
            .andExpect(jsonPath("$.uom").value(DEFAULT_UOM));
    }
    @Test
    @Transactional
    public void getNonExistingUnitofMeasure() throws Exception {
        // Get the unitofMeasure
        restUnitofMeasureMockMvc.perform(get("/api/unitof-measures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUnitofMeasure() throws Exception {
        // Initialize the database
        unitofMeasureRepository.saveAndFlush(unitofMeasure);

        int databaseSizeBeforeUpdate = unitofMeasureRepository.findAll().size();

        // Update the unitofMeasure
        UnitofMeasure updatedUnitofMeasure = unitofMeasureRepository.findById(unitofMeasure.getId()).get();
        // Disconnect from session so that the updates on updatedUnitofMeasure are not directly saved in db
        em.detach(updatedUnitofMeasure);
        updatedUnitofMeasure
            .uom(UPDATED_UOM);

        restUnitofMeasureMockMvc.perform(put("/api/unitof-measures")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUnitofMeasure)))
            .andExpect(status().isOk());

        // Validate the UnitofMeasure in the database
        List<UnitofMeasure> unitofMeasureList = unitofMeasureRepository.findAll();
        assertThat(unitofMeasureList).hasSize(databaseSizeBeforeUpdate);
        UnitofMeasure testUnitofMeasure = unitofMeasureList.get(unitofMeasureList.size() - 1);
        assertThat(testUnitofMeasure.getUom()).isEqualTo(UPDATED_UOM);
    }

    @Test
    @Transactional
    public void updateNonExistingUnitofMeasure() throws Exception {
        int databaseSizeBeforeUpdate = unitofMeasureRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUnitofMeasureMockMvc.perform(put("/api/unitof-measures")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unitofMeasure)))
            .andExpect(status().isBadRequest());

        // Validate the UnitofMeasure in the database
        List<UnitofMeasure> unitofMeasureList = unitofMeasureRepository.findAll();
        assertThat(unitofMeasureList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUnitofMeasure() throws Exception {
        // Initialize the database
        unitofMeasureRepository.saveAndFlush(unitofMeasure);

        int databaseSizeBeforeDelete = unitofMeasureRepository.findAll().size();

        // Delete the unitofMeasure
        restUnitofMeasureMockMvc.perform(delete("/api/unitof-measures/{id}", unitofMeasure.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UnitofMeasure> unitofMeasureList = unitofMeasureRepository.findAll();
        assertThat(unitofMeasureList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
