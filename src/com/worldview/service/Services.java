package com.worldview.service;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.worldview.models.Photo;
import com.worldview.service.PhotoService;


public class Services {
	private static PhotoService photoPostService;
	private static EntityManagerFactory entityManagerFactory;
	
	public synchronized static EntityManagerFactory getEntityManagerFactory(){
		if(entityManagerFactory==null){
			try {
				Class.forName("org.apache.derby.jdbc.EmbeddedDriver");
			} catch (ClassNotFoundException e) {
				throw new IllegalStateException("No driver", e);
			}
			entityManagerFactory = Persistence.createEntityManagerFactory("WVProject");
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
}
