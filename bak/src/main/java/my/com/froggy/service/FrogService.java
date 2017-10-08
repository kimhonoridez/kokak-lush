package my.com.froggy.service;

import java.util.List;

import my.com.froggy.entity.Frog;

/**
 * The frog service used to execute CRUD
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
public interface FrogService{
	
	/**
	 * Retrieve frog details based on id
	 * 
	 * @param username
	 * 		the unique frog username
	 * @return
	 * 		the full frog details
	 */
	Frog findByUsername(String username);
	
	/**
	 * Retrieve frog details based on id
	 * 
	 * @param username
	 * 		the unique frog username
	 * @return
	 * 		the full frog details
	 */
	Frog findById(Long id);
	
	/**
	 * Retrieve all frogs from DB
	 * 
	 * @return
	 * 	all frogs from DB
	 */
	List<Frog> findAll();
	
	/**
	 * Insert frog to DB
	 * 
	 * @param frog
	 * 		the frog object containing registration information
	 */
	boolean save(Frog frog);
}
