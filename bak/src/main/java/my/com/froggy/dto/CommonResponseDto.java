package my.com.froggy.dto;

public class CommonResponseDto<T> {
	private String code;
	private T result;
	
	public CommonResponseDto() {}

	public CommonResponseDto(String code, T result) {
		super();
		this.code = code;
		this.result = result;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public T getResult() {
		return result;
	}

	public void setResult(T result) {
		this.result = result;
	}
}
