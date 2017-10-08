package my.com.froggy.service;

import java.util.List;

import my.com.froggy.dto.AnsweredQaItem;
import my.com.froggy.entity.MstQa;
import my.com.froggy.entity.TrxSelfChallenge;

/**
 * The Q&A service used to execute CRUD
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
public interface MstQaService {
	
	/**
	 * Saves Q&A to the database
	 * 
	 * @param mstQa
	 * 		the Q&A Object to save
	 * @return
	 * 		the status of saving request
	 */
	boolean save(MstQa mstQa);
	
	/**
	 * Retrieve Q&A based on id
	 * 
	 * @param id
	 * 		the Q&A id
	 * @return
	 * 		the Q&A Object which coincides with the given id
	 */
	MstQa findById(Long id);
	
	/**
	 * Retrieve all Q&As under a specific pond
	 * 
	 * @param pondId
	 * @return
	 */
	List<MstQa> findAllByPondId(Long pondId);
	
	/**
	 * Retrieve max of 5 random records
	 * 
	 * @param pondId
	 * 		the pond id to search
	 * @param difficulty
	 * 		the difficulty level of the question
	 * @return
	 * 		a maximum of 5 random records
	 */
	List<MstQa> find5(Long pondId, byte difficulty);
	
	/**
	 * Checks the correctness of the answers
	 * 
	 * @param answeredItems
	 * 		the answered items
	 * @return
	 * 		the number of correct answers
	 */
	int checkAnswers(List<AnsweredQaItem> answeredItems);
	
	/**
	 * Persists self challenge
	 * 
	 * @param selfChallenge
	 * 		the self challenge object
	 * @return
	 * 		a flag that returns true if saving is successful, false otherwise
	 */
	boolean saveChallenge(TrxSelfChallenge selfChallenge);
}
