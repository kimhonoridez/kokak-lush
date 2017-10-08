package my.com.froggy.mappers;

import java.time.LocalDate;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import my.com.froggy.common.DateConverter;
import my.com.froggy.dto.FrogDto;
import my.com.froggy.entity.Frog;

@Component
public class FrogMapper extends CommonMapper{
	
	public Frog toEntity(FrogDto frogDto) {
		Frog frog = this.mapper.map(frogDto, Frog.class);
		
		// Convert dates properly
		try {
			LocalDate date = DateConverter.toLocalDate(frogDto.getBirthDate());
			frog.setBirthDate(date);
		}
		catch (Exception e) {
			// do nothing
		}
		
		return frog;
	}
	
	public FrogDto toDto(Frog frog) {
		FrogDto frogDto = this.mapper.map(frog, FrogDto.class);
		
		// Convert dates properly
		
		return frogDto;
	}
}
