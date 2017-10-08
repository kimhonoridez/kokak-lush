package my.com.froggy.dto;

import org.json.JSONObject;

public class SelfChallengeQaDto {
	private Long id;
	private Long pondId;
	private String question;
	private JSONObject answers;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getPondId() {
		return pondId;
	}
	public void setPondId(Long pondId) {
		this.pondId = pondId;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public JSONObject getAnswers() {
		return answers;
	}
	public void setAnswers(JSONObject answers) {
		this.answers = answers;
	}
}
