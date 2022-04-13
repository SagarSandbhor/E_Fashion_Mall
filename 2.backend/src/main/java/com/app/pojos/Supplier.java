package com.app.pojos;

import javax.persistence.*;

@Entity
public class Supplier extends BaseEntity{

	@OneToOne(fetch = FetchType.EAGER)
	
	@JoinColumn(name = "user_id")
	private User currentUser;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "category_id")
	private Category supplierCategory;
	
	public Supplier() {
		System.out.println("in address ctor"+getClass().getName());
	}

	public User getCurrentUser() {
		return currentUser;
	}

	public void setCurrentUser(User currentUser) {
		this.currentUser = currentUser;
	}

	public Category getSupplierCategory() {
		return supplierCategory;
	}

	public void setSupplierCategory(Category supplierCategory) {
		this.supplierCategory = supplierCategory;
	}

	@Override
	public String toString() {
		return "Supplier [currentUser=" + currentUser + ", supplierCategory=" + supplierCategory + "]";
	}


	
	
	
}
