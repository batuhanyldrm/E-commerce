package models

import "time"

type Product struct {
	ID          string    `json:"id" bson:"id"`
	ProductName string    `json:"productName" bson:"productName"`
	Description string    `json:"description" bson:"description"`
	Price       int       `json:"price" bson:"price"`
	Amount      int       `json:"amount" bson:"amount"`
	Image       []Images  `json:"image" bson:"image"`
	CreatedAt   time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt" bson:"updatedAt"`
}
type ProductDTO struct {
	ProductName string    `json:"productName" bson:"productName"`
	Description string    `json:"description" bson:"description"`
	Price       int       `json:"price" bson:"price"`
	Amount      int       `json:"amount" bson:"amount"`
	Image       []Images  `json:"image" bson:"image"`
	CreatedAt   time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt" bson:"updatedAt"`
}

type Images struct {
	ID        string `json:"id" bson:"id"`
	ImageName string `json:"imageName" bson:"imageName"`
	ImageUrl  string `json:"imageUrl" bson:"imageUrl"`
	Header    string `json:"header" bson:"header"`
	Size      string `json:"size" bson:"size"`
	//Data      []byte `json:"data" bson:"data"`
}
