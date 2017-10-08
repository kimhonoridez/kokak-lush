package my.com.froggy.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * The species entity
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
@Entity
@Table(name = "mst_species")
public class Species {
	
	/**
	 * Unique id for this entity
	 */
	@Id
	@GeneratedValue
	private Long id;
	
	/**
	 * The species name
	 */
	private String speciesName;

	public Species() {}
	
	public Species(String speciesName) {
		super();
		this.speciesName = speciesName;
	}
	
	public Long getId() {
		return id;
	}

	public String getSpeciesName() {
		return speciesName;
	}
}
