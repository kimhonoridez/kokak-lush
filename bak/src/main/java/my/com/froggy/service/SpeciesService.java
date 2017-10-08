package my.com.froggy.service;

import java.util.List;

import my.com.froggy.entity.Species;

/**
 * 
 * @author KimHonoridez
 * @version 0.0.1
 * 
 */
public interface SpeciesService {
	
	/**
	 * Retrieves list of all species
	 * 
	 * @return
	 * 	list of all species
	 */
	List<Species> findAll();
}
