package com.newservice.sample.repository;

import com.newservice.sample.domain.Self;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Self entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SelfRepository extends JpaRepository<Self, Long> {

}
