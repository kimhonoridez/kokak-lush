package my.com.froggy.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * The q&a master per pond entity
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
@Entity
@Table(name = "mst_qa")
public class MstQa {
	/**
	 * Unique id for this entity
	 */
	@Id
	@GeneratedValue
	private Long id;
	
	/**
	 * The pond id this question belongs to
	 */
	private Long pondId;
	
	/**
	 * The question to be asked
	 */
	private String question;
	
	/**
	 * The set of answers in JSON format. Must have 3 options.
	 */
	private String answers;
	
	/**
	 * The correct answer: 1, 2 or 3
	 */
	private byte correctAnswer;
	
	/**
	 * The difficulty level
	 * <ul>
	 * 	<li>1 - Easy</li>
	 * 	<li>2 - Normal</li>
	 * 	<li>3 - Difficult</li>
	 * </ul>
	 */
	private byte difficulty;

	public Long getPondId() {
		return pondId;
	}
	public String getQuestion() {
		return question;
	}
	public String getAnswers() {
		return answers;
	}
	public byte getCorrectAnswer() {
		return correctAnswer;
	}
	public byte getDifficulty() {
		return difficulty;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setPondId(Long pondId) {
		this.pondId = pondId;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public void setAnswers(String answers) {
		this.answers = answers;
	}
	public void setCorrectAnswer(byte correctAnswer) {
		this.correctAnswer = correctAnswer;
	}
	public void setDifficulty(byte difficulty) {
		this.difficulty = difficulty;
	}
}
