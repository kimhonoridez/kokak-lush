package my.com.froggy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import my.com.froggy.common.FroggyMsgConstants;
import my.com.froggy.configs.CustomLocalDateTimeSerializer;
import my.com.froggy.configs.FroggySession;
import my.com.froggy.dto.CommonResponseDto;
import my.com.froggy.entity.Frog;
import my.com.froggy.service.FrogService;

/**
 * The species RESTful Controller
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
@RestController
@RequestMapping("/login")
public class LoginController {
	
	@Autowired
	FrogService frogService;
	
	@Autowired
	FroggySession froggySession;
	
	/**
	 * Authentication process should have been:
	 * 	1 - Get frog details based on username
	 *  2 - Recreate userKey based on frog details and inputed password
	 *  3 - Compare recreated userKey against the saved userKey
	 *  
	 *  * For demo purpose, username and userKey are directly compared with DB data
	 * @param username
	 * @param username
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET)
	ResponseEntity<?> getFrogById(@RequestParam(value="username", defaultValue="") String username, @RequestParam(value="userKey", defaultValue="") String userKey) {
		Frog frog = (Frog) frogService.findByUsername(username);
		HttpHeaders httpHeaders = new HttpHeaders();
		HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		String msgCode = FroggyMsgConstants.E_LOG_1;
		
		if (frog != null && frog.getUserKey().equals(userKey)) {
			httpStatus = HttpStatus.OK;
			msgCode = FroggyMsgConstants.S_COM1;
			
			froggySession.setUserId(frog.getId());
		}
		
		CommonResponseDto<Frog> dto = new CommonResponseDto<Frog>(msgCode, frog);
		return new ResponseEntity<>(dto, httpHeaders, httpStatus);
	}
}
