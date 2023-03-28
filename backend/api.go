package main

import (
	"time"

	"example.com/greetings/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
)

type Api struct {
	Service *Service
}

func NewApi(service *Service) Api {
	return Api{
		Service: service,
	}
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

func (api *Api) PostStocksHandler(c *fiber.Ctx) error {

	createStocks := models.ProductDTO{}
	err := c.BodyParser(&createStocks)
	if err != nil {
		c.Status(fiber.StatusBadRequest)
	}
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

	cookie := fiber.Cookie{
		Name:     "user_token",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: false,
	}

	c.Cookie(&cookie)

	userLogin, err := api.Service.PostLogin(loginUser)

	switch err {
	case nil:
		c.JSON(userLogin)
		c.Status(fiber.StatusCreated)
	case UserNotFoundError:
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

func (api *Api) GetUserLogoutHandler(c *fiber.Ctx) error {

	logoutUser := models.RegisterDTO{}

	err := c.BodyParser(&logoutUser)
	if err != nil {
		c.Status(fiber.StatusBadRequest)
	}

	cookie := fiber.Cookie{
		Name:     "user_token",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	userLogout, err := api.Service.PostLogout(logoutUser)

	switch err {
	case nil:
		c.JSON(userLogout)
		c.Status(fiber.StatusCreated)

	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil
}
