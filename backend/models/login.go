package models

import "time"

type Login struct {
	ID        string    `json:"id" bson:"id"`
	Company   string    `json:"company" bson:"company"`
	Name      string    `json:"name" bson:"name"`
	Surname   string    `json:"surname" bson:"surname"`
	Email     string    `json:"email" bson:"email"`
	Password  string    `json:"password" bson:"password"`
	Tel       string    `json:"tel" bson:"tel"`
	Role      string    `json:"role" bson:"role"`
	CreatedAt time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt" bson:"updatedAt"`
}
