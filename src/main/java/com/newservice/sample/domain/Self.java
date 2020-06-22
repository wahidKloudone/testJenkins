package com.newservice.sample.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Self.
 */
@Entity
@Table(name = "self")
public class Self implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Self name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Self self = (Self) o;
        if (self.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), self.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Self{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
