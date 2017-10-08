package my.com.froggy.repository;

import org.springframework.data.repository.CrudRepository;

import my.com.froggy.entity.MstQa;

/**
 * The Q&A DAO used to execute CRUD
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
public interface MstQaRepository extends CrudRepository<MstQa, Long> {

}
