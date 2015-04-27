package com.wview.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.wview.model.Photo;
import com.wview.model.User;
import com.wview.service.PhotoService;
import com.wview.service.Services;
import com.wview.service.UserService;

@Path("photos")
public class PhotoRest {
	private PhotoService photosService;
	private User defaultAuthor;
	private UserService usersService;
	private String defaultAuthorEmail ="username";
	
	public PhotoRest(){
		photosService = new PhotoService();
		defaultAuthor = new User();
		defaultAuthor.setId(1);
		defaultAuthor.setUsername("hello");
		defaultAuthor.setPassword("secret");
		photosService = Services.getPhotoPostService();	
		usersService = Services.getUsersService();
	}
	
	@GET
	@Path("/")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Photo> getPhotos(){
		return photosService.getPhotos();
	}
	
	@GET
	@Path("/{photoId}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Photo getPhoto(@PathParam("photoId") long photoId) {
		return photosService.getPhoto(photoId);
	}
	
	@POST
	@Path("/")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Photo addPhoto(Photo photo) {
		//final User author = usersService.getUserByEmail(defaultAuthorEmail);
		photo.setAuthor(defaultAuthor);
		return photosService.addPhoto(photo);
		//return photo;
	}
	
	@PUT
	@Path("/{photoId}")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Photo updatePost(@PathParam("photoId") long photoId,Photo photo) {
		return photosService.updatePhoto(photoId, photo);
	}
	
	@DELETE
	@Path("/{photoId}")
	public void deletePost(@PathParam("photoId") long photoId) {
		photosService.deletePhoto(photoId);
	}
	
}
