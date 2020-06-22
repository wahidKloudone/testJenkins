package com.newservice.sample.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.newservice.sample.domain.Self;
import com.newservice.sample.service.SelfService;
import com.newservice.sample.web.rest.errors.BadRequestAlertException;
import com.newservice.sample.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Self.
 */
@RestController
@RequestMapping("/api")
public class SelfResource {

    private final Logger log = LoggerFactory.getLogger(SelfResource.class);

    private static final String ENTITY_NAME = "self";

    private final SelfService selfService;

    public SelfResource(SelfService selfService) {
        this.selfService = selfService;
    }

    /**
     * POST  /selves : Create a new self.
     *
     * @param self the self to create
     * @return the ResponseEntity with status 201 (Created) and with body the new self, or with status 400 (Bad Request) if the self has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/selves")
    @Timed
    public ResponseEntity<Self> createSelf(@RequestBody Self self) throws URISyntaxException {
        log.debug("REST request to save Self : {}", self);
        if (self.getId() != null) {
            throw new BadRequestAlertException("A new self cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Self result = selfService.save(self);
        return ResponseEntity.created(new URI("/api/selves/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /selves : Updates an existing self.
     *
     * @param self the self to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated self,
     * or with status 400 (Bad Request) if the self is not valid,
     * or with status 500 (Internal Server Error) if the self couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/selves")
    @Timed
    public ResponseEntity<Self> updateSelf(@RequestBody Self self) throws URISyntaxException {
        log.debug("REST request to update Self : {}", self);
        if (self.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Self result = selfService.save(self);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, self.getId().toString()))
            .body(result);
    }

    /**
     * GET  /selves : get all the selves.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of selves in body
     */
    @GetMapping("/selves")
    @Timed
    public List<Self> getAllSelves() {
        log.debug("REST request to get all Selves");
        return selfService.findAll();
    }

    /**
     * GET  /selves/:id : get the "id" self.
     *
     * @param id the id of the self to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the self, or with status 404 (Not Found)
     */
    @GetMapping("/selves/{id}")
    @Timed
    public ResponseEntity<Self> getSelf(@PathVariable Long id) {
        log.debug("REST request to get Self : {}", id);
        Optional<Self> self = selfService.findOne(id);
        return ResponseUtil.wrapOrNotFound(self);
    }

    /**
     * DELETE  /selves/:id : delete the "id" self.
     *
     * @param id the id of the self to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/selves/{id}")
    @Timed
    public ResponseEntity<Void> deleteSelf(@PathVariable Long id) {
        log.debug("REST request to delete Self : {}", id);
        selfService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
