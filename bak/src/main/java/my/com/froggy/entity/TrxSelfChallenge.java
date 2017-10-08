package my.com.froggy.entity;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * The entity used to represent the self challenge taken by the user
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
@Entity
@Table(name = "trx_self_challenge")
public class TrxSelfChallenge {
	
	/**
	 * Unique id for this entity
	 */
	@Id
	@GeneratedValue
	private Long id;
	
	/**
	 * The score of the user after taking the challenge
	 */
	private int score;
	
	/**
	 * The date and time the challenge was taken
	 */
	private LocalDateTime createdDate;
	
	/**
	 * Difficulty level chosen for this challenge
	 */
	private byte difficulty;
	
	/**
	 * The pond chosen for this challenge
	 */
	@ManyToOne(cascade = CascadeType.ALL)
	private Pond pond;
	
	/**
	 * The frog who took the challenge
	 */
	@ManyToOne(cascade = CascadeType.ALL)
	private Frog frog;
	
	/**
	 * Flag to indicate that the challenge has already been taken by another frog
	 */
	private boolean hasMate = false;
	
	/**
	 * The mate who wanted to beat the score of this challenge
	 */
	@ManyToOne(cascade = CascadeType.ALL)
	private Frog mate;
	
	/**
	 * Flag to indicate that the frog has won over the mate
	 */
	private boolean isWon = false;
	
	/**
	 * The date mated
	 */
	private LocalDateTime matedDate;

	public TrxSelfChallenge() {}

	public TrxSelfChallenge(int score, LocalDateTime createdDate, byte difficulty, Pond pond, Frog frog,
			boolean hasMate, Frog mate, boolean isWon, LocalDateTime matedDate) {
		super();
		this.score = score;
		this.createdDate = createdDate;
		this.difficulty = difficulty;
		this.pond = pond;
		this.frog = frog;
		this.hasMate = hasMate;
		this.mate = mate;
		this.isWon = isWon;
		this.matedDate = matedDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}

	public byte getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(byte difficulty) {
		this.difficulty = difficulty;
	}

	public Pond getPond() {
		return pond;
	}

	public void setPond(Pond pond) {
		this.pond = pond;
	}

	public Frog getFrog() {
		return frog;
	}

	public void setFrog(Frog frog) {
		this.frog = frog;
	}

	public boolean isHasMate() {
		return hasMate;
	}

	public void setHasMate(boolean hasMate) {
		this.hasMate = hasMate;
	}

	public Frog getMate() {
		return mate;
	}

	public void setMate(Frog mate) {
		this.mate = mate;
	}

	public boolean isWon() {
		return isWon;
	}

	public void setWon(boolean isWon) {
		this.isWon = isWon;
	}

	public LocalDateTime getMatedDate() {
		return matedDate;
	}

	public void setMatedDate(LocalDateTime matedDate) {
		this.matedDate = matedDate;
	}
}
