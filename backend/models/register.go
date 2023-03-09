package models

import (
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type Register struct {
	ID        string    `json:"id" bson:"id"`
	Company   []string  `json:"company" bson:"company"`
	Name      string    `json:"name" bson:"name"`
	Surname   string    `json:"surname" bson:"surname"`
	Email     string    `json:"email" bson:"email"`
	Password  string    `json:"password" bson:"password"`
	Tel       string    `json:"tel" bson:"tel"`
	Role      string    `json:"role" bson:"role"`
	CreatedAt time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt" bson:"updatedAt"`
}

type RegisterDTO struct {
	Company   []string  `json:"company" bson:"company"`
	Name      string    `json:"name" bson:"name"`
	Surname   string    `json:"surname" bson:"surname"`
	Email     string    `json:"email" bson:"email"`
	Password  string    `json:"password" bson:"password"`
	Tel       string    `json:"tel" bson:"tel"`
	Role      string    `json:"role" bson:"role"`
	UpdatedAt time.Time `json:"updatedAt" bson:"updatedAt"`
}

type UserCredencial struct {
	UserID string `json:"userId" bson:"userId"`
}

type Token struct {
	UserID string `json:"userId" bson:"userId"`
	Token  string `json:"token" bson:"token"`
}

type Permission struct {
	UserID       string         `json:"userId" bson:"userId"`
	Companies    []string       `json:"companies" bson:"companies"`
	CompanyAdmin []CompanyAdmin `json:"cAdmin" bson:"cAdmin"`
}

type CompanyAdmin struct {
	Role string `json:"role"`
}

type Claims struct {
	UserID string `json:"userId" bson:"userId"`
	jwt.StandardClaims
}
