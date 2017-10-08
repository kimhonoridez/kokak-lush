package my.com.froggy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import my.com.froggy.common.FroggyMsgConstants;
import my.com.froggy.dto.CommonResponseDto;
import my.com.froggy.dto.CommonResponseListDto;
import my.com.froggy.entity.MstQa;
import my.com.froggy.service.MstQaService;

/**
 * The Pond Q&A RESTful Controller
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
@RestController
@RequestMapping("/qaMst")
public class MstQaController {
	@Autowired
	MstQaService mstQaService;
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	ResponseEntity<?> saveQa(@RequestBody MstQa mstQa) {
		HttpHeaders httpHeaders = new HttpHeaders();
		HttpStatus httpStatus = HttpStatus.CREATED;
		String msgCode = FroggyMsgConstants.S_COM1;
		
		// Check required fields
		if (mstQa.getQuestion() != null && !mstQa.getQuestion().isEmpty() &&
				mstQa.getAnswers() != null && !mstQa.getAnswers().isEmpty() &&
				mstQa.getDifficulty() > 0 && mstQa.getDifficulty() <= 3 &&
				mstQa.getCorrectAnswer() > 0 && mstQa.getCorrectAnswer() <= 4 &&
				mstQa.getPondId() != null) {
			
			if (!mstQaService.save(mstQa)) {
				// Error saving
				httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
				msgCode = FroggyMsgConstants.E_SAVE_ERROR;
			}
		}
		else {
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
			msgCode = FroggyMsgConstants.E_SAVE_ERROR;
		}
		
		CommonResponseDto<String> dto = new CommonResponseDto<String>(msgCode, "");
		return new ResponseEntity<>(dto, httpHeaders, httpStatus);
	}
	
	@RequestMapping(value = "/list/{pondId}", method = RequestMethod.GET)
	ResponseEntity<?> getQaList(@PathVariable Long pondId) {
		HttpHeaders httpHeaders = new HttpHeaders();
		HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		String msgCode = FroggyMsgConstants.E_QA_1;
		List<MstQa> list = null;
		
		if (pondId != null) {
			list = mstQaService.findAllByPondId(pondId);
			
			httpStatus = HttpStatus.OK;
			msgCode = FroggyMsgConstants.S_COM1;
		}
		
		CommonResponseListDto<MstQa> entityList = new CommonResponseListDto<MstQa>(msgCode, list);
		return new ResponseEntity<>(entityList, httpHeaders, httpStatus);
	}
}
