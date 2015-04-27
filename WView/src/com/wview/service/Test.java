package com.wview.service;

import com.wview.model.User;


public class Test {
	public static void main(String [ ] args)
	{
	     User author = new User();
	     UserService userService = new UserService();
	     PhotoService photoService = new PhotoService();
//	     
//	     author.setUsername("hello");
//	     author.setPassword("world");
//	     userService.createUser(author).getUsername();
	     
	     //System.out.println(userService.getUser(1).getPassword());
	     System.out.println(photoService.getPhoto(201).getDescription());
	}
}
