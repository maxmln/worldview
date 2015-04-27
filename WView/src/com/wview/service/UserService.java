package com.wview.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import com.wview.model.User;

public class UserService {
	private final EntityManagerFactory emf;
	public UserService() {
		emf = Services.getEntityManagerFactory();
	}
		public User getUserByEmail(String email) {
		final EntityManager em =
			emf.createEntityManager();
		try {
			return em
				.createNamedQuery("userByEmail", User.class)
				.setParameter("username", email)
				.getSingleResult();
		} finally {
			em.close();
		}
	}
	
		public List<User> getUsers() {
			//return posts;
			final EntityManager em=emf.createEntityManager();
			try {
				return em 
						.createNamedQuery("allUsers",User.class)
						.getResultList();
			} finally {
				em.close();
			}
					
		}
		
	public User getUser(long userId) {
		final EntityManager em =
			emf.createEntityManager();
		try {
			return em.find(User.class, userId);
		} finally {
			em.close();
		}
	}
	// synchronized because of lastUserId
	public synchronized User createUser(User user) {
		EntityManager em =
			emf.createEntityManager();
		final EntityTransaction tx =
			em.getTransaction();
		try {
			tx.begin();
			em.persist(user);
			tx.commit();
			return user;
		} finally {
			if (tx.isActive()) {
				tx.rollback();
			}
			em.close();
		}
		
	}

}