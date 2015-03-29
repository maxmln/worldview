import java.util.List;


public class PhotoPostRest {
	private PhotoPostService photoPostsService;
	private Author defaultAuthor;
	
	
	public List<PhotoPost> getPhotoPosts(){
		return photoPostsService.getPhotoPosts();
	}
	
	public PhotoPost gePhototPost(long photoPostId){
		
		return photoPostsService.gePhototPost(photoPostId);
	}
	public PhotoPost createPhotoPost(PhotoPost photoPost){
		
		photoPost.setAuthor(defaultAuthor);
		return photoPostsService.createPhotoPost(photoPost);
	}
	public PhotoPost updatePhotoPost(PhotoPost photoPost){
		
		return photoPostsService.updatePhotoPost(photoPost);
	}
	public void deletePhotoPost(long postId){
		
		photoPostsService.deletePhotoPost(postId);
	}

}
