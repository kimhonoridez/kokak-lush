package my.com.froggy.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import javax.persistence.GeneratedValue;

/**
 * The frog entity
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
@Entity
@Table(name = "frog")
public class Frog {
	/**
	 * Unique id for this entity
	 */
	@Id
	@GeneratedValue
	private Long id;
	
	/**
	 * The frog's first name
	 */
	@NotNull  
	@Size(min = 1)
	private String firstName;
	
	/**
	 * The frog's last name
	 */
	@NotNull  
	@Size(min = 1)
	private String lastName;
	
	/**
	 * The frog's gender
	 * <ul>
	 * 	<li><b>M</b> - Male</li>
	 * 	<li><b>F</b> - Female</li>
	 * 	<li><b>X</b> - Indeterminate</li>
	 * </ul>
	 */
	private char gender;
	
	/**
	 * The date the frog's egg was laid
	 */
	@JsonSerialize(using = LocalDateSerializer.class)
	private LocalDate birthDate;
	
	/**
	 * The username to be used during login
	 */
	private String username;
	
	/**
	 * The signed user key which is a combination of username, password and birth date
	 */
	private String userKey;
	
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime createdDate;
	
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime updatedDate;
	
	private int totalPoints = 0;
	private boolean isAdmin = false;
	
	/**
	 * The species the frog belongs to
	 */
	@ManyToOne(cascade = CascadeType.ALL)
	private Species species;

	/**
	 * Default constructor
	 */
	public Frog() {}

	public Frog(String firstName, String lastName, char gender, LocalDate birthDate, Species species, String username, String userKey) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.birthDate = birthDate;
		this.species = species;
		this.username = username;
		this.userKey = userKey;
	}

	public Long getId() {
		return id;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public char getGender() {
		return gender;
	}

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public Species getSpecies() {
		return species;
	}

	public String getUsername() {
		return username;
	}

	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}

	public String getUserKey() {
		return userKey;
	}

	public void setUserKey(String userKey) {
		this.userKey = userKey;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setGender(char gender) {
		this.gender = gender;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setSpecies(Species species) {
		this.species = species;
	}

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}

	public LocalDateTime getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(LocalDateTime updatedDate) {
		this.updatedDate = updatedDate;
	}

	public int getTotalPoints() {
		return totalPoints;
	}

	public void setTotalPoints(int totalPoints) {
		this.totalPoints = totalPoints;
	}

	@Override
	public String toString() {
		return "Frog [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", gender=" + gender
				+ ", birthDate=" + birthDate + ", username=" + username + ", userKey=" + userKey + ", createdDate="
				+ createdDate + ", updatedDate=" + updatedDate + ", totalPoints=" + totalPoints + ", species=" + species
				+ "]";
	}

	public boolean isAdmin() {
		return isAdmin;
	}

	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}
}
