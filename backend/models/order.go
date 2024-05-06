package models

/* type Order struct {
	ID     string `json:"id" bson:"id"`
	UserId string `json:"userId" bson:"userId"`
}

package models
*/
import "go.mongodb.org/mongo-driver/bson/primitive"

type OrderStatus string

const (
	OrderStatusPending    OrderStatus = "pending"
	OrderStatusProcessing OrderStatus = "processing"
	OrderStatusShipped    OrderStatus = "shipped"
	OrderStatusDelivered  OrderStatus = "delivered"
	OrderStatusCancelled  OrderStatus = "cancelled"
)

type Order struct {
	Id             string             `json:"id" bson:"id"`
	UserId         string             `json:"userId" bson:"userId"`
	ProductList    []Product          `json:"productList" bson:"productList"`
	Address        string             `json:"address" bson:"address"`
	TotalPrice     float32            `json:"totalPrice" bson:"totalPrice"`
	Payment        string             `json:"payment" bson:"payment"`
	Discount       int                `json:"discount" bson:"discount"`
	Status         OrderStatus        `json:"status" bson:"status"`
	CreatedAt      primitive.DateTime `json:"createdAt" bson:"createdAt"`
	AdditionalNote string             `json:"additionalNote" bson:"additionalNote"`
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
