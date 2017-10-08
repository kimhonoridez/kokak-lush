package my.com.froggy.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import my.com.froggy.common.FroggyMsgConstants;
import my.com.froggy.configs.FroggySession;
import my.com.froggy.dto.CommonResponseDto;
import my.com.froggy.dto.CommonResponseListDto;
import my.com.froggy.dto.TrxSelfChallengeDto;
import my.com.froggy.entity.Frog;
import my.com.froggy.entity.MstQa;
import my.com.froggy.entity.Pond;
import my.com.froggy.entity.TrxSelfChallenge;
import my.com.froggy.service.FrogService;
import my.com.froggy.service.MstQaService;
import my.com.froggy.service.PondService;

/**
 * The pond RESTful Controller
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
@RestController
@RequestMapping("/pond")
public class PondController {
	
	@Autowired
	MstQaService mstQaService;
	
	@Autowired
	PondService pondService;
	
	@Autowired
	FrogService frogService;
	
	@Autowired
	FroggySession froggySession;
	
	@RequestMapping(value = "/challenge/list/{pondId}/{difficulty}", method = RequestMethod.GET)
	ResponseEntity<?> getPondList() {
		HttpHeaders httpHeaders = new HttpHeaders();
		HttpStatus httpStatus = HttpStatus.OK;
		String msgCode = FroggyMsgConstants.S_COM1;
		
		CommonResponseListDto<Object> dto = new CommonResponseListDto<Object>(msgCode, new ArrayList<Object>());
		return new ResponseEntity<>(dto, httpHeaders, httpStatus);
	}
	
	@RequestMapping(value = "/challenge/qaList/{pondId}/{difficulty}", method = RequestMethod.GET)
	@ResponseBody
	ResponseEntity<?> getQaList(@PathVariable Long pondId, @PathVariable byte difficulty, Model model) {
		HttpHeaders httpHeaders = new HttpHeaders();
		HttpStatus httpStatus = HttpStatus.OK;
		String msgCode = FroggyMsgConstants.S_COM1;
		List<MstQa> qaList = null;
		
		if (pondId > 0 && difficulty > 0 && difficulty < 4) {
			qaList = mstQaService.find5(pondId, difficulty);
		}
		else {
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
			msgCode = FroggyMsgConstants.E_PARAM;
		}
		
		CommonResponseListDto<MstQa> dto = new CommonResponseListDto<MstQa>(msgCode, qaList);
		return new ResponseEntity<>(dto, httpHeaders, httpStatus);
	}
	
	@RequestMapping(value = "/challenge", method = RequestMethod.POST)
	ResponseEntity<?> challenge(@RequestBody TrxSelfChallengeDto trxSelfChallengeDto) {
		HttpHeaders httpHeaders = new HttpHeaders();
		HttpStatus httpStatus = HttpStatus.OK;
		String msgCode = FroggyMsgConstants.S_COM1;
		
		// Get Pond
		Pond pond = pondService.findById(trxSelfChallengeDto.getPondId());
		if (pond != null) {
			
			// Get Frog
			Frog frog = frogService.findById(froggySession.getUserId());
			if (frog != null) {
				
				// Check answers
				int correctItems = mstQaService.checkAnswers(trxSelfChallengeDto.getAnsweredQaItems());
				System.out.println("Correct Answers : " + correctItems);
				
				// Construct Entity
				TrxSelfChallenge trxSelfChallenge = new TrxSelfChallenge();
				trxSelfChallenge.setCreatedDate(LocalDateTime.now());
				trxSelfChallenge.setPond(pond);
				trxSelfChallenge.setFrog(frog);
				trxSelfChallenge.setDifficulty(trxSelfChallengeDto.getDifficulty());
				trxSelfChallenge.setScore(correctItems * trxSelfChallengeDto.getDifficulty());
				
				// Save Self Challenge
				mstQaService.saveChallenge(trxSelfChallenge);
			}
			else {
				// Invalid Frog Id
				httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
				msgCode = FroggyMsgConstants.E_INVALID_FROG_ID;
			}
		}
		else {
			// Invalid Pond Id
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
			msgCode = FroggyMsgConstants.E_INVALID_POND_ID;
		}
		
		CommonResponseDto<String> dto = new CommonResponseDto<String>(msgCode, "");
		return new ResponseEntity<>(dto, httpHeaders, httpStatus);
	}
}
