package my.com.froggy.service.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import my.com.froggy.entity.Frog;
import my.com.froggy.repository.FrogRepository;
import my.com.froggy.service.FrogService;

/**
 * The frog service implementation used to execute CRUD
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
@Component("frogService")
public class FrogServiceImpl implements FrogService{
	
	@Autowired
	FrogRepository frogRepository;
	
	@PersistenceContext
	private EntityManager em;

	@Override
	@Transactional
	public Frog findByUsername(final String username) {
		Frog frog = null;
		
		Session session = em.unwrap(Session.class);
		Criteria criteria = session.createCriteria(Frog.class);
		criteria.add(Restrictions.eq("username", username));
		
		frog = (Frog) criteria.uniqueResult();
	    
	    return frog;
	}

	@Override
	public Frog findById(final Long id) {
		return frogRepository.findById(id);
	}

	@Override
	public List<Frog> findAll() {
		return (List<Frog>) frogRepository.findAll();
	}

	@Override
	public boolean save(Frog frog) {
		boolean retVal = true;
		
		try {
			frogRepository.save(frog);
		}
		catch (Exception e) {
			System.out.println(e);
			retVal = false;
		}
		
		return retVal;
	}

}
