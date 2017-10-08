package my.com.froggy.mappers;

import my.com.froggy.dto.PondDto;
import my.com.froggy.entity.Pond;

public class PondMapper extends CommonMapper{
	
	public Pond toEntity(PondDto pondDto) {
		Pond pond = this.mapper.map(pondDto, Pond.class);
		return pond;
	}
	
	public PondDto toDto(Pond pond) {
		PondDto pondDto = this.mapper.map(pond, PondDto.class);
		pondDto.setQaCount(pond.getQuestions());
		return pondDto;
	}
}
