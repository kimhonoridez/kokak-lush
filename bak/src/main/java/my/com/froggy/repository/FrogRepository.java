package my.com.froggy.repository;

import org.springframework.data.repository.CrudRepository;

import my.com.froggy.entity.Frog;

/**
 * The frog DAO used to execute CRUD
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
public interface FrogRepository extends CrudRepository<Frog, Long>{
	
	/**
	 * Retrieve frog details based on id
	 * 
	 * @param id
	 * 		the unique frog id
	 * @return
	 * 		the full frog details
	 */
	Frog findById(Long id);
}
