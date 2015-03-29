package com.worldview.service;

import java.util.ArrayList;
import java.util.List;

import com.worldview.models.Photo;
import com.worldview.models.User;

public class PhotoService {
	private final List<Photo> photos = new ArrayList<Photo>();
	private long lastPhotoId=0;
	
	public List<Photo> getPhotos(){
		return photos;
	}
	
	public Photo getPhoto(long photoId){
		for(Photo photo : photos){
			if(photo.getId() == photoId){
				return photo;
			}
		}
		return null;
	}
	
	public synchronized Photo addPhoto(Photo photo){
		lastPhotoId++;
		photo.setId(lastPhotoId);
		photos.add(photo);
		return photo;
	}
	
	public Photo updatePhoto(long photoId,Photo photo){
		Photo photoToBeChanged = getPhoto(photoId);
		photoToBeChanged.setDescription(photo.getDescription());
		photoToBeChanged.setImgUrl(photo.getImgUrl());
		photoToBeChanged.setSeason(photo.getSeason());
		return photoToBeChanged;
	}
	
	public void deletePhoto(long photoId){
		Photo photoToBeDeleted = getPhoto(photoId);
		photos.remove(photoToBeDeleted);
	}
}
