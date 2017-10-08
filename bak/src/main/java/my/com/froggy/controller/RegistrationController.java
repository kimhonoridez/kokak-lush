package my.com.froggy.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import my.com.froggy.dto.FrogDto;
import my.com.froggy.entity.Frog;
import my.com.froggy.mappers.FrogMapper;
import my.com.froggy.service.FrogService;

/**
 * The frog registration Controller
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
@RestController
@RequestMapping("/registration")
public class RegistrationController {
	
	@Autowired
	FrogService frogService;
	
	@Autowired
	FrogMapper frogMapper;
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	ResponseEntity<Void> register(@RequestBody FrogDto frogDto, UriComponentsBuilder ucBuilder) {
		
		Frog existingFrog = (Frog) frogService.findByUsername(frogDto.getUsername());
		
		if (existingFrog != null) {
			// Username already exists
			return new ResponseEntity<Void>(HttpStatus.CONFLICT);
		}
		
		// Do some validation here
		if (true) {
			existingFrog = frogMapper.toEntity(frogDto);
			existingFrog.setCreatedDate(LocalDateTime.now());
			existingFrog.setUpdatedDate(LocalDateTime.now());
		}
		
		System.out.println(existingFrog);
		
		// Insert data
		frogService.save(existingFrog);
		
		return new ResponseEntity<Void>(HttpStatus.CREATED);
	}
}
