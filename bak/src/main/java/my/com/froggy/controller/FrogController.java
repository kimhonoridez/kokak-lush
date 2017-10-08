package my.com.froggy.controller;

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
import org.springframework.web.bind.annotation.RestController;

import my.com.froggy.common.FroggyMsgConstants;
import my.com.froggy.dto.CommonResponseDto;
import my.com.froggy.dto.FrogDto;
import my.com.froggy.entity.Frog;
import my.com.froggy.mappers.FrogMapper;
import my.com.froggy.service.FrogService;

/**
 * The frog RESTful Controller
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
@RestController
@RequestMapping("/frog")
public class FrogController {
	@Autowired
	FrogService frogService;
	
	@Autowired
	FrogMapper frogMapper;
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	List<Frog> getAllFrogs() {
		return (List<Frog>) frogService.findAll();
	}
	
	@RequestMapping(value = "/getById/{frogId}", method = RequestMethod.GET)
	Frog getFrogById(@PathVariable Long frogId, Model model) {
		return (Frog) frogService.findById(frogId);
	}
	
	@RequestMapping(value = "/getByUsername/{username}", method = RequestMethod.GET)
	Frog getByUsername(@PathVariable String username, Model model) {
		return (Frog) frogService.findByUsername(username);
	}
	
	@RequestMapping(value = "/username/available/{username}", method = RequestMethod.GET)
	ResponseEntity<?> isUsernameAvailable(@PathVariable String username, Model model) {
		Frog frog = (Frog) frogService.findByUsername(username);
		HttpHeaders httpHeaders = new HttpHeaders();
		CommonResponseDto<Boolean> dto = null;
		
		if (frog == null) {
			dto = new CommonResponseDto<Boolean>(FroggyMsgConstants.E_USER_NOT_EXIST, new Boolean(false));
		}
		else {
			dto = new CommonResponseDto<Boolean>(FroggyMsgConstants.E_USER_EXIST, new Boolean(true));
		}
		
		return new ResponseEntity<>(dto, httpHeaders, frog == null ? HttpStatus.OK : HttpStatus.CONFLICT);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	ResponseEntity<?> saveFrog(@RequestBody FrogDto frogDto) {
		HttpHeaders httpHeaders = new HttpHeaders();
		HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		String msgCode = FroggyMsgConstants.S_COM1;
		
		// Check mandatory fields
		if (frogDto.checkMandatoryFields()) {
			
			// Check username validity
			if (frogDto.isUsernameValid()) {
				
				// Check userKey validity
				if (frogDto.isUserKeyValid()) {
					
					// Check gender validity
					if (frogDto.isGenderCodeValid()) {
						
						// Check if user already exists
						Frog frog = (Frog) frogService.findByUsername(frogDto.getUsername());
						if (frog == null) {
							// Save data
							frog = frogMapper.toEntity(frogDto);
							if (frogService.save(frog)) {
								httpStatus = HttpStatus.CREATED;
							}
							else {
								// Error Saving Data
								msgCode = FroggyMsgConstants.E_SAVE_ERROR;
							}
						}
						else {
							// user already exists
							msgCode = FroggyMsgConstants.E_USER_EXIST;
						}
					}
					else  {
						// Invalid gender code
						msgCode = FroggyMsgConstants.E_REG_3;
					}
				}
				else {
					// Invalid user key
					msgCode = FroggyMsgConstants.E_REG_2;
				}
			}
			else {
				// Invalid user name
				msgCode = FroggyMsgConstants.E_REG_1;
			}
		}
		else {
			// Required fields are not fulfilled
			msgCode = FroggyMsgConstants.E_MANDATORY;
		}
		
		CommonResponseDto<String> dto = new CommonResponseDto<String>(msgCode, "");
		
		return new ResponseEntity<>(dto, httpHeaders, httpStatus);
	}
}
