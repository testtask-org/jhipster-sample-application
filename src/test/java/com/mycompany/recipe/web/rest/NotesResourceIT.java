package com.mycompany.recipe.web.rest;

import com.mycompany.recipe.RecipeApp;
import com.mycompany.recipe.domain.Notes;
import com.mycompany.recipe.repository.NotesRepository;

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
 * Integration tests for the {@link NotesResource} REST controller.
 */
@SpringBootTest(classes = RecipeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class NotesResourceIT {

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    @Autowired
    private NotesRepository notesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNotesMockMvc;

    private Notes notes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Notes createEntity(EntityManager em) {
        Notes notes = new Notes()
            .notes(DEFAULT_NOTES);
        return notes;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Notes createUpdatedEntity(EntityManager em) {
        Notes notes = new Notes()
            .notes(UPDATED_NOTES);
        return notes;
    }

    @BeforeEach
    public void initTest() {
        notes = createEntity(em);
    }

    @Test
    @Transactional
    public void createNotes() throws Exception {
        int databaseSizeBeforeCreate = notesRepository.findAll().size();
        // Create the Notes
        restNotesMockMvc.perform(post("/api/notes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(notes)))
            .andExpect(status().isCreated());

        // Validate the Notes in the database
        List<Notes> notesList = notesRepository.findAll();
        assertThat(notesList).hasSize(databaseSizeBeforeCreate + 1);
        Notes testNotes = notesList.get(notesList.size() - 1);
        assertThat(testNotes.getNotes()).isEqualTo(DEFAULT_NOTES);
    }

    @Test
    @Transactional
    public void createNotesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = notesRepository.findAll().size();

        // Create the Notes with an existing ID
        notes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNotesMockMvc.perform(post("/api/notes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(notes)))
            .andExpect(status().isBadRequest());

        // Validate the Notes in the database
        List<Notes> notesList = notesRepository.findAll();
        assertThat(notesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNotes() throws Exception {
        // Initialize the database
        notesRepository.saveAndFlush(notes);

        // Get all the notesList
        restNotesMockMvc.perform(get("/api/notes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(notes.getId().intValue())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES)));
    }
    
    @Test
    @Transactional
    public void getNotes() throws Exception {
        // Initialize the database
        notesRepository.saveAndFlush(notes);

        // Get the notes
        restNotesMockMvc.perform(get("/api/notes/{id}", notes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(notes.getId().intValue()))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES));
    }
    @Test
    @Transactional
    public void getNonExistingNotes() throws Exception {
        // Get the notes
        restNotesMockMvc.perform(get("/api/notes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNotes() throws Exception {
        // Initialize the database
        notesRepository.saveAndFlush(notes);

        int databaseSizeBeforeUpdate = notesRepository.findAll().size();

        // Update the notes
        Notes updatedNotes = notesRepository.findById(notes.getId()).get();
        // Disconnect from session so that the updates on updatedNotes are not directly saved in db
        em.detach(updatedNotes);
        updatedNotes
            .notes(UPDATED_NOTES);

        restNotesMockMvc.perform(put("/api/notes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNotes)))
            .andExpect(status().isOk());

        // Validate the Notes in the database
        List<Notes> notesList = notesRepository.findAll();
        assertThat(notesList).hasSize(databaseSizeBeforeUpdate);
        Notes testNotes = notesList.get(notesList.size() - 1);
        assertThat(testNotes.getNotes()).isEqualTo(UPDATED_NOTES);
    }

    @Test
    @Transactional
    public void updateNonExistingNotes() throws Exception {
        int databaseSizeBeforeUpdate = notesRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNotesMockMvc.perform(put("/api/notes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(notes)))
            .andExpect(status().isBadRequest());

        // Validate the Notes in the database
        List<Notes> notesList = notesRepository.findAll();
        assertThat(notesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNotes() throws Exception {
        // Initialize the database
        notesRepository.saveAndFlush(notes);

        int databaseSizeBeforeDelete = notesRepository.findAll().size();

        // Delete the notes
        restNotesMockMvc.perform(delete("/api/notes/{id}", notes.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Notes> notesList = notesRepository.findAll();
        assertThat(notesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
