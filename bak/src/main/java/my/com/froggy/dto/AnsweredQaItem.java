package my.com.froggy.dto;

public class AnsweredQaItem {
	private Long qaId;
	private byte answer;
	
	public Long getQaId() {
		return qaId;
	}
	
	public void setQaId(Long qaId) {
		this.qaId = qaId;
	}
	
	public byte getAnswer() {
		return answer;
	}
	
	public void setAnswer(byte answer) {
		this.answer = answer;
	}
}
