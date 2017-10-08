package my.com.froggy.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * The pond entity
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
@Entity
@Table(name = "pond")
public class Pond {
	/**
	 * Unique id for this entity
	 */
	@Id
	@GeneratedValue
	private Long id;
	
	/**
	 * The name of the pond
	 */
	private String pondName;
	
	/**
	 * The list of questions under this pond
	 */
	@OneToMany(fetch=FetchType.EAGER)
	@JoinColumn(name="pondId")
	private List<MstQa> questions;

	public Pond() {}

	public Pond(String pondName, List<MstQa> questions) {
		super();
		this.pondName = pondName;
		this.questions = questions;
	}

	public String getPondName() {
		return pondName;
	}

	public List<MstQa> getQuestions() {
		return questions;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setPondName(String pondName) {
		this.pondName = pondName;
	}

	public void setQuestions(List<MstQa> questions) {
		this.questions = questions;
	}
}
