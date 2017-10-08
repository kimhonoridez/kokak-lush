package my.com.froggy.service.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import my.com.froggy.entity.Pond;
import my.com.froggy.repository.PondRepository;
import my.com.froggy.service.PondService;

/**
 * The pond service implementation used to execute CRUD
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
@Component("PondService")
public class PondServiceImpl implements PondService{
	@Autowired
	PondRepository pondRepository;
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Pond> findAll() {
		return (List<Pond>) pondRepository.findAll();
	}

	@Override
	public Pond findByName(final String name) {
		Pond pond = null;
		
		Session session = em.unwrap(Session.class);
		Criteria criteria = session.createCriteria(Pond.class);
		
		criteria.add(Restrictions.ilike("pondName", name));
		
		pond = (Pond) criteria.uniqueResult();
		
		return pond;
	}

	@Override
	public boolean save(Pond pond) {
		boolean retVal = true;
		
		try {
			pondRepository.save(pond);
		}
		catch (Exception e) {
			System.out.println(e);
			retVal = false;
		}
		
		return retVal;
	}

	@Override
	public Pond findById(Long id) {
		return (Pond) pondRepository.findOne(id);
	}

}
