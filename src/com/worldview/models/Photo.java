package com.worldview.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement

@Entity(name="Photos")
@NamedQueries({
	@NamedQuery(name="allPhotos",
			query="SELECT p from Posts p")
})
public class Photo {
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
	@Column(nullable=false,length=15)
	private User author;
	
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
//	public User getAuthor() {
//		return author;
//	}
//	public void setAuthor(User author) {
//		this.author = author;
//	}
}
