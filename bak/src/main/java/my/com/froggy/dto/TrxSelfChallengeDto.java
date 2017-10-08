package my.com.froggy.dto;

import java.util.List;

public class TrxSelfChallengeDto {
	private Long pondId;
	private byte difficulty;
	private List<AnsweredQaItem> answeredQaItems;
	
	public Long getPondId() {
		return pondId;
	}
	
	public void setPondId(Long pondId) {
		this.pondId = pondId;
	}
	
	public byte getDifficulty() {
		return difficulty;
	}
	
	public void setDifficulty(byte difficulty) {
		this.difficulty = difficulty;
	}
	
	public List<AnsweredQaItem> getAnsweredQaItems() {
		return answeredQaItems;
	}
	
	public void setAnsweredQaItems(List<AnsweredQaItem> answeredQaItems) {
		this.answeredQaItems = answeredQaItems;
	}
}
