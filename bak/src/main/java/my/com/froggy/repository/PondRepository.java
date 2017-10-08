package my.com.froggy.repository;

import org.springframework.data.repository.CrudRepository;

import my.com.froggy.entity.Pond;

/**
 * The pond DAO used to execute CRUD
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
public interface PondRepository extends CrudRepository<Pond, Long>{

}
