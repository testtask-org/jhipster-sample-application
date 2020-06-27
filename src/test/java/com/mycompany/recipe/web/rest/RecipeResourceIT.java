package com.mycompany.recipe.web.rest;

import com.mycompany.recipe.RecipeApp;
import com.mycompany.recipe.domain.Recipe;
import com.mycompany.recipe.repository.RecipeRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.recipe.domain.enumeration.Difficulty;
/**
 * Integration tests for the {@link RecipeResource} REST controller.
 */
@SpringBootTest(classes = RecipeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RecipeResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_PREP_TIME = 1;
    private static final Integer UPDATED_PREP_TIME = 2;

    private static final Integer DEFAULT_COOK_TIME = 1;
    private static final Integer UPDATED_COOK_TIME = 2;

    private static final Integer DEFAULT_SERVINGS = 1;
    private static final Integer UPDATED_SERVINGS = 2;

    private static final String DEFAULT_SOURCE = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECTIONS = "AAAAAAAAAA";
    private static final String UPDATED_DIRECTIONS = "BBBBBBBBBB";

    private static final Difficulty DEFAULT_DIFFICULTY = Difficulty.EASY;
    private static final Difficulty UPDATED_DIFFICULTY = Difficulty.MODERATE;

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRecipeMockMvc;

    private Recipe recipe;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Recipe createEntity(EntityManager em) {
        Recipe recipe = new Recipe()
            .description(DEFAULT_DESCRIPTION)
            .prepTime(DEFAULT_PREP_TIME)
            .cookTime(DEFAULT_COOK_TIME)
            .servings(DEFAULT_SERVINGS)
            .source(DEFAULT_SOURCE)
            .url(DEFAULT_URL)
            .directions(DEFAULT_DIRECTIONS)
            .difficulty(DEFAULT_DIFFICULTY)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE);
        return recipe;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Recipe createUpdatedEntity(EntityManager em) {
        Recipe recipe = new Recipe()
            .description(UPDATED_DESCRIPTION)
            .prepTime(UPDATED_PREP_TIME)
            .cookTime(UPDATED_COOK_TIME)
            .servings(UPDATED_SERVINGS)
            .source(UPDATED_SOURCE)
            .url(UPDATED_URL)
            .directions(UPDATED_DIRECTIONS)
            .difficulty(UPDATED_DIFFICULTY)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE);
        return recipe;
    }

    @BeforeEach
    public void initTest() {
        recipe = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecipe() throws Exception {
        int databaseSizeBeforeCreate = recipeRepository.findAll().size();
        // Create the Recipe
        restRecipeMockMvc.perform(post("/api/recipes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recipe)))
            .andExpect(status().isCreated());

        // Validate the Recipe in the database
        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeCreate + 1);
        Recipe testRecipe = recipeList.get(recipeList.size() - 1);
        assertThat(testRecipe.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRecipe.getPrepTime()).isEqualTo(DEFAULT_PREP_TIME);
        assertThat(testRecipe.getCookTime()).isEqualTo(DEFAULT_COOK_TIME);
        assertThat(testRecipe.getServings()).isEqualTo(DEFAULT_SERVINGS);
        assertThat(testRecipe.getSource()).isEqualTo(DEFAULT_SOURCE);
        assertThat(testRecipe.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testRecipe.getDirections()).isEqualTo(DEFAULT_DIRECTIONS);
        assertThat(testRecipe.getDifficulty()).isEqualTo(DEFAULT_DIFFICULTY);
        assertThat(testRecipe.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testRecipe.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createRecipeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recipeRepository.findAll().size();

        // Create the Recipe with an existing ID
        recipe.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecipeMockMvc.perform(post("/api/recipes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recipe)))
            .andExpect(status().isBadRequest());

        // Validate the Recipe in the database
        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRecipes() throws Exception {
        // Initialize the database
        recipeRepository.saveAndFlush(recipe);

        // Get all the recipeList
        restRecipeMockMvc.perform(get("/api/recipes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recipe.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].prepTime").value(hasItem(DEFAULT_PREP_TIME)))
            .andExpect(jsonPath("$.[*].cookTime").value(hasItem(DEFAULT_COOK_TIME)))
            .andExpect(jsonPath("$.[*].servings").value(hasItem(DEFAULT_SERVINGS)))
            .andExpect(jsonPath("$.[*].source").value(hasItem(DEFAULT_SOURCE)))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].directions").value(hasItem(DEFAULT_DIRECTIONS)))
            .andExpect(jsonPath("$.[*].difficulty").value(hasItem(DEFAULT_DIFFICULTY.toString())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))));
    }
    
    @Test
    @Transactional
    public void getRecipe() throws Exception {
        // Initialize the database
        recipeRepository.saveAndFlush(recipe);

        // Get the recipe
        restRecipeMockMvc.perform(get("/api/recipes/{id}", recipe.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(recipe.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.prepTime").value(DEFAULT_PREP_TIME))
            .andExpect(jsonPath("$.cookTime").value(DEFAULT_COOK_TIME))
            .andExpect(jsonPath("$.servings").value(DEFAULT_SERVINGS))
            .andExpect(jsonPath("$.source").value(DEFAULT_SOURCE))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.directions").value(DEFAULT_DIRECTIONS))
            .andExpect(jsonPath("$.difficulty").value(DEFAULT_DIFFICULTY.toString()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)));
    }
    @Test
    @Transactional
    public void getNonExistingRecipe() throws Exception {
        // Get the recipe
        restRecipeMockMvc.perform(get("/api/recipes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecipe() throws Exception {
        // Initialize the database
        recipeRepository.saveAndFlush(recipe);

        int databaseSizeBeforeUpdate = recipeRepository.findAll().size();

        // Update the recipe
        Recipe updatedRecipe = recipeRepository.findById(recipe.getId()).get();
        // Disconnect from session so that the updates on updatedRecipe are not directly saved in db
        em.detach(updatedRecipe);
        updatedRecipe
            .description(UPDATED_DESCRIPTION)
            .prepTime(UPDATED_PREP_TIME)
            .cookTime(UPDATED_COOK_TIME)
            .servings(UPDATED_SERVINGS)
            .source(UPDATED_SOURCE)
            .url(UPDATED_URL)
            .directions(UPDATED_DIRECTIONS)
            .difficulty(UPDATED_DIFFICULTY)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE);

        restRecipeMockMvc.perform(put("/api/recipes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRecipe)))
            .andExpect(status().isOk());

        // Validate the Recipe in the database
        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeUpdate);
        Recipe testRecipe = recipeList.get(recipeList.size() - 1);
        assertThat(testRecipe.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRecipe.getPrepTime()).isEqualTo(UPDATED_PREP_TIME);
        assertThat(testRecipe.getCookTime()).isEqualTo(UPDATED_COOK_TIME);
        assertThat(testRecipe.getServings()).isEqualTo(UPDATED_SERVINGS);
        assertThat(testRecipe.getSource()).isEqualTo(UPDATED_SOURCE);
        assertThat(testRecipe.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testRecipe.getDirections()).isEqualTo(UPDATED_DIRECTIONS);
        assertThat(testRecipe.getDifficulty()).isEqualTo(UPDATED_DIFFICULTY);
        assertThat(testRecipe.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testRecipe.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingRecipe() throws Exception {
        int databaseSizeBeforeUpdate = recipeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecipeMockMvc.perform(put("/api/recipes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recipe)))
            .andExpect(status().isBadRequest());

        // Validate the Recipe in the database
        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRecipe() throws Exception {
        // Initialize the database
        recipeRepository.saveAndFlush(recipe);

        int databaseSizeBeforeDelete = recipeRepository.findAll().size();

        // Delete the recipe
        restRecipeMockMvc.perform(delete("/api/recipes/{id}", recipe.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
