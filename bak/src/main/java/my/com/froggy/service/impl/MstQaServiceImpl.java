package my.com.froggy.service.impl;

import java.util.Iterator;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import my.com.froggy.dto.AnsweredQaItem;
import my.com.froggy.entity.MstQa;
import my.com.froggy.entity.TrxSelfChallenge;
import my.com.froggy.repository.MstQaRepository;
import my.com.froggy.repository.SelfChallengeRepository;
import my.com.froggy.service.MstQaService;

/**
 * The Q&A service implementation used to execute CRUD
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
@Component("mstQaService")
public class MstQaServiceImpl implements MstQaService {
	@Autowired
	MstQaRepository mstQaRepository;
	
	@Autowired
	SelfChallengeRepository selfChallengeRepository;
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public boolean save(MstQa mstQa) {
		boolean retVal = true;
		
		try {
			mstQaRepository.save(mstQa);
		}
		catch (Exception e) {
			System.out.println(e);
			retVal = false;
		}
		
		return retVal;
	}

	@Override
	public MstQa findById(Long id) {
		return (MstQa) mstQaRepository.findOne(id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<MstQa> findAllByPondId(Long pondId) {
		List<MstQa> list = null;
		
		Session session = em.unwrap(Session.class);
		Criteria criteria = session.createCriteria(MstQa.class);
		criteria.add(Restrictions.eq("pondId", pondId));
		
		list = criteria.list();
		
		return list;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<MstQa> find5(Long pondId, byte difficulty) {
		List<MstQa> list = null;
		
		Session session = em.unwrap(Session.class);
		Criteria criteria = session.createCriteria(MstQa.class);
		criteria.add(Restrictions.eq("pondId", pondId));
		criteria.add(Restrictions.eq("difficulty", difficulty));
		criteria.add(Restrictions.sqlRestriction("1=1 order by rand()"));
		criteria.setMaxResults(5);
		
		list = criteria.list();
		
		return list;
	}

	@Override
	public int checkAnswers(List<AnsweredQaItem> answeredItems) {
		int correctAnswers = 0;
		
		if (answeredItems != null && answeredItems.size() > 0) {
			Iterator<AnsweredQaItem> it = answeredItems.iterator();
			AnsweredQaItem item = null;
			MstQa mstQa = null;
			
			while (it.hasNext()) {
				item = it.next();
				mstQa = mstQaRepository.findOne(item.getQaId());
				
				if (mstQa != null && mstQa.getCorrectAnswer() == item.getAnswer()) {
					correctAnswers++;
				}
			}
			
		}
		
		return correctAnswers;
	}

	@Override
	public boolean saveChallenge(TrxSelfChallenge selfChallenge) {
		boolean retVal = true;
		
		try {
			selfChallengeRepository.save(selfChallenge);
		}
		catch (Exception e) {
			System.out.println(e);
			retVal = false;
		}
		
		return retVal;
	}

}
