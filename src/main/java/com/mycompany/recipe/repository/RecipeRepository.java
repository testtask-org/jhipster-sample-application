package com.mycompany.recipe.repository;

import com.mycompany.recipe.domain.Recipe;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Recipe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
