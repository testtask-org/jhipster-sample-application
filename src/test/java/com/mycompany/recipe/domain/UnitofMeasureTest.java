package com.mycompany.recipe.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.recipe.web.rest.TestUtil;

public class UnitofMeasureTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UnitofMeasure.class);
        UnitofMeasure unitofMeasure1 = new UnitofMeasure();
        unitofMeasure1.setId(1L);
        UnitofMeasure unitofMeasure2 = new UnitofMeasure();
        unitofMeasure2.setId(unitofMeasure1.getId());
        assertThat(unitofMeasure1).isEqualTo(unitofMeasure2);
        unitofMeasure2.setId(2L);
        assertThat(unitofMeasure1).isNotEqualTo(unitofMeasure2);
        unitofMeasure1.setId(null);
        assertThat(unitofMeasure1).isNotEqualTo(unitofMeasure2);
    }
}
