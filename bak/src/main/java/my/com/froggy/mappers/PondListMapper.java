package my.com.froggy.mappers;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Component;

import my.com.froggy.dto.PondDto;
import my.com.froggy.entity.Pond;

@Component
public class PondListMapper extends PondMapper{
	
	public List<PondDto> toDto(List<Pond> pondList) {
		List<PondDto> pondDtoList = new ArrayList<PondDto>();
		
		// Iterate pond list and convert to dto
		if (pondList != null) {
			Iterator<Pond> it = pondList.iterator();
			Pond tempPond = null;
			
			while (it.hasNext()) {
				tempPond = it.next();
				
				// Convert to Pond to PondDTo
				PondDto pondDto = this.mapper.map(tempPond, PondDto.class);
				pondDto.setQaCount(tempPond.getQuestions());
				
				// Insert to pondDtoList
				pondDtoList.add(pondDto);
			}
		}
		
		return pondDtoList;
	}
}
