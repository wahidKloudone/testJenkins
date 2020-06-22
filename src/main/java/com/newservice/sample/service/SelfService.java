package com.newservice.sample.service;

import com.newservice.sample.domain.Self;
import com.newservice.sample.repository.SelfRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Self.
 */
@Service
@Transactional
public class SelfService {

    private final Logger log = LoggerFactory.getLogger(SelfService.class);

    private final SelfRepository selfRepository;

    public SelfService(SelfRepository selfRepository) {
        this.selfRepository = selfRepository;
    }

    /**
     * Save a self.
     *
     * @param self the entity to save
     * @return the persisted entity
     */
    public Self save(Self self) {
        log.debug("Request to save Self : {}", self);        return selfRepository.save(self);
    }

    /**
     * Get all the selves.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Self> findAll() {
        log.debug("Request to get all Selves");
        return selfRepository.findAll();
    }


    /**
     * Get one self by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Self> findOne(Long id) {
        log.debug("Request to get Self : {}", id);
        return selfRepository.findById(id);
    }

    /**
     * Delete the self by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Self : {}", id);
        selfRepository.deleteById(id);
    }
}
