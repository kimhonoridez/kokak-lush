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
@Table(name = "trx_mating")
public class TrxMating {
	/**
	 * Unique id for this entity
	 */
	@Id
	@GeneratedValue
	private Long id;
	
	/**
	 * The score gained after mating
	 */
	private int score;
	
	/**
	 * Flag to determine if user has won the game or not
	 * <ul>
	 * 	<li>0 - Lost</li>
	 *  <li>1 - Tie</li>
	 *  <li>2 - Won</li>
	 * </ul>
	 */
	private byte isWon;
	
	/**
	 * Date and time mating happened
	 */
	private LocalDateTime matingDateTime;
	
	/**
	 * The self challenge of other frogs to beat
	 */
	@ManyToOne(cascade = CascadeType.ALL)
	private TrxSelfChallenge challengedItem;

	public TrxMating() {}

	public TrxMating(int score, byte isWon, LocalDateTime matingDateTime, TrxSelfChallenge challengedItem) {
		super();
		this.score = score;
		this.isWon = isWon;
		this.matingDateTime = matingDateTime;
		this.challengedItem = challengedItem;
	}

	public int getScore() {
		return score;
	}

	public byte isWon() {
		return isWon;
	}

	public LocalDateTime getMatingDateTime() {
		return matingDateTime;
	}

	public TrxSelfChallenge getChallengedItem() {
		return challengedItem;
	}
}
