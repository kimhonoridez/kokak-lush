package my.com.froggy.service.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import my.com.froggy.entity.Species;
import my.com.froggy.repository.SpeciesRepository;
import my.com.froggy.service.SpeciesService;

/**
 * The species service implementation used to execute CRUD
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
@Component("speciesService")
@Transactional
public class SpeciesServiceImpl implements SpeciesService {
	@Autowired
	SpeciesRepository speciesRepository;
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Species> findAll() {
		return (List<Species>) speciesRepository.findAll();
	}

}
