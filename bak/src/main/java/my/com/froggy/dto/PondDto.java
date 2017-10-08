package my.com.froggy.dto;

import java.util.List;

import my.com.froggy.entity.MstQa;

public class PondDto {
	private Long id;
	private String pondName;
	private int qaCount;
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getPondName() {
		return pondName;
	}
	
	public void setPondName(String pondName) {
		this.pondName = pondName;
	}
	
	public int getQaCount() {
		return qaCount;
	}
	
	public void setQaCount(int qaCount) {
		this.qaCount = qaCount;
	}
	
	public void setQaCount(List<MstQa> qaList) {
		this.qaCount = 0;
		
		if (qaList != null) {
			this.qaCount = qaList.size();
		}
	}
}
