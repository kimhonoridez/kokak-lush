package my.com.froggy.service;

import java.util.List;

import my.com.froggy.entity.Pond;

/**
 * The master pond service used to execute CRUD
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
public interface PondService {
	/**
	 * Retrieve all ponds from DB
	 * 
	 * @return
	 * 	all ponds from DB
	 */
	List<Pond> findAll();
	
	/**
	 * Find pond by pond name
	 * 
	 * @param name
	 * 		the pond name
	 * @return
	 * 		the pond object that coincides with the pond name
	 */
	Pond findByName(String name);
	
	/**
	 * Find pond by id
	 * 
	 * @param id
	 * 		the pond id
	 * @return
	 * 		the pond object that coincides with the id
	 */
	Pond findById(Long id);
	
	/**
	 * 
	 * @param pond
	 * 		the pond object containing the pond name
	 * @return
	 * 		status of saving request
	 */
	boolean save(Pond pond);
}
