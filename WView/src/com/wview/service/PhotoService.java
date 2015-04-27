package com.wview.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.ws.rs.POST;

import com.wview.model.Photo;
import com.wview.model.User;

public class PhotoService {

	private final EntityManagerFactory emf;
	
	public PhotoService(){
		emf = Services.getEntityManagerFactory();
	}
	
	public List<Photo> getPhotos(){
		final EntityManager em = emf.createEntityManager();
		try {
			return em
					.createNamedQuery("allPhotos",Photo.class)
					.getResultList();
		} finally {
			em.close();
		}
	}
	
	public Photo getPhoto(long photoId){
		final EntityManager em = emf.createEntityManager();
		try {
			return em.find(Photo.class,photoId);
		} finally {
			em.close();
		}
	}
	
	public synchronized Photo addPhoto(Photo photo){
		final EntityManager em = emf.createEntityManager();
		final EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			em.persist(photo);
			tx.commit();
			return photo;
		} finally {
			if(tx.isActive()){
				tx.rollback();
			}
			em.close();
		}
	}
	
	public Photo updatePhoto(long photoId,Photo photo){
		EntityManager em=emf.createEntityManager();
		final EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			final Photo fromDb = em.find(Photo.class,photoId);
			if(fromDb!=null){
				fromDb.setDescription(photo.getDescription());
				fromDb.setImgUrl(photo.getImgUrl());
				fromDb.setSeason(photo.getSeason());
				em.merge(fromDb);
			}
			tx.commit();
			return fromDb;
		} finally {
			if(tx.isActive()){
				tx.rollback();
			}
			em.close();
		}
	}
	
	public void deletePhoto(long photoId){
		EntityManager em = emf.createEntityManager();
		final EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			final Photo fromDb = em.find(Photo.class, photoId);
			if(fromDb!=null){
				em.remove(fromDb);
			}
			tx.commit();
		} finally {
			if(tx.isActive()){
				tx.rollback();
			}
			em.close();
		}
	}
}
