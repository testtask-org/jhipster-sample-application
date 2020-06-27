package com.mycompany.recipe.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Notes.
 */
@Entity
@Table(name = "notes")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Notes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "notes")
    private String notes;

    @ManyToMany(mappedBy = "notes")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Category> categories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNotes() {
        return notes;
    }

    public Notes notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public Notes categories(Set<Category> categories) {
        this.categories = categories;
        return this;
    }

    public Notes addCategory(Category category) {
        this.categories.add(category);
        category.getNotes().add(this);
        return this;
    }

    public Notes removeCategory(Category category) {
        this.categories.remove(category);
        category.getNotes().remove(this);
        return this;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Notes)) {
            return false;
        }
        return id != null && id.equals(((Notes) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Notes{" +
            "id=" + getId() +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
