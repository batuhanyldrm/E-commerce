package models

import "time"

type Product struct {
	ID          string    `json:"id" bson:"id"`
	ProductName string    `json:"productName" bson:"productName"`
	ProductCode string    `json:"productCode" bson:"productCode"`
	Description string    `json:"description" bson:"description"`
	Price       int       `json:"price" bson:"price"`
	Amount      int       `json:"amount" bson:"amount"`
	Size        string    `json:"size" bson:"size"`
	Color       string    `json:"color" bson:"color"`
	Image       string    `json:"image" bson:"image"`
	CreatedAt   time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt" bson:"updatedAt"`
}
type ProductDTO struct {
	ProductName string    `json:"productName" bson:"productName"`
	ProductCode string    `json:"productCode" bson:"productCode"`
	Description string    `json:"description" bson:"description"`
	Price       int       `json:"price" bson:"price"`
	Amount      int       `json:"amount" bson:"amount"`
	Size        string    `json:"size" bson:"size"`
	Color       string    `json:"color" bson:"color"`
	Image       string    `json:"image" bson:"image"`
	CreatedAt   time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt" bson:"updatedAt"`
}

type Images struct {
	ID        string `json:"id" bson:"id"`
	ImageName string `json:"imageName" bson:"imageName"`
	ImageUrl  string `json:"imageUrl" bson:"imageUrl"`
}
