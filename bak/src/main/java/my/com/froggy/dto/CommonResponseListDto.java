package my.com.froggy.dto;

import java.util.List;

public class CommonResponseListDto<T> {
	private String code;
	private int totalRecords = 0;
	private List<T> results;
	
	public CommonResponseListDto() {}

	public CommonResponseListDto(String code, List<T> results) {
		super();
		this.code = code;
		this.results = results;
		
		if (results != null) {
			this.totalRecords = results.size();
		}
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public List<T> getResults() {
		return results;
	}

	public void setResults(List<T> results) {
		this.results = results;
	}

	public int getTotalRecords() {
		return totalRecords;
	}

	public void setTotalRecords(int totalRecords) {
		this.totalRecords = totalRecords;
	}
}
