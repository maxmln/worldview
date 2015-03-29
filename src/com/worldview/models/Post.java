package com.worldview.models;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class Post {
	@Id
	@GeneratedValue
	private long id;
	//private Author author;
	@Column(nullable=false,length=10)
	private String season;
	@Column(nullable=false,length=255)
	private String description;
	@Column(nullable=false,length=500)
	private String imgUrl;
	
	public String getSeason() {
		return season;
	}
	public void setSeason(String season) {
		this.season = season;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
//	public Author getAuthor() {
//		return author;
//	}
//	public void setAuthor(Author author) {
//		this.author = author;
//	}
}
