package models

import (
	"time"
)

type OrderStatus string

const (
	OrderStatusPending    OrderStatus = "pending"
	OrderStatusProcessing OrderStatus = "processing"
	OrderStatusShipped    OrderStatus = "shipped"
	OrderStatusDelivered  OrderStatus = "delivered"
	OrderStatusCancelled  OrderStatus = "cancelled"
)

type Order struct {
	ID             string      `json:"id" bson:"id"`
	UserId         string      `json:"userId" bson:"userId"`
	ProductList    []Product   `json:"productList" bson:"productList"`
	Address        string      `json:"address" bson:"address"`
	TotalPrice     float32     `json:"totalPrice" bson:"totalPrice"`
	Payment        string      `json:"payment" bson:"payment"`
	Discount       int         `json:"discount" bson:"discount"`
	Status         OrderStatus `json:"status" bson:"status"`
	AdditionalNote string      `json:"additionalNote" bson:"additionalNote"`
	CreatedAt      time.Time   `json:"createdAt" bson:"createdAt"`
	UpdatedAt      time.Time   `json:"updatedAt" bson:"updatedAt"`
}

type OrderDTO struct {
	ProductList    []Product   `json:"productList" bson:"productList"`
	Address        string      `json:"address" bson:"address"`
	TotalPrice     float32     `json:"totalPrice" bson:"totalPrice"`
	Payment        string      `json:"payment" bson:"payment"`
	Discount       int         `json:"discount" bson:"discount"`
	Status         OrderStatus `json:"status" bson:"status"`
	AdditionalNote string      `json:"additionalNote" bson:"additionalNote"`
}
