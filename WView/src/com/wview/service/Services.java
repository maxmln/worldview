package com.wview.service;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.wview.model.Photo;
import com.wview.service.PhotoService;


public class Services {
	private static PhotoService photoPostService;
	private static UserService usersService;
	private static EntityManagerFactory entityManagerFactory;
	
	public synchronized static EntityManagerFactory getEntityManagerFactory(){
		if(entityManagerFactory==null){
			try {
				Class.forName("org.apache.derby.jdbc.ClientDriver");
			} catch (ClassNotFoundException e) {
				throw new IllegalStateException("No driver", e);
			}
			entityManagerFactory = Persistence.createEntityManagerFactory("WView");
		}
		return entityManagerFactory;
	}
	
	static void setEntityManagerFactory(EntityManagerFactory entityManagerFactory){
		Services.entityManagerFactory = entityManagerFactory;
	}
	
	public synchronized static PhotoService getPhotoPostService(){
		if (photoPostService == null){
			photoPostService = new PhotoService();
		}
		return photoPostService;
	}
	
	static void setPhotoPostService(PhotoService photopostService){
		Services.photoPostService = photopostService;
	}
	
	public synchronized static UserService getUsersService() {
		// lazy loading
		if (usersService == null) {
			usersService = new UserService();
			// TODO ensure there is at least one admin user
		}
		return usersService;
	}
	
	// for tests purposes
	static void setUsersService(UserService usersService) {
		Services.usersService = usersService;
	}
}
