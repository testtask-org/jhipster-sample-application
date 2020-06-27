package com.mycompany.recipe.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.recipe.web.rest.TestUtil;

public class NotesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Notes.class);
        Notes notes1 = new Notes();
        notes1.setId(1L);
        Notes notes2 = new Notes();
        notes2.setId(notes1.getId());
        assertThat(notes1).isEqualTo(notes2);
        notes2.setId(2L);
        assertThat(notes1).isNotEqualTo(notes2);
        notes1.setId(null);
        assertThat(notes1).isNotEqualTo(notes2);
    }
}
