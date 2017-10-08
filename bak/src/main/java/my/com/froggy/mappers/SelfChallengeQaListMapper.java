package my.com.froggy.mappers;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Component;

import my.com.froggy.dto.SelfChallengeQaDto;
import my.com.froggy.entity.MstQa;

@Component
public class SelfChallengeQaListMapper extends SelfChallengeQaMapper{
	public List<SelfChallengeQaDto> toDto(List<MstQa> qaList) {
		List<SelfChallengeQaDto> list = new ArrayList<SelfChallengeQaDto>();
		
		if (qaList != null) {
			Iterator<MstQa> it = qaList.iterator();
			MstQa temp = null;
			
			while (it.hasNext()) {
				temp = it.next();
				list.add(this.toDto(temp));
			}
			
		}
		
		return list;
	}
}
