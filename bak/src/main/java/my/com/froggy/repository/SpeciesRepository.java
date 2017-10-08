package my.com.froggy.repository;

import org.springframework.data.repository.CrudRepository;

import my.com.froggy.entity.Species;

/**
 * The species DAO used to execute CRUD
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
public interface SpeciesRepository  extends CrudRepository<Species, Long>{

}
