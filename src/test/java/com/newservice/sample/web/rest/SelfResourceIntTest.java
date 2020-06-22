package com.newservice.sample.web.rest;

import com.newservice.sample.TestGithubjekinsApp;

import com.newservice.sample.domain.Self;
import com.newservice.sample.repository.SelfRepository;
import com.newservice.sample.service.SelfService;
import com.newservice.sample.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.newservice.sample.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SelfResource REST controller.
 *
 * @see SelfResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestGithubjekinsApp.class)
public class SelfResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SelfRepository selfRepository;

    

    @Autowired
    private SelfService selfService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSelfMockMvc;

    private Self self;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SelfResource selfResource = new SelfResource(selfService);
        this.restSelfMockMvc = MockMvcBuilders.standaloneSetup(selfResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Self createEntity(EntityManager em) {
        Self self = new Self()
            .name(DEFAULT_NAME);
        return self;
    }

    @Before
    public void initTest() {
        self = createEntity(em);
    }

    @Test
    @Transactional
    public void createSelf() throws Exception {
        int databaseSizeBeforeCreate = selfRepository.findAll().size();

        // Create the Self
        restSelfMockMvc.perform(post("/api/selves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(self)))
            .andExpect(status().isCreated());

        // Validate the Self in the database
        List<Self> selfList = selfRepository.findAll();
        assertThat(selfList).hasSize(databaseSizeBeforeCreate + 1);
        Self testSelf = selfList.get(selfList.size() - 1);
        assertThat(testSelf.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createSelfWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = selfRepository.findAll().size();

        // Create the Self with an existing ID
        self.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSelfMockMvc.perform(post("/api/selves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(self)))
            .andExpect(status().isBadRequest());

        // Validate the Self in the database
        List<Self> selfList = selfRepository.findAll();
        assertThat(selfList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSelves() throws Exception {
        // Initialize the database
        selfRepository.saveAndFlush(self);

        // Get all the selfList
        restSelfMockMvc.perform(get("/api/selves?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(self.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getSelf() throws Exception {
        // Initialize the database
        selfRepository.saveAndFlush(self);

        // Get the self
        restSelfMockMvc.perform(get("/api/selves/{id}", self.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(self.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSelf() throws Exception {
        // Get the self
        restSelfMockMvc.perform(get("/api/selves/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSelf() throws Exception {
        // Initialize the database
        selfService.save(self);

        int databaseSizeBeforeUpdate = selfRepository.findAll().size();

        // Update the self
        Self updatedSelf = selfRepository.findById(self.getId()).get();
        // Disconnect from session so that the updates on updatedSelf are not directly saved in db
        em.detach(updatedSelf);
        updatedSelf
            .name(UPDATED_NAME);

        restSelfMockMvc.perform(put("/api/selves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSelf)))
            .andExpect(status().isOk());

        // Validate the Self in the database
        List<Self> selfList = selfRepository.findAll();
        assertThat(selfList).hasSize(databaseSizeBeforeUpdate);
        Self testSelf = selfList.get(selfList.size() - 1);
        assertThat(testSelf.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSelf() throws Exception {
        int databaseSizeBeforeUpdate = selfRepository.findAll().size();

        // Create the Self

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restSelfMockMvc.perform(put("/api/selves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(self)))
            .andExpect(status().isBadRequest());

        // Validate the Self in the database
        List<Self> selfList = selfRepository.findAll();
        assertThat(selfList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSelf() throws Exception {
        // Initialize the database
        selfService.save(self);

        int databaseSizeBeforeDelete = selfRepository.findAll().size();

        // Get the self
        restSelfMockMvc.perform(delete("/api/selves/{id}", self.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Self> selfList = selfRepository.findAll();
        assertThat(selfList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Self.class);
        Self self1 = new Self();
        self1.setId(1L);
        Self self2 = new Self();
        self2.setId(self1.getId());
        assertThat(self1).isEqualTo(self2);
        self2.setId(2L);
        assertThat(self1).isNotEqualTo(self2);
        self1.setId(null);
        assertThat(self1).isNotEqualTo(self2);
    }
}
