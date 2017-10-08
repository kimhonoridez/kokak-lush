package my.com.froggy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import my.com.froggy.common.FroggyMsgConstants;
import my.com.froggy.dto.CommonResponseDto;
import my.com.froggy.dto.CommonResponseListDto;
import my.com.froggy.dto.PondDto;
import my.com.froggy.entity.Pond;
import my.com.froggy.mappers.PondListMapper;
import my.com.froggy.service.PondService;

/**
 * The pond master RESTful Controller
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
@RestController
@RequestMapping("/pondMst")
public class MstPondController {
	@Autowired
	PondService pondService;
	
	@Autowired
	PondListMapper pondListMapper;
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	ResponseEntity<?> getPondList() {
		HttpHeaders httpHeaders = new HttpHeaders();
		HttpStatus httpStatus = HttpStatus.OK;
		String msgCode = FroggyMsgConstants.S_COM1;
		List<Pond> pondList = (pondService.findAll());
		
		// Conver entity to DTO
		List<PondDto> pondDtoList = pondListMapper.toDto(pondList);
		CommonResponseListDto<PondDto> dto = new CommonResponseListDto<PondDto>(msgCode, pondDtoList);
		
		return new ResponseEntity<>(dto, httpHeaders, httpStatus);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	ResponseEntity<?> savePond(@RequestBody PondDto pondDto) {
		HttpHeaders httpHeaders = new HttpHeaders();
		HttpStatus httpStatus = HttpStatus.CREATED;
		String msgCode = FroggyMsgConstants.S_COM1;
		
		// Check if pond name already exist
		Pond pond = pondService.findByName(pondDto.getPondName());
		
		if (pond == null && !pondDto.getPondName().isEmpty()) {
			// Save data
			pond = new Pond();
			pond.setPondName(pondDto.getPondName());
			
			if (!pondService.save(pond)) {
				// Error saving
				httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
				msgCode = FroggyMsgConstants.E_SAVE_ERROR;
			}
			
		}
		else {
			// An existing item already exist
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
			msgCode = FroggyMsgConstants.E_SAVE_ERROR;
		}
		
		CommonResponseDto<String> dto = new CommonResponseDto<String>(msgCode, "");
		return new ResponseEntity<>(dto, httpHeaders, httpStatus);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.PUT)
	ResponseEntity<?> updatePond(@RequestBody PondDto pondDto) {
		HttpHeaders httpHeaders = new HttpHeaders();
		HttpStatus httpStatus = HttpStatus.OK;
		String msgCode = FroggyMsgConstants.S_COM1;
		
		// Check if pond name already exist
		Pond pond = pondService.findByName(pondDto.getPondName());
		
		if (pond == null) {
			
			// Get pond object by id
			pond = pondService.findById(pondDto.getId());
			
			// Save data
			pond.setPondName(pondDto.getPondName());
			
			if (!pondService.save(pond)) {
				// Error saving
				httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
				msgCode = FroggyMsgConstants.E_SAVE_ERROR;
			}
		}
		else {
			// An existing item already exist
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
			msgCode = FroggyMsgConstants.E_SAVE_ERROR;
		}
		
		CommonResponseDto<String> dto = new CommonResponseDto<String>(msgCode, "");
		return new ResponseEntity<>(dto, httpHeaders, httpStatus);
	}
}
