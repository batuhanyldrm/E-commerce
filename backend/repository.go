package main

import (
	"context"
	"log"
	"time"

	"example/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Repository struct {
	client *mongo.Client
}

func (repository *Repository) CreateProduct(product models.Product) error {
	collection := repository.client.Database("products").Collection("products")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, product)

	if err != nil {
		return err
	}

	return nil
}

func NewRepository() *Repository {
	uri := "mongodb+srv://Cluster:bthn998877@cluster0.hnmuy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
	client, err := mongo.NewClient(options.Client().ApplyURI(uri))
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()
	client.Connect(ctx)

	if err != nil {
		log.Fatal(err)
	}

	return &Repository{client}
}

func NewTestRepository() *Repository {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))

	defer cancel()
	client.Connect(ctx)

	if err != nil {
		log.Fatal(err)
	}

	return &Repository{client}
}

func (repository *Repository) GetStocks() ([]models.Product, error) {
	collection := repository.client.Database("products").Collection("products")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cur, err := collection.Find(ctx, bson.M{})

	if err != nil {
		return nil, err
	}

	stocks := []models.Product{}
	for cur.Next(ctx) {
		var stock models.Product
		err := cur.Decode(&stock)
		if err != nil {
			log.Fatal(err)
		}

		stocks = append(stocks, stock)

	}

	return stocks, nil

}

func (repository *Repository) GetProductsWithQuery(query string) ([]models.Product, error) {
	collection := repository.client.Database("products").Collection("products")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	searchQuery := bson.M{}
	if query != "" {
		searchQuery = bson.M{"$text": bson.M{"$search": query}}
	}
	cur, err := collection.Find(ctx, searchQuery)

	if err != nil {
		return nil, err
	}

	stocks := []models.Product{}
	for cur.Next(ctx) {
		var stock models.Product
		err := cur.Decode(&stock)
		if err != nil {
			log.Fatal(err)
		}

		stocks = append(stocks, stock)
	}

	return stocks, nil

}

func (repository *Repository) GetStock(ID string) (models.Product, error) {
	collection := repository.client.Database("products").Collection("products")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	stock := models.Product{}
	err := collection.FindOne(ctx, bson.M{"id": ID}).Decode(&stock)

	if err != nil {
		log.Fatal(err)
	}
	return stock, nil
}

func (repository *Repository) GetOrders() ([]models.Order, error) {
	collection := repository.client.Database("order").Collection("order")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cur, err := collection.Find(ctx, bson.M{})

	if err != nil {
		return nil, err
	}

	orders := []models.Order{}
	for cur.Next(ctx) {
		var order models.Order
		err := cur.Decode(&order)
		if err != nil {
			log.Fatal(err)
		}

		orders = append(orders, order)

	}

	return orders, nil

}

func (repository *Repository) GetOrder(ID string) (models.Order, error) {
	collection := repository.client.Database("order").Collection("order")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	order := models.Order{}
	err := collection.FindOne(ctx, bson.M{"id": ID}).Decode(&order)

	if err != nil {
		log.Fatal(err)
	}
	return order, nil
}

func (repository *Repository) UpdateStocks(stock models.Product, ID string) error {
	collection := repository.client.Database("products").Collection("products")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result := collection.FindOneAndReplace(ctx, bson.M{"id": ID}, stock)

	if result == nil {
		return result.Err()
	}

	return nil

}

func (repository *Repository) PostStocks(product models.Product) error {
	collection := repository.client.Database("products").Collection("products")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, product)

	if err != nil {
		return err
	}

	return nil

}

func (repository *Repository) PostOrder(order models.Order) error {
	collection := repository.client.Database("order").Collection("order")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, order)

	if err != nil {
		return err
	}

	return nil

}

func (repository *Repository) DeleteStocks(stockId string) error {
	collection := repository.client.Database("products").Collection("products")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	filter := bson.M{"id": stockId}

	_, err := collection.DeleteOne(ctx, filter)
	if err != nil {
		return err
	}

	return nil

}

func (repository *Repository) UpdateUser(userId string, user models.Register) error {
	collection := repository.client.Database("register").Collection("register")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result := collection.FindOneAndReplace(ctx, bson.M{"id": userId}, user)

	if result == nil {
		return result.Err()
	}

	return nil

}

func (repository *Repository) PostRegister(userRegister models.Register) error {
	collection := repository.client.Database("register").Collection("register")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, userRegister)

	if err != nil {
		return err
	}
	return nil
}

func (repository *Repository) GetUsers() ([]models.Register, error) {
	collection := repository.client.Database("register").Collection("register")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cur, err := collection.Find(ctx, bson.M{})

	if err != nil {
		return nil, err
	}

	users := []models.Register{}
	for cur.Next(ctx) {
		var user models.Register
		err := cur.Decode(&user)
		if err != nil {
			log.Fatal(err)
		}

		users = append(users, user)

	}

	return users, nil

}

func (repository *Repository) GetUser(email string) (models.Register, error) {
	collection := repository.client.Database("register").Collection("register")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	user := models.Register{}
	err := collection.FindOne(ctx, bson.M{"email": email}).Decode(&user)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return user, ErrUserNotFound
		}
		/* log.Println("Error fetching user:", err)
		return user, err */
		log.Fatal(err)
	}

	/* if err != nil {//sistemi direkt patlatıyor
		log.Fatal(err)
	} */
	return user, nil
}

func (repository *Repository) GetUserID(ID string) (models.Register, error) {
	collection := repository.client.Database("register").Collection("register")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	user := models.Register{}
	err := collection.FindOne(ctx, bson.M{"id": ID}).Decode(&user)

	if err != nil {
		log.Fatal(err)
	}
	return user, nil
}

func GetCleanTestRepository() *Repository {

	repository := NewRepository()
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	stockDB := repository.client.Database("products")
	stockDB.Drop(ctx)

	return repository
}
