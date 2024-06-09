package main

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log"
	"os"
	"strconv"

	"time"

	"example/models"

	firebase "firebase.google.com/go"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
	"github.com/stripe/stripe-go/v74"
	"github.com/stripe/stripe-go/v74/paymentintent"
	"google.golang.org/api/option"
)

type Api struct {
	Service *Service
}

func NewApi(service *Service) Api {
	return Api{
		Service: service,
	}
}

type PaymentData struct {
	Amount float32 `json:"amount"`
	ID     string  `json:"id"`
}

func (api *Api) HandleCreatePaymentIntent(c *fiber.Ctx) error {

	var paymentData PaymentData

	if err := c.BodyParser(&paymentData); err != nil {
		log.Println("Error parsing payment data:", err)
		return c.JSON(fiber.Map{
			"message": "Payment Failed",
			"success": false,
		})
	}

	stripe.Key = "sk_test_51NDVcUJVbJVgaTyyWRJxS0zPxpTaHJvmriQ5jJbFf7dbBTizwlQdp4xooJy8iqnVNmL8FQAC0WlVX6gySg1FurN200VTizr6dz"

	params := &stripe.PaymentIntentParams{
		Amount:        stripe.Int64(int64(paymentData.Amount * 100)),
		Currency:      stripe.String("USD"),
		PaymentMethod: stripe.String(paymentData.ID),
		Confirm:       stripe.Bool(true),
		Description:   stripe.String("Payment"),
	}

	_, err := paymentintent.New(params)
	if err != nil {
		log.Println("Error creating payment intent:", err)
		return c.JSON(fiber.Map{
			"message": "Payment Failed",
			"success": false,
		})
	}

	//log.Println("Payment:", pi)
	return c.JSON(fiber.Map{
		"message": "Payment successfully",
		"success": true,
	})
}

func (api *Api) GetStocksHandler(c *fiber.Ctx) error {

	stocks, err := api.Service.GetStocks()

	switch err {
	case nil:
		c.JSON(stocks)
		c.Status(fiber.StatusOK)
	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil
}

func (api *Api) GetSearchHandler(c *fiber.Ctx) error {

	query := c.Query("q")

	stocks, err := api.Service.GetSearch(query)

	switch err {
	case nil:
		c.JSON(stocks)
		c.Status(fiber.StatusOK)
	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil
}

func (api *Api) GetStockHandler(c *fiber.Ctx) error {
	ID := c.Params("id")
	stock, err := api.Service.GetStock(ID)

	switch err {
	case nil:
		c.JSON(stock)
		c.Status(fiber.StatusOK)
	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil

}

func (api *Api) UpdateStocksAmountHandler(c *fiber.Ctx) error {

	ID := c.Params("id")
	stock := models.ProductDTO{}
	err := c.BodyParser(&stock)

	if err != nil {
		c.Status(fiber.StatusBadRequest)
	}

	updatedStock, err := api.Service.UpdateStocksAmount(stock, ID)

	switch err {
	case nil:
		c.JSON(updatedStock)
		c.Status(fiber.StatusOK)
	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil
}

func (api *Api) UpdateStocksHandler(c *fiber.Ctx) error {

	ID := c.Params("id")
	stock := models.ProductDTO{}
	err := c.BodyParser(&stock)

	if err != nil {
		c.Status(fiber.StatusBadRequest)
	}

	updatedStock, err := api.Service.UpdateStocks(stock, ID)

	switch err {
	case nil:
		c.JSON(updatedStock)
		c.Status(fiber.StatusOK)
	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil
}

var ErrImageNotFound error = errors.New("image not found")

func (api *Api) GetImageHandler(c *fiber.Ctx) error {

	imageID := c.Params("imageID")
	ctx := context.Background()

	// Initialize the Firebase app
	sa := option.WithCredentialsFile("serviceAccountKey.json")
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		log.Fatalf("Failed to initialize Firebase app: %v", err)
	}

	// Initialize the Firebase Storage client
	client, err := app.Storage(ctx)
	if err != nil {
		log.Fatalf("Failed to initialize Firebase Storage client: %v", err)
	}
	fmt.Println("aa")
	// Specify the bucket and image URL
	// Specify the bucket and image URL
	bucket, err := client.Bucket(os.Getenv("BUCKET_NAME"))
	if err != nil {
		log.Fatalf("Failed to get default bucket: %v", err)
	}

	imageURL := imageID // Replace with the extracted image path

	// Get the file from Firebase Storage
	reader, err := bucket.Object(imageURL).NewReader(ctx)
	if err != nil {
		return err
	}
	defer reader.Close()

	// Set the Content-Type header for the response
	c.Set("Content-Type", reader.ContentType())

	// Stream the file data as the response to the client
	if _, err := io.Copy(c, reader); err != nil {
		return err
	}

	fmt.Println("Image streamed successfully.")
	return nil
}

func (api *Api) PostStocksHandler(c *fiber.Ctx) error {

	createStocks := models.ProductDTO{}
	err := c.BodyParser(&createStocks)
	if err != nil {
		c.Status(fiber.StatusBadRequest)
	}

	opt := option.WithCredentialsFile("serviceAccountKey.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		return fmt.Errorf("error initializing app: %v", err)
	}

	client, err := app.Storage(context.TODO())
	if err != nil {
		return fmt.Errorf("error getting storage client: %v", err)
	}
	buckedHandle, err := client.Bucket(os.Getenv("BUCKET_NAME"))
	if err != nil {
		return fmt.Errorf("error getting storage bucket: %v", err)
	}

	file, err := c.FormFile("image")
	if err == nil { //kontrol et
		return nil
	}

	f, err := file.Open()

	if err != nil {
		fmt.Println("error formfile")
		return err
	}
	imageId := uuid.New()
	objectHandle := buckedHandle.Object(imageId.String())

	writer := objectHandle.NewWriter(context.Background())

	id := uuid.New()

	writer.ObjectAttrs.Metadata = map[string]string{"firebaseStorageDownloadTokens": id.String()}
	defer writer.Close()

	if _, err := io.Copy(writer, f); err != nil {
		return fmt.Errorf("error initializing app: %v", err)
	}

	createStocks.ProductName = c.FormValue("productName")
	createStocks.ProductCode = c.FormValue("productCode")
	createStocks.Size = c.FormValue("size")
	createStocks.Color = c.FormValue("color")
	createStocks.Description = c.FormValue("description")
	price, err := strconv.ParseFloat(c.FormValue("price"), 32)
	createStocks.Price = float32(price)
	if err != nil {
		fmt.Println("price Error!")
		return err
	}
	amount, err := strconv.Atoi(c.FormValue("amount"))
	createStocks.Amount = float32(amount)
	createStocks.Image = "https://firebasestorage.googleapis.com/v0/b/graduation-project-5ff56.appspot.com/o/" + imageId.String() + "?alt=media&token=" + id.String()

	stock := api.Service.PostStocks(createStocks)

	switch err {
	case nil:
		c.JSON(stock)
		c.Status(fiber.StatusCreated)

	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil
}

func (api *Api) PostOrderHandler(c *fiber.Ctx) error {

	userId := c.Params("id")
	/* productId := c.Params("productId") */

	createOrders := models.OrderDTO{}
	err := c.BodyParser(&createOrders)
	if err != nil {
		c.Status(fiber.StatusBadRequest)
	}
	orders := api.Service.PostOrder(userId /* productId, */, createOrders)

	switch err {
	case nil:
		c.JSON(orders)
		c.Status(fiber.StatusCreated)

	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil
}

func (api *Api) GetOrdersHandler(c *fiber.Ctx) error {

	orders, err := api.Service.GetOrders()

	switch err {
	case nil:
		c.JSON(orders)
		c.Status(fiber.StatusOK)
	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil
}

func (api *Api) GetOrderHandler(c *fiber.Ctx) error {
	ID := c.Params("id")
	order, err := api.Service.GetOrder(ID)

	switch err {
	case nil:
		c.JSON(order)
		c.Status(fiber.StatusOK)
	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil

}

func (api *Api) DeleteStocksHandler(c *fiber.Ctx) error {

	ID := c.Params("id")
	err := api.Service.DeleteStocks(ID)

	switch err {
	case nil:
		c.Status(fiber.StatusNoContent)

	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil
}

func (api *Api) UpdateUserHandler(c *fiber.Ctx) error {
	userId := c.Params("userId")

	userDTO := models.RegisterDTO{}
	err := c.BodyParser(&userDTO)

	if err != nil {
		c.Status(fiber.StatusBadRequest)
	}

	updatedUser, err := api.Service.UpdateUser(userId, userDTO)

	switch err {
	case nil:
		c.JSON(updatedUser)
		c.Status(fiber.StatusOK)
	default:
		c.Status(fiber.StatusInternalServerError)
	}
	return nil
}

func (api *Api) PostRegisterHandler(c *fiber.Ctx) error {

	createUserRegister := models.RegisterDTO{}

	err := c.BodyParser(&createUserRegister)
	if err != nil {
		c.Status(fiber.StatusBadRequest)
	}

	userRegister := api.Service.PostRegister(createUserRegister)

	switch err {
	case nil:
		c.JSON(userRegister)
		c.Status(fiber.StatusCreated)

	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil
}

const SecretKey = "secret"

func (api *Api) PostLoginHandler(c *fiber.Ctx) error {

	loginUser := models.RegisterDTO{}

	err := c.BodyParser(&loginUser)
	if err != nil {
		c.Status(fiber.StatusBadRequest)
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    loginUser.Email,
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})

	token, err := claims.SignedString([]byte(SecretKey))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
	}

	userLogin, err := api.Service.PostLogin(loginUser)

	switch err {
	case nil:
		cookie := fiber.Cookie{
			Name:     "user_token",
			Value:    token,
			Expires:  time.Now().Add(time.Hour * 24),
			HTTPOnly: false,
		}

		c.Cookie(&cookie)
		c.JSON(userLogin)
		c.Status(fiber.StatusCreated)
	case ErrUserNotFound:
		c.Status(fiber.StatusUnauthorized)
	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil
}

func (api *Api) GetUsersHandler(c *fiber.Ctx) error {

	users, err := api.Service.GetUsers()

	switch err {
	case nil:
		c.JSON(users)
		c.Status(fiber.StatusOK)
	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil
}

func (api *Api) GetUserHandler(c *fiber.Ctx) error {
	email := c.Params("email")
	stock, err := api.Service.GetUser(email)

	switch err {
	case nil:
		c.JSON(stock)
		c.Status(fiber.StatusOK)
	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil

}

func (api *Api) GetUserIDHandler(c *fiber.Ctx) error {
	ID := c.Params("id")
	stock, err := api.Service.GetUserID(ID)

	switch err {
	case nil:
		c.JSON(stock)
		c.Status(fiber.StatusOK)
	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil

}

func (api *Api) GetUserLogoutHandler(c *fiber.Ctx) error {

	cookie := fiber.Cookie{
		Name:     "user_token",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)
	c.JSON(fiber.Map{"message": "success"})
	c.Status(fiber.StatusOK)

	return nil
}

func (api *Api) GetUserAuthenticationHandler(c *fiber.Ctx) error {

	cookie := c.Cookies("user_token")

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)

		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}
	claims := token.Claims.(*jwt.StandardClaims)
	userId := claims.Issuer

	user, err := api.Service.GetUserAuth(userId)

	switch err {
	case nil:
		c.JSON(user)
		c.Status(fiber.StatusOK)
	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil
}
