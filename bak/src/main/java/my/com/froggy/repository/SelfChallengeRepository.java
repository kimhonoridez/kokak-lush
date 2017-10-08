package my.com.froggy.repository;

import org.springframework.data.repository.CrudRepository;

import my.com.froggy.entity.TrxSelfChallenge;

/**
 * The Self Challenge DAO used to execute CRUD
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
public interface SelfChallengeRepository extends CrudRepository<TrxSelfChallenge, Long>{

}
